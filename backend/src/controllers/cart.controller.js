import Cart from "../models/cart.model.js";
import ProductVariant from "../models/productVariant.model.js";

export const addItemToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { variantId, quantity } = req.body;

    const productVariant = await ProductVariant.findOne({
      _id: variantId,   
      isActive: true,
    });

    if (!productVariant) {
      return res.status(404).json({
        message: "Product Variant not found",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
        totalPrice: 0,
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productVariant.toString() === variantId,
    );

    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      cart.items.push({
        productVariant: variantId,
        quantity,
        price: productVariant.price,
      });
    }

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    await cart.save();

    return res.status(200).json({
      message: "Item added to cart",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId }).populate({
      path: "items.productVariant",
      populate: {
        path: "productId",
        select: "name slug coverImage",
      },
    });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
        totalPrice: 0,
      });
    }

    return res.status(200).json({
      message: "Cart fetched",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { variantId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.productVariant.toString() === variantId,
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.quantity = quantity;

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    await cart.save();

    res.status(200).json({
      message: "Cart updated",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { variantId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          items: { productVariant: variantId },
        },
      },
      { new: true },
    );

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    await cart.save();

    res.status(200).json({
      message: "Item removed from cart",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

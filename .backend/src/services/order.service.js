import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import ProductVariant from "../models/productVariant.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import { generateOrderNumber } from "../utils/orderNumber.util.js";

export const OrderCheckoutService = async (
  id,
  currency,
  payment,
  shippingCost,
  shipping,
  discount,
  shippingAddress,
  billingAddress,
  notes,
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const cart = await Cart.findOne({ user: id })
      .populate({
        path: "items.productVariant",
        populate: {
          path: "productId",
          model: "Product",
        },
      })
      .session(session);

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart empty");
    }

    shippingCost = Number(shippingCost) || 0;
    discount = Number(discount) || 0;

    const taxRate = 0.1;

    let subtotal = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const variant = item.productVariant;
      const product = variant.productId;

      if (!variant) throw new Error("Variant not found");
      if (!product) throw new Error("Product not found");

      if (!variant.isActive) {
        throw new Error("Variant not active");
      }

      const updateStock = await ProductVariant.updateOne(
        {
          _id: variant._id,
          stock: { $gte: item.quantity }, // check stock langsung di DB
        },
        {
          $inc: { stock: -item.quantity }, // atomic decrement
        },
        { session },
      );

      if (updateStock.modifiedCount === 0) {
        throw new Error("Stock not enough");
      }

      const price = variant.price;
      subtotal += price * item.quantity;

      orderItems.push({
        product: product._id,
        variant: variant._id,
        productName: product.name,
        price: price,
        quantity: item.quantity,
      });
    }

    const valueTax = subtotal * taxRate;
    const valueDis = subtotal * discount;

    const totalPrice = subtotal + valueTax + shippingCost - valueDis;

    const order = await Order.create(
      [
        {
          user: id,
          orderNumber: generateOrderNumber(),
          status: "pending",
          currency: currency,
          payment: payment,
          subtotal: subtotal,
          shippingCost: shippingCost,
          shipping: shipping,
          tax: valueTax,
          discount: discount,
          total: totalPrice,
          shippingAddress: shippingAddress,
          billingAddress: billingAddress ? billingAddress : shippingAddress,
          notes: notes ? notes : "",
        },
      ],
      { session },
    );

    const items = orderItems.map((item) => ({
      ...item,
      order: order[0]._id,
    }));

    await OrderItem.insertMany(items, { session });

    // clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

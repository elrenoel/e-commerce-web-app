import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import { OrderCheckoutService } from "../services/order.service.js";

export const checkout = async (req, res) => {
  try {
    const {
      currency,
      payment,
      shippingCost,
      shipping,
      discount,
      shippingAddress,
      billingAddress,
      notes
    } = req.body;
    const { id } = req.user;
    const order = await OrderCheckoutService(
      id,
      currency,
      payment,
      shippingCost,
      shipping,
      discount,
      shippingAddress,
      billingAddress,
      notes
    );

    res.json({
      message: "Checkout success",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getOrderDetail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const items = await OrderItem.find({ order: order._id })
      .populate("product")
      .populate("variant");

    res.json({
      order,
      items,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;

    const filter = {
      user: req.user.id,
    };

    if (status) {
      filter.status = status;
    }

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

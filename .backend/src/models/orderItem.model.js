import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
    },
    productName: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      // required: true,
    },
    weight: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

orderItemSchema.index({ order: 1 });
orderItemSchema.index({ product: 1 });
orderItemSchema.index({ variant: 1 });

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productVariantSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    size: {
      type: String,
      required: true,
      trim: true,
    },
    woodType: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    dimensions: {
      length: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    isPreorderAvailable: {
      type: Boolean,
      default: false,
    },
    preorderDaysEstimate: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

productVariantSchema.index({ product: 1, isActive: 1 });

const ProductVariant = model("ProductVariant", productVariantSchema);

export default ProductVariant;
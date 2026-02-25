import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    label: {
      type: String,
      enum: ["rumah", "kantor"],
      required: true,
    },
    fullAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  addresses: {
    type: [addressSchema],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export default User;

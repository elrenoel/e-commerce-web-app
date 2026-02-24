import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI doesn't set in .env");
    }

    await mongoose.connect(mongoURI);

    console.log("MongoDB Connect Successfully");
  } catch (error) {
    console.error("MongoDB connection error: ", error.message);
    process.exit(1);
  }
};

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/auth.route.js";
import { authMiddleware, authorize } from "./src/middlewares/auth.middleware.js";
import categoryRoute from "./src/routes/category.route.js";
import productRoute from "./src/routes/product.route.js";
import cartRoute from "./src/routes/cart.route.js";
import orderRoute from "./src/routes/order.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// endpoint
app.use("/api/v1/orders", orderRoute);

app.use("/api/v1/cart", cartRoute);

app.use("/api/v1/products", productRoute);

app.use("/api/v1/categories", categoryRoute);

app.use("/api/v1/auth", authRoutes);

app.get("/api/v1/dashboard", authMiddleware, authorize("customer"), (req, res) => {
  res.json({
    message: "Welcome Customer",
    user: req.user,
  });
});

app.get("/api/v1/admin", authMiddleware, authorize("admin"), (req, res) => {
  res.json({
    message: "Welcome admin",
    user: req.user,
  });
});

app.get("/api/v1/me", authMiddleware, (req, res) => {
  res.json({
    message: "Success ambil user login",
    user: req.user,
  });
});

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running",
  });
});

// global error handling
app.use((err, req, res, next) => {
  console.log(err.message);

  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

// connect mongodb
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api/v1`);
  });
});

export default app;
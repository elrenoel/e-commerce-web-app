import express from "express";
import {
  checkout,
  getOrderDetail,
  getOrders,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const orderRoute = express.Router();

orderRoute.post("/checkout", authMiddleware, checkout);

orderRoute.get("/", authMiddleware, getOrders);

orderRoute.get("/:id", authMiddleware, getOrderDetail);

export default orderRoute;

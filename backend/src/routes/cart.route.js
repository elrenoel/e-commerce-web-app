import { Router } from "express";
import { authMiddleware, authorize } from "../middlewares/auth.middleware.js";
import { addItemToCart, getCart, removeCartItem, updateCartItem } from "../controllers/cart.controller.js";

const cartRoute = Router();

// add item to cart
cartRoute.post("/items", authMiddleware, authorize('customer'), addItemToCart);

// get items cart
cartRoute.get("/", authMiddleware, authorize('customer'), getCart);

// update cart item
cartRoute.patch("/items/:variantId", authMiddleware, authorize('customer'), updateCartItem);

// delete cart item
cartRoute.delete("/items/:variantId", authMiddleware, authorize('customer'), removeCartItem);

export default cartRoute;

import { Router } from "express";
import { authMiddleware, authorize } from "../middlewares/auth.middleware.js";
import { createProduct, createProductVariant, getProducts, getProductDetail, updateProduct, deleteProduct, updateProductVariant, deleteProductVariant} from "../controllers/product.controller.js";

const productRoute = Router();

// Get All Products (All Users)
productRoute.get("/", getProducts);

// Get Detail One Product (All User)
productRoute.get("/:slug", getProductDetail);

// Create Product (Only Admin)
productRoute.post("/", authMiddleware, authorize("admin"), createProduct);

// Create Variants Product (Only Admin)
productRoute.post("/:productId/variants", authMiddleware, authorize("admin"), createProductVariant);

// Edit Product (Only Admin)
productRoute.patch("/:id", authMiddleware, authorize("admin"), updateProduct);

// Soft Delete Product (Only Admin)
productRoute.delete("/:id", authMiddleware, authorize("admin"), deleteProduct);

// Edit Product Variant (Only Admin)
productRoute.patch("/variants/:id", authMiddleware, authorize("admin"), updateProductVariant);

// Soft Delete Product Variant (Only Admin)
productRoute.delete("/variants/:id", authMiddleware, authorize("admin"), deleteProductVariant);

export default productRoute;
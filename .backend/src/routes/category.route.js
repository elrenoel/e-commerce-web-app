import {Router} from "express";
import { createCategory, getCategories } from "../controllers/category.controller.js";
import { authMiddleware, authorize } from "../middlewares/auth.middleware.js";

const categoryRoute = Router();

categoryRoute.get("/", getCategories);
categoryRoute.post("/", authMiddleware, authorize("admin"), createCategory);

export default categoryRoute;

import express from "express";
import { Validation, isAdmin } from "../middlewares/authMiddleware.js";
import { createCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create-category", Validation, isAdmin, createCategoryController);
export default router;

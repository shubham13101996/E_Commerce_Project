import express from "express";
import { Validation, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create-category", Validation, isAdmin, createCategoryController);
router.put(
  "/update-category/:id",
  Validation,
  isAdmin,
  updateCategoryController
);

export default router;

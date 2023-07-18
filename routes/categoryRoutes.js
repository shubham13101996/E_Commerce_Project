import express from "express";
import { Validation, isAdmin } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
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
//  all category lists
router.get("/get-category", categoryController);

// single category list
router.get("/single-category/:slug", singleCategoryController);

// delete category
router.delete(
  "/delete-category/:id",
  Validation,
  isAdmin,
  deleteCategoryController
);

export default router;

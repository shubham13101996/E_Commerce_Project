import express from "express";
import formidable from "express-formidable";
import {
  ProductPhotoController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
} from "../controllers/productController.js";
import { Validation, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-product",
  Validation,
  isAdmin,
  formidable(),
  createProductController
);

// get product
router.get("/get-product", getProductController);

// get single product
router.get("/get-product/:slug", getSingleProductController);

// get product photo
router.get("/product-photo/:pid", ProductPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

export default router;

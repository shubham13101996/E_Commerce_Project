import express from "express";
import formidable from "express-formidable";
import {
  ProductPhotoController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productListController,
  updateProductController,
} from "../controllers/productController.js";
import { Validation, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
// create product
router.post(
  "/create-product",
  Validation,
  isAdmin,
  formidable(),
  createProductController
);

// update product

router.put(
  "/update-product/:pid",
  Validation,
  isAdmin,
  formidable(),
  updateProductController
);

// get product
router.get("/get-product", getProductController);

// get single product
router.get("/get-product/:slug", getSingleProductController);

// get product photo
router.get("/product-photo/:pid", ProductPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

// filter product

router.post("/product-filters", productFilterController);

// pagination count product
router.get("/product-count", productCountController);

// per page product
router.get("/product-list/:page", productListController);
export default router;

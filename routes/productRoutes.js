import express from "express";
import formidable from "express-formidable";
import { createProductController } from "../controllers/productController.js";
import { Validation, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-product",
  Validation,
  isAdmin,
  formidable(),
  createProductController
);

export default router;

import express from "express";
import {
  loginController,
  registerController,
  validationController,
} from "../controllers/authController.js";
import { Validation } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/validate", Validation, validationController);
export default router;

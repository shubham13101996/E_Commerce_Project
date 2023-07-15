import express from "express";
import {
  loginController,
  registerController,
  validationController,
} from "../controllers/authController.js";
import { Validation, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/validate", Validation, isAdmin, validationController);
export default router;

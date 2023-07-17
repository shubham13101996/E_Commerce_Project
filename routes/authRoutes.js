import express from "express";
import {
  loginController,
  registerController,
  validationController,
  forgetPasswordController,
} from "../controllers/authController.js";
import { Validation, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgetPasswordController);
router.get("/validate", Validation, isAdmin, validationController);
router.get("/user-auth", Validation, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});
router.get("/admin-auth", Validation, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});
export default router;

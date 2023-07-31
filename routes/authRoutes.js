import express from "express";
import {
  loginController,
  registerController,
  validationController,
  forgetPasswordController,
  updateProfileController,
  getOrderController
} from "../controllers/authController.js";
import { Validation, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
// register user
router.post("/register", registerController);
// login user
router.post("/login", loginController);

// reset password
router.post("/forgot-password", forgetPasswordController);
// validate the user
router.get("/validate", Validation, isAdmin, validationController);

// protected user authentication
router.get("/user-auth", Validation, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// protected admin authentication
router.get("/admin-auth", Validation, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// update profile
router.put("/profile", Validation, updateProfileController);

router.get('/orders',Validation, getOrderController)
export default router;

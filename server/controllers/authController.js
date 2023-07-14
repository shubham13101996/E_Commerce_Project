import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !password || !email || !phone || !address) {
      return res.send({
        error: "ALL FIELDS ARE MANDATORY",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered Please login ",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5d" }
    );

    res.status(200).send({
      success: true,
      message: "User Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const validationController = (req, res) => {
  try {
    res.send({
      message: "protected",
    });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

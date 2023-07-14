import jwt from "jsonwebtoken";

export const Validation = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );

    next();
  } catch (error) {
    console.log(error);
  }
};

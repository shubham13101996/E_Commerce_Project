import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.get("/", (req, res) => {
  return res.send("<h1>WELCOME TO THE E_COMMERCE APP</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(
    `SERVER IS RUNNING ON PORT ${process.env.PORT} AND ON ${process.env.DEV_MODE}-MODE`
  );
});

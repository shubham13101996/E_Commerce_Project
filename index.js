import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from 'path'
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

// esmodule fix 
const __Filename = fileURLToPath(import.meta.url);
const __dirname=path.dirname(__Filename)

const app = express();
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/build')))

// routes

// app.get("/", (req, res) => {
//   res.send({
//     message: "Your App is running",
//   });
// });
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use('*',function(req,res){
res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

app.listen(process.env.PORT, () => {
  console.log(
    `SERVER IS RUNNING ON PORT ${process.env.PORT} AND ON ${process.env.DEV_MODE}-MODE`
  );
});

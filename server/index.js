import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
// dotEnv
dotenv.config();

// dataBase

import { connectDB } from "./config/db.js";
// Routes

import authRoutes from "./routes/authRoute.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoute.js";
// import slugify from "slugify";

// rest object
const app = express();

// PORT

const PORT = process.env.PORT || 8080;

// dataBase

connectDB();

// middleware
app.use(cors({
  origin: 'https://ecommerce-mern-eta-two.vercel.app'
}));
// app.use(express.json());
app.use(morgan("dev"));
// Assuming you are using Express.js
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
);

// Routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
// home
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to my website</h1>`);
});
// slugify test
// const name = "i am Muhammad Usman. and LEarning MERN";
// const slug = slugify(name, { lowercase: true });
// console.log(slug);
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.DEV_MODE} MODE`.bgCyan
      .white
  );
});

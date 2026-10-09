import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import express from "express";
import fs from "fs";

import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import counterRoutes from "./Routes/counterRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));

// app.use((req, res, next) => {
//   console.log("Hello From middleware 1");
//   req.myUserName = "MuhammadHaris.dev";
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Hello From middleware 2", req.myUserName);
//   next();
// });

// app.use((req, res, next) => {
//   fs.appendFile(
//     "log.txt",
//     `\n${Date.now()} ${req.ip} : ${req.method} : ${req.path}`,
//     (err, data) => {
//       next();
//     },
//   );
// });

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/counter", counterRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

if (!process.env.VERCEL) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Server is running on Port ${port}`));
}

export default app;

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on Port ${process.env.PORT}`);
// });

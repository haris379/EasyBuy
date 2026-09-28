import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getAllCategory,
  getProductWithCategory,
  updateProduct,
} from "../controller/productController.js";

import authMiddle from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/allCategories", getAllCategory);
router.get("/categories", getProductWithCategory);
router.get("/", getAllProducts);
router.get("/:id", getProduct);

// Admin Routes
router.post("/add-product", authMiddle, adminOnly, addProduct);
router.delete("/delete/:id", authMiddle, adminOnly, deleteProduct);
router.put("/update/:id", authMiddle, adminOnly, updateProduct);

export default router;

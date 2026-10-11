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

import adminOnly from "../middleware/adminMiddleware.js";
import { restrictToLoginUsersOnly } from "../middleware/auth.js";

const router = express.Router();

// Public Routes
router.get("/allCategories", getAllCategory);
router.get("/categories", getProductWithCategory);
router.get("/", getAllProducts);
router.get("/:id", getProduct);

// Admin Routes
router.post("/add-product", restrictToLoginUsersOnly, adminOnly, addProduct);
router.delete(
  "/delete/:id",
  restrictToLoginUsersOnly,
  adminOnly,
  deleteProduct,
);
router.put("/update/:id", restrictToLoginUsersOnly, adminOnly, updateProduct);

export default router;

import express from "express";
import {
  addItem,
  removeItem,
  getCart,
  increaseQunatity,
  decreaseQunatity,
} from "../controller/cartController.js";
import { restrictToLoginUsersOnly } from "../middleware/auth.js";
const router = express.Router();

router.post("/addToCart", restrictToLoginUsersOnly, addItem);
router.post("/removeItem", restrictToLoginUsersOnly, removeItem);
router.get("/:userId", restrictToLoginUsersOnly, getCart);
router.put("/increase/:productId", increaseQunatity);
router.put("/decrease/:productId", decreaseQunatity);

export default router;

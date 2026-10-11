import express from "express";
import {
  addCounter,
  decrementValue,
  deleteCounter,
  getCounters,
  incrementValue,
} from "../controller/counterController.js";
import { restrictToLoginUsersOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", restrictToLoginUsersOnly, getCounters);
router.post("/add", restrictToLoginUsersOnly, addCounter);
router.delete("/:id", restrictToLoginUsersOnly, deleteCounter);
router.put("/increment/:id", incrementValue);
router.put("/decrement/:id", decrementValue);

export default router;

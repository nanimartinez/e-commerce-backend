import express from "express";
import {
  getCart,
  addProductToCart,
  removeProductFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/:userId/add", addProductToCart);
router.delete("/:userId/remove/:productId", removeProductFromCart);
router.delete("/:userId/clear", clearCart);

export default router;
import express from "express";
import {
  getCart,
  addProductToCart,
  removeProductFromCart,
  updateCart,
  updateProductQuantity,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:cid", getCart);
router.post("/:cid/add", addProductToCart);
router.delete("/:cid/products/:pid", removeProductFromCart);
router.put("/:cid", updateCart);
router.put("/:cid/products/:pid", updateProductQuantity);
router.delete("/:cid/clear", clearCart);

export default router;
import express from "express";
import {
    renderProducts,
    renderProductDetail,
    renderCart,
} from "../controllers/viewsController.js";

const router = express.Router();

router.get("/", renderProducts);
router.get("/products/:pid", renderProductDetail);
router.get("/cart/:cid", renderCart);

export default router;
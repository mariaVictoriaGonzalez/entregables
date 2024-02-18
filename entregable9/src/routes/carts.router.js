import { Router } from "express";
import {
  getNewCart,
  renderCart,
  getCartById,
  deleteCartById,
  deleteProductFromCart,
  addProductToCart,
  modifyProductQuantityToCart,
  modifyProductOnCart,
} from "../controllers/carts.controller.js";

const router = Router();

router.post("/", getNewCart);

router.get("/", renderCart);

router.get("/:cid", getCartById);

router.delete("/:cid", deleteCartById);

router.delete("/:cid/products/:pid", deleteProductFromCart);

router.post("/:cid/products/:pid", addProductToCart);

router.put("/:cid", modifyProductQuantityToCart);

router.put("/:cid/products/:pid", modifyProductOnCart);

export default router;

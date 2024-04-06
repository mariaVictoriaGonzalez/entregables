import { Router } from "express";
import { authorization, passportCall } from "../utils.js";
import { getAllPRoducts, getProductById, createProduct, deleteProduct, modifyProduct, getMockProducts } from "../controllers/products.controller.js";

const router = Router();

router.get("/", passportCall("jwt"), authorization("user"), getAllPRoducts);

router.get("/:id", getProductById);

router.post("/", createProduct, passportCall("jwt"), authorization(["admin", "premium"]));

router.delete("/:id", deleteProduct);

router.put("/:id", modifyProduct, passportCall("jwt"), authorization(["admin", "premium"]));

router.get("/getmockproducts", getMockProducts);

export default router;

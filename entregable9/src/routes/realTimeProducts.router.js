import { Router } from "express";
import {
  renderRealTimeProducts,
  addProductOnRealTime,
} from "../controllers/realTimeProducts.controller.js";

const router = Router();

router.get("/", renderRealTimeProducts);

router.post("/", addProductOnRealTime);

export default router;

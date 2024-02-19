import { Router } from "express";
import ProductsService from "../services/dao/products.dao.js";
import { renderRealTimeProducts, addProductOnRealTime } from "../controllers/realTimeProducts.controller.js";

const producsService = new ProductsService();
const router = Router();

router.get("/", renderRealTimeProducts);

router.post("/", addProductOnRealTime);

export default (io) => {
  io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    socket.on("product_send", async (data) => {
      try {
        const product = {
          title: data.title,
          description: data.description,
          price: Number(data.price),
          thumbnail: data.thumbnail,
          code: data.code,
          stock: Number(data.stock),
          status: data.status,
          category: data.category,
        };
        await producsService.createProduct(product);
        io.emit("products", await producsService.getAllProducts());
        console.log(product);
        console.log(producsService.getAllProducts());
      } catch (error) {
        console.log(error);
      }
    });
    socket.emit("products", await producsService.getAllProducts());

    socket.on("delete_product", async (_id) => {
      await producsService.deleteProduct(_id);
      io.emit("products", await producsService.getAllProducts());
    });
  });
  return router;
};

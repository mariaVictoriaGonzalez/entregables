import { Router } from 'express';
import ProductManager from "../productManager.js";
import { Product } from "../productManager.js";

const router = Router();
const nuevoProductManager = new ProductManager("../products.json");

router.get("/", (request, response) => {
    response.render("realTimeProducts", {
        title: "Agregar productos en tiempo real.",
        fileCss: "../css/styles.css"
    });
});

router.post("/", async (request, response) => {
    const { title, description, price, thumbnail, code, stock, status, category } = request.body;

    const product = new Product(title, description, price, thumbnail, code, stock, status, category);

    try {
        await nuevoProductManager.addProduct(product);
        response.status(201).json({
            data: {
                message: "Producto creado",
            }
        });
    } catch (e) {
        response.status(500).json({
            error: {
                message: e.message,
            }
        });
    }
});

export default router;


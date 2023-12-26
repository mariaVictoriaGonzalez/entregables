import { Router, request, response } from "express";
import cartsDao from '../Daos/carts.dao.js';
import productsDao from "../daos/products.dao.js";

const router = Router();

router.get("/", async (request, response) => {
    try {
        response.render("carts", {
            title: "Carritos",
            fileCss: "../css/styles.css"
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get("/:cid", async (request, response) => {
    const { cid } = request.params;

    const cart = await cartsDao.getCartById(cid);

    if (cart) {
        return response.json(cart);
    } else {
        return response.send("ERROR: producto no encontrado.");
    }
});

router.post("/createNewCart", async (request, response) => {
    try {
        const newCart = await cartsDao.createCart();
        response.json({ newCartId: newCart._id });
    } catch (error) {
        console.error("Error creating a new cart:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/:cid/products/:pid", async (request, response) => {
    try {
        const { cid, pid } = request.params;
        const productId = pid; 

        const product = await productsDao.getProductById(productId);

        if (!product) {
            return response.status(404).json({ error: "Producto no encontrado." });
        };

        await cartsDao.addProductToCart(cid, productId);

        response.json({
            message: "Producto agregado al carrito exitosamente.",
            product,
        });
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        response.status(500).json({ error: "Error interno del servidor." });
    }
});

export default router;

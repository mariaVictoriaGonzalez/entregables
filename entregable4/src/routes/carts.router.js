import { Router, request, response } from "express";
import { Cart } from "../cartManager.js";
import { CartManager } from "../cartManager.js";

const router = Router();
const nuevoCartManager = new CartManager();

router.get("/", async (request, response) => {
    try {
        await nuevoCartManager.addCart();
        response.json({
            message: "Carrito creado."
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/:cid", async (request, response) => {
    const { cid } = request.params;
    const numberCid = Number(cid)

    const cart = await nuevoCartManager.getCartById(numberCid)

    if (cart) {
        return response.json(cart)
    } else {
        return response.send("ERROR: producto no encontrado.")
    }

});

router.post("/:cid/product/:pid", async (request, response) => {
    const { cid, pid } = request.params;
    await nuevoCartManager.addProductToCart(Number(cid), Number(pid))
    
    response.json({message: `Productocon ID ${pid} agregado al carrito nro ${cid}`})
})

export default router;

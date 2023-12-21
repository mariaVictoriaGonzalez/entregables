import { Router, request, response } from "express";
import cartsDao from '../Daos/carts.dao.js'

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

    const cart = await cartsDao.getCartById(cid)

    if (cart) {
        return response.json(cart)
    } else {
        return response.send("ERROR: producto no encontrado.")
    }

});

router.post("/:cid/product/:pid", async (request, response) => {
    const { cid, pid } = request.params;
    await cartsDao.addProductToCart(Number(cid), Number(pid))
    
    response.json({message: `Productocon ID ${pid} agregado al carrito nro ${cid}`})
})

export default router;

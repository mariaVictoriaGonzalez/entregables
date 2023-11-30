import { Router, request, response } from "express";
import ProductManager from "../productManager.js";
import { Product } from "../productManager.js";

const router = Router();
const nuevoProductManager = new ProductManager("../products.json");

router.get("/", async (request, response) => {
    const { limit } = request.query;
    const limitNumber = Number(limit);
    const products = await nuevoProductManager.getProducts();
    console.log("ingreso a productos");
    let productsToRender;

    try {
        if (limit) {
            productsToRender = products.splice(0, limitNumber)
        } else {
            productsToRender = products;
        }
        response.render("home", {
            title: "Productos",
            productsToRender: productsToRender})
    } catch {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }

});


router.get("/:id", async (request, response) => {
    const { id } = request.params;
    const numberId = Number(id)

    const product = await nuevoProductManager.getProductById(numberId)

    if (product) {
        return response.json(product)
    } else {
        return response.send("ERROR: producto no encontrado.")
    }

})

router.post("/", async (request, response) => {
    const { title, description, price, thumbnail, code, stock, status, category } = request.body;

    const product = new Product(title, description, price, thumbnail, code, stock, status, category);

    try {
        await nuevoProductManager.addProduct(product)
        response.json({
            message: "Producto creado.",
            product,
        })
    } catch (error) {
        error: error.message
    }

})

router.delete("/:id", async (request, response) => {
    const { id } = request.params;
    const numberId = Number(id);

    if (isNaN(numberId)) {
        return response.json({
            message: "Se necesita ingreso de un ID válido."
        });
    }

    try {
        await nuevoProductManager.deleteProduct(numberId);
        response.json({
            message: `Producto con ID ${numberId} eliminado.`,
        });
    } catch (error) {
        if (error.code === 'ECONNRESET') {
            console.error('Error de conexión:', error);
            return response.status(500).json({
                error: 'Error de conexión al intentar eliminar el producto.',
            });
        } else {
            response.status(500).json({
                error: error.message,
            });
        }
    }
});

router.put("/:id", async (request, response) => {
    const { id } = request.params;
    const { title, description, price, thumbnail, code, stock, status, category } = request.body;
    const updatedProduct = new Product(title, description, price, thumbnail, code, stock, status, category)

    const numberId = Number(id);

    try {
        await nuevoProductManager.updateProduct(numberId, updatedProduct);
        response.json({
            message: `Producto con ID ${numberId} modificado.`,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
            id: numberId,
        })
    } catch (error) {
        error: error.message
    }

})

export default router;
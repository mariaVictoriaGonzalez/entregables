import { Router } from "express";
import productsDao from "../daos/products.dao.js";

const router = Router();

router.get("/", async (request, response) => {
    const { limit } = request.query;
    const limitNumber = Number(limit);
    
    try {
        const products = await productsDao.getAllProducts();

        let productsToRender;
        if (limit) {
            productsToRender = products.slice(0, limitNumber);
        } else {
            productsToRender = products;
        }

        response.render("home", {
            title: "Productos",
            productsToRender: productsToRender,
            fileCss: "../css/styles.css"
        });
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal Server Error");
    }
});

router.get("/:id", async (request, response) => {
    const { id } = request.params;

    try {
        const product = await productsDao.getProductById(id);

        if (product) {
            return response.json(product);
        } else {
            return response.send("ERROR: producto no encontrado.");
        }
    } catch (error) {
        return response.status(500).json({
            error: error.message
        });
    }
});

router.post("/", async (request, response) => {
    const { title, description, price, thumbnail, code, stock, status, category } = request.body;
    const product = (title, description, price, thumbnail, code, stock, status, category);

    try {
        await productsDao.createProduct(product);
        response.json({
            message: "Producto creado.",
            product,
        });
    } catch (error) {
        return response.status(500).json({
            error: error.message
        });
    }
});

router.delete("/:id", async (request, response) => {
    const { id } = request.params;

    try {
        await productsDao.deleteProduct(id);
        response.json({
            message: `Producto con ID ${id} eliminado.`,
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
    const updatedProduct = new Product(title, description, price, thumbnail, code, stock, status, category);

    try {
        await productsDao.updateProduct(id, updatedProduct);
        response.json({
            message: `Producto con ID ${id} modificado.`,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
            id: numberId,
        });
    } catch (error) {
        return response.status(500).json({
            error: error.message
        });
    }
});


export default router;

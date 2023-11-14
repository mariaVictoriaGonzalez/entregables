import express, { request, response } from 'express';
import ProductManager from './productManager3'

const nuevoProductManager = new ProductManager();
const app = express();
const PORT = 8080


app.get("/", (request, response) => {
    response.send("<h1> Bienvenidos al servidor.</h1>");
})

app.get("/products", async (request, response) => {
    const { limit } = request.query;
    const limitNumber = Number(limit);
    const products = await nuevoProductManager.getProducts()

    if (limitNumber) {
        response.send(products.splice(limitNumber, 1))
    } else {
        response.json(products);
    }

});


app.get("/products/:id", async (request, response) => {
    const { id } = request.params;

    const product = await nuevoProductManager.getProductById(id)

    if (product) {
        return response.json(product)
    } else {
        return response.send("ERROR: producto no encontrado.")
    }

})

app.listen(PORT, () => console.log("Servidor en el puerto 8080 esta activo."))
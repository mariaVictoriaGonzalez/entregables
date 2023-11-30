import express, { request, response } from 'express';
import ProductManager from './productManager.js'

const nuevoProductManager = new ProductManager();
const app = express();
const PORT = 5050


app.get("/", (request, response) => {
    response.send("<h1> Bienvenidos al servidor.</h1>");
})

app.get("/products", async (request, response) => {
    const { limit } = request.query;
    const limitNumber = Number(limit);
    const products = await nuevoProductManager.getProducts()

    if (limit) {
        response.send(products.splice(0, limitNumber))
    } else {
        response.json(products);
    }

});


app.get("/products/:id", async (request, response) => {
    const { id } = request.params;
    const numberId = Number(id)

    const product = await nuevoProductManager.getProductById(numberId)

    if (product) {
        return response.json(product)
    } else {
        return response.send("ERROR: producto no encontrado.")
    }

})

app.listen(PORT, () => console.log("Servidor en el puerto 8080 esta activo."))
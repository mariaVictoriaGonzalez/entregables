import express, { request, response } from 'express';
import products from './products.json' assert {type: 'json'};

const app = express();
const PORT = 8080


app.get("/", (request, response)=>{
    response.send("<h1> Bienvenidos al servidor.</h1>");
})

app.get("/products", (request, response) => {
    const { limit } = request.query;
    const limitNumber = Number(limit);

    if (limitNumber){
        const limitedProducts = [];
        let counter = 0;

        products.forEach((product) => {
            if (counter < limitNumber) {
                limitedProducts.push(product);
                counter++;
            }
        });

        response.json(limitedProducts);
    } else {
        response.json(products);
    }

});


app.get("/products/:id", (request, response)=>{
    const { id } = request.params;

    const product = products.find((product) => product.id === Number(id))

    if (product){
        return response.json(product)
    } else{
        return response.send("ERROR: producto no encontrado.")
    }

})

app.listen(PORT, ()=>console.log("Servidor en el puerto 8080 esta activo."))
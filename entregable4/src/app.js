import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import realTimeProductsRouter from './routes/realTimeProducts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import ProductManager from "./productManager.js";
import { Product } from './productManager.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (request, response) => {
    response.send("<h1> Bienvenidos al servidor.</h1>");
})

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/realtimeproducts", realTimeProductsRouter);

app.engine("hbs", handlebars.engine({ extname: "hbs", defaultLayout: "main" }));
app.set("views", `${__dirname}/views`);
app.set("view engine", "hbs");

app.use(express.static(`${__dirname}/public`));

const httpServer = app.listen(PORT, () => console.log("Servidor en el puerto 8080 esta activo."));

const io = new Server(httpServer);
const nuevoProductManager = new ProductManager("../products.json");

io.on("connection", async socket => {
    console.log("Cliente conectado");

    socket.on("product_send", async (data) => {
        try {
            const product = new Product(data.title,
                data.description,
                Number(data.price),
                data.thumbnail,
                data.code,
                Number(data.stock),
                data.status,
                data.category
                );
            await nuevoProductManager.addProduct(product);
            io.emit("products", await nuevoProductManager.getProducts());
            console.log(product)
            console.log(nuevoProductManager.getProducts())
        } catch (error) {
            console.log(error)
        }
    });
    socket.emit("products", await nuevoProductManager.getProducts());
});

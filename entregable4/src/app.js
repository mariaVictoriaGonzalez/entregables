import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import realTimeProductsRouter from './routes/realTimeProducts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';

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

const socketServer = new Server(httpServer);

socketServer.on("connection", socket => {
    console.log("Cliente conectado")
});


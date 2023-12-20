import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import realTimeProductsRouter from './routes/realTimeProducts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js';
import { Server } from 'socket.io';
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import mongoose from 'mongoose';
import Handlebars from 'handlebars';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
    response.send("<h1> Bienvenidos al servidor.</h1>");
})

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.engine("hbs", handlebars.engine({ extname: "hbs", defaultLayout: "main", handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set("views", `${__dirname}/views`);
app.set("view engine", "hbs");

app.use(express.static(`${__dirname}/public`));

const httpServer = app.listen(PORT, () => console.log("Servidor en el puerto 8080 esta activo."));

const io = new Server(httpServer);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mi_base_de_datos_local';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('DB connected'))
    .catch((err) => console.error('Error connecting to the database:', err));

    app.use('/api/realtimeproducts', realTimeProductsRouter(io));


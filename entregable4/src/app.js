import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (request, response) => {
    response.send("<h1> Bienvenidos al servidor.</h1>");
})

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.engine("hbs", handlebars.engine({ extname: "hbs", defaultLayout: "main" }));
app.set("views", `${__dirname}/views`);
app.set("view engine", "hbs");

app.use(express.static(`${__dirname}/public`));

app.listen(PORT, () => console.log("Servidor en el puerto 8080 esta activo."));

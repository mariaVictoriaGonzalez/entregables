import ProductsService from "../services/dao/products.dao.js";

const productsService = new ProductsService();

export const renderRealTimeProducts = (request, response) => {
  response.render("realTimeProducts", {
    title: "Agregar productos en tiempo real.",
    fileCss: "../css/styles.css",
  });
};

export const addProductOnRealTime = async (request, response) => {
  const {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  } = request.body;

  const product = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  };

  try {
    await productsService.createProduct(product);
    response.status(201).json({
      data: {
        message: "Producto creado",
      },
    });
  } catch (e) {
    response.status(500).json({
      error: {
        message: e.message,
      },
    });
  }
};

export default (io) => {
  io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    socket.on("product_send", async (data) => {
      try {
        const product = {
          title: data.title,
          description: data.description,
          price: Number(data.price),
          thumbnail: data.thumbnail,
          code: data.code,
          stock: Number(data.stock),
          status: data.status,
          category: data.category,
        };
        await productsService.createProduct(product);
        io.emit("products", await productsService.getAllProducts());
        console.log(product);
        console.log(productsService.getAllProducts());
      } catch (error) {
        console.log(error);
      }
    });
    socket.emit("products", await productsService.getAllProducts());

    socket.on("delete_product", async (_id) => {
      await productsService.deleteProduct(_id);
      io.emit("products", await productsService.getAllProducts());
    });
  });
};

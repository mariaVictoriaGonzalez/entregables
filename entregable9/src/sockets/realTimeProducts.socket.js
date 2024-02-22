import ProductsService from "../services/dao/products.dao.js";

const productsService = new ProductsService();

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

        // Llama a la función emitAddProduct para emitir el evento "products" con la lista actualizada
        emitAddProduct();

        console.log(product);
        console.log(await productsService.getAllProducts());
      } catch (error) {
        console.error("Error al procesar el producto:", error.message);
        socket.emit("product_send_error", { error: error.message });
      }
    });

    // Emite la lista de productos al cliente cuando se conecta
    socket.emit("products", await productsService.getAllProducts());

    async function emitAddProduct(product) {
      // Emite la lista actualizada de productos
      io.emit("products", {docs: await productsService.getAllProducts()} );
    }

    socket.on("delete_product", async (_id) => {
      await productsService.deleteProduct(_id);
      // Emite la lista actualizada de productos después de eliminar un producto
      emitAddProduct();
    });
  });
};


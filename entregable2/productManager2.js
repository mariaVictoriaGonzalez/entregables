const fs = require("fs");

class ProductManager {
    constructor() {
        this.path = "./products.json";

        if(fs.existsSync(this.path)){
            try{
                this.getProducts();
            } catch (error){
                console.log(error)
            }
        } else{
            this.products = [];
            this.saveFile();
        }
    }

    async saveFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
            console.log("Archivo guardado correctamente.");
        } catch (error) {
            console.log(error);
        }
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, "utf-8");
            if (data.trim() === ""){
                this.products = [];
            } else{
                this.products = JSON.parse(data);
            }
            return this.products;
        } catch (error) {
            console.log("Error al recuperar productos.");
            console.log(error)
        }
    }

    addProduct(product) {
        if (!product || !product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return "Faltan datos para agregar el producto.";
        }

        if (!product.id) {
            product.id = this.products.length + 1;
        }

        if (this.products.find((p) => p.code === product.code)) {
            product.code = "abc" + Math.trunc(Math.random() * 100);
            console.log("El código de producto ya existe. Se agregará el producto con un código generado automáticamente...");
        }

        this.products.push(product);

        this.saveFile();
    }

    getProductById(id) {
        const searchedProduct = this.products.find((product) => product.id === id);

        if (!searchedProduct) {
            return "El producto no existe";
        } else {
            return searchedProduct;
        }
    }

    async deleteProduct(id){
        const index = this.products.findIndex((product) => product.id === id)

        if(index ===-1){
            return console.log("El producto no existe.")
        }

        try {
            this.products.splice(index,1);
            await this.saveFile()
            console.log("Producto eliminado.")
        } catch(error) {
            console.log("Hubo un error al borrar el producto.")
        }
    }

    updateProduct(id,updatedProduct){
        const index = this.products.findIndex((product) => product.id === id);

        if(index === -1){
            return console.log("El producto no existe.")
        } else{
            const {id, ...restOfProduct} = updatedProduct
            this.products[index] = {...this.products[index], ...restOfProduct};
            this.saveFile();
            console.log("El producto fue actualizado.")
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock, id) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = id;
    }
}

// Tests

const productManager = new ProductManager();
const retrieveProducts = productManager.getProducts();

console.log(retrieveProducts)

console.log("Agregando producto de prueba...");
productManager.addProduct(
    new Product("Producto prueba", "Este es un producto de prueba", 200, "Sin imagen.", "abc123", 25)
);

productManager.addProduct(
    new Product("Producto prueba 2", "Este es un producto de prueba, otra vez.", 220, "Sin imagen.", "abc1234", 27)
);

productManager.addProduct(
    new Product("Producto prueba 3", "Este es un producto de prueba más, otra vez.", 270, "Sin imagen.", "abc12345", 37)
);

console.log("Recuperando productos...");
console.log(retrieveProducts)

console.log("Buscando producto con el id: 2 ......", productManager.getProductById(2));
console.log("Buscando producto con el id: 1247 ......", productManager.getProductById(1247));

productManager.updateProduct(
    1,
    new Product("Producto actualizado", "Este es un producto actualizado", 270, "Sin imagen.", "abc12345", 30)
);

console.log("Recuperando productos...");
console.log(retrieveProducts)

/*console.log("Borrando el producto con el id: 2 ......");
productManager.deleteProduct(2)

console.log("Recuperando productos...");
productManager.getProducts();*/
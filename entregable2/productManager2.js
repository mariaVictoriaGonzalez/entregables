const fs = require("fs");

class ProductManager {
    constructor() {
        this.path = "./products.json";

        if(fs.existsSync(this.path)){
            try{
                this.getProducts();
                this.products = [];
            } catch (error){
                console.log(error)
            }
        } else{
            this.products = [];
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
            this.products = JSON.parse(data);
            return console.log(this.products);
        } catch (error) {
            console.log("Error al recuperar productos.");
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

console.log("Agregando producto de prueba...");
productManager.addProduct(
    new Product("Producto prueba", "Este es un producto de prueba", 200, "Sin imagen.", "abc1234", 25, 1)
);

productManager.addProduct(
    new Product("Producto prueba 2", "Este es un producto de prueba, otra vez.", 220, "Sin imagen.", "abc123", 27, 2)
);

console.log("Recuperando productos...");
productManager.getProducts();

console.log("Buscando producto con el id: 1 ......", productManager.getProductById(1));
console.log("Buscando producto con el id: 1247 ......", productManager.getProductById(1247));

productManager.addProduct(
    new Product("Producto prueba 3", "Este es un producto de prueba... mas.", 280, "Sin imagen.", "abc1234", 17, 3)
);

console.log("Recuperando productos...");
productManager.getProducts();


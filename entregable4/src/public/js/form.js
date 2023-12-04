const socket = io();
const form = document.querySelector("#realTimeProducts");
const productsContainer = document.querySelector("#products");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const product = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        thumbnail: formData.get("thumbnail"),
        code: formData.get("code"),
        stock: Number(formData.get("stock")),
        status: formData.get("status"),
        category: formData.get("category"),
    };

    socket.emit("product_send", product);

    form.reset();
});

socket.on("products", (data) => {
    productsContainer.innerHTML = "";

    if (Array.isArray(data)) {
        data.forEach((product) => {
            addProductToUI(product);
        });
    } else {
        console.error("Invalid data format:", data);
    }
});

function addProductToUI(product) {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
        <p>
            Título: ${product.title} -
            Descripción: ${product.description} -
            Precio: ${product.price} -
            Imagen: ${product.thumbnail} -
            Código: ${product.code} -
            Stock: ${product.stock} -
            Estado: ${product.status} -
            Categoría: ${product.category} -
            <button id="button-${product.id}">Eliminar</button>
        </p>
    `;
    productsContainer.appendChild(productElement);
}

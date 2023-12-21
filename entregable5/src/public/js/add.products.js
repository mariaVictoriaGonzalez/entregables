async function addToCart(_id) {
    try {
        const response = await fetch(`/addToCart/${_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            alert(`Producto agregado al carrito exitosamente.`);
        } else {
            const errorData = await response.json();
            console.error('Error al agregar producto al carrito:', errorData.error);
            alert(`Error al agregar producto al carrito: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Error de red al intentar agregar producto al carrito.');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const addButtons = document.querySelectorAll(".addProductToCart");

    addButtons.forEach(button => {
        button.addEventListener("click", function() {
            const _id = button.getAttribute("data-id");

            addToCart(_id);
        });
    });
});

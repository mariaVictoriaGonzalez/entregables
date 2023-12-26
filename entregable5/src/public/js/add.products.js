async function addToCart(cartId, productId) {
    if (!cartId) {
        try {
            const newCartResponse = await fetch(`/api/carts/createNewCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { newCartId } = await newCartResponse.json();

            const addToCartResponse = await fetch(`/api/carts/${newCartId}/products/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });

            const data = await addToCartResponse.json();
            console.log('Product added to the cart:', data);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const addButtons = document.querySelectorAll(".addProductToCart");

    addButtons.forEach(button => {
        button.addEventListener("click", function() {
            const cartId = button.getAttribute("data-cid");
            const productId = button.getAttribute("data-pid");
            console.log(cartId, productId);
            addToCart(cartId, productId);
        });
    });
});

// main.js

// Función para agregar un producto al carrito
async function addToCart(productId) {
    try {
        const response = await fetch("/api/carts/:cid/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId, quantity: 1 }),
        });

        const data = await response.json();
        if (data.status === "success") {
            alert("Producto agregado al carrito");
        } else {
            alert("Error al agregar el producto al carrito");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Función para eliminar un producto del carrito
async function removeFromCart(productId) {
    try {
        const response = await fetch(`/api/carts/:cid/products/${productId}`, {
            method: "DELETE",
        });

        const data = await response.json();
        if (data.status === "success") {
            alert("Producto eliminado del carrito");
            location.reload(); // Recargar la página para actualizar la vista
        } else {
            alert("Error al eliminar el producto del carrito");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
// Agrego un evento click al botón "Agregar al Carrito" usando delegación de eventos
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("addToCartButton")) {
        const productId = event.target.dataset.productId;
        const quantityInput = event.target.parentNode.querySelector(".productQuantity");
        const quantity = parseInt(quantityInput.value);

        // Obtengo el cartId desde sessionStorage
        const cartId = sessionStorage.getItem("cartId");

        // Realiza una solicitud POST al servidor para agregar el producto al carrito
        fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quantity: quantity })
        })
        .then(response => response.json())
        .then(data => {
            // Muestra una notificación de éxito con Sweet Alert
            swal("Éxito", "Producto agregado con éxito", "success")
            .then(() => {
                console.log(data);
                // Otra acción si es necesaria
            });
        })
        .catch(error => {
            // Muestra una notificación de error con Sweet Alert
            swal("Error", "Error al agregar el producto al carrito", "error");
            console.error("Error al agregar el producto al carrito:", error);
        });
    }
});

document.querySelectorAll('.showDetailsButton').forEach(button => {
    button.addEventListener('click', () => {
        const container = button.parentNode.parentNode.querySelector('.detailsContainer');
        container.style.display = container.style.display === 'none' ? 'block' : 'none';
    });
});

// Agrego un evento click al botón "Eliminar" usando delegación de eventos
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("deleteProductButton")) {
        // Obtengo el cartId desde sessionStorage
        const cartId = sessionStorage.getItem("cartId");
        const productId = event.target.dataset.productId;

        // Realiza una solicitud DELETE al servidor para eliminar el producto del carrito
        fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            // Muestra una notificación de éxito con Sweet Alert
            swal("Éxito", "Producto eliminado con éxito", "success")
            .then(() => {
                console.log(data);
                location.reload(); // Recarga la página
            });
        })
        .catch(error => {
            // Muestra una notificación de error con Sweet Alert
            swal("Error", "Error al eliminar el producto del carrito", "error");
            console.error("Error al eliminar el producto del carrito:", error);
        });
    }
});

// Agrego un evento click al botón "Vaciar Carrito" usando delegación de eventos
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("vaciarCarrito")) {
        // Obtengo el cartId desde el botón
        const cartId = event.target.dataset.cartId;

        // Realiza una solicitud DELETE al servidor para vaciar el carrito
        fetch(`/api/carts/${cartId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            // Muestra una notificación de éxito con Sweet Alert
            swal("Éxito", "Carrito vaciado con éxito", "success")
            .then(() => {
                console.log(data);
                location.reload(); // Recarga la página
            });
        })
        .catch(error => {
            // Muestra una notificación de error con Sweet Alert
            swal("Error", "Error al vaciar el carrito", "error");
            console.error("Error al vaciar el carrito:", error);
        });
    }
});

<script src="ruta/al/archivo/sweetalert2.all.min.js"></script>
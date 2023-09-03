// Importa Toastr
import toastr from 'toastr';
import '../../views/toastr.css'; 

// Configura opciones globales de Toastr (opcional)
toastr.options = {
    closeButton: true, // Muestra un botón de cierre en las notificaciones
    positionClass: 'toast-top-right', // Posición de las notificaciones en la pantalla
};

// Agrega un evento click al botón "Agregar al Carrito" usando delegación de eventos
document.addEventListener("click", function(event) {
    console.log("Click event triggered");
    if (event.target.classList.contains("addToCartButton")) {
        const productId = event.target.dataset.productId;
        const quantityInput = event.target.parentNode.querySelector(".productQuantity");
        const quantity = parseInt(quantityInput.value);

        // Obtén el cartId desde sessionStorage
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
            // Muestra una notificación de éxito con Toastr
            toastr.success("Producto agregado con éxito");

            // Realiza alguna acción después de agregar el producto al carrito
            console.log(data);
        })
        .catch(error => {
            // Muestra una notificación de error con Toastr
            toastr.error("Error al agregar el producto al carrito");

            console.error("Error al agregar el producto al carrito:", error);
        });
    }
});

// Agrega un evento click al botón "Eliminar" usando delegación de eventos
document.addEventListener("click", function(event) {
    console.log("Click event triggered");
    if (event.target.classList.contains("deleteProductButton")) {
        // Obtén el cartId desde sessionStorage
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
            // Muestra una notificación de éxito con Toastr
            toastr.success("Producto eliminado con éxito");

            // Realiza alguna acción después de eliminar el producto del carrito
            console.log(data);
            location.reload(); // Recarga la página
        })
        .catch(error => {
            // Muestra una notificación de error con Toastr
            toastr.error("Error al eliminar el producto del carrito");

            console.error("Error al eliminar el producto del carrito:", error);
        });
    }
});

// Agrega un evento click al botón "Vaciar Carrito" usando delegación de eventos
document.addEventListener("click", function(event) {
    console.log("Click event triggered");
    if (event.target.classList.contains("vaciarCarrito")) {
        // Obtén el cartId desde el botón
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
            // Muestra una notificación de éxito con Toastr
            toastr.success("Carrito vaciado con éxito");

            // Realiza alguna acción después de vaciar el carrito
            console.log(data);
            location.reload(); // Recarga la página
        })
        .catch(error => {
            // Muestra una notificación de error con Toastr
            toastr.error("Error al vaciar el carrito");

            console.error("Error al vaciar el carrito:", error);
        });
    }
});

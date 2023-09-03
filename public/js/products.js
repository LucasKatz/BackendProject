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
          // Realiza alguna acción después de agregar el producto al carrito
            Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
            console.log(data);
            console.log("Producto agregado con éxito");
        })
        .catch(error => {
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
            // Realiza alguna acción después de eliminar el producto del carrito
            Toastify({
                text: "Producto eliminado del carrito",
                duration: 3000,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
            console.log(data);
            console.log("Producto eliminado con éxito");
            location.reload(); // Recarga la página
        })
        .catch(error => {
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
            // Realiza alguna acción después de vaciar el carrito
            Toastify({
                text: "Carrito vaciado con éxito",
                duration: 3000,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
            console.log(data);
            console.log("Carrito vaciado con éxito");
            location.reload(); // Recarga la página
        })
        .catch(error => {
            console.error("Error al vaciar el carrito:", error);
        });
    }
});

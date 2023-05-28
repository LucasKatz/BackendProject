// Agrega un evento click al botón "Agregar al Carrito" usando delegación de eventos
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

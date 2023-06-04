

document.addEventListener("DOMContentLoaded", () => {
    const finalizarCompraButton = document.getElementById("finalCompra");
    if (finalizarCompraButton) {
        finalizarCompraButton.addEventListener("click", () => {
        const cartId = finalizarCompraButton.getAttribute("data-cart-id");

        fetch(`/ticket/${cartId}/purchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.ticketId) {
                    window.location.href = `/ticket/${data.ticketId}`;
                } else {
                    console.error(data.error);
                    // Manejar el error en caso de que ocurra
                }
            })
            .catch(error => {
                console.error(error);
                // Manejar el error en caso de que ocurra
            });
        
    });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const finalizarCompraButton = document.getElementById("finalCompra");
    if (finalizarCompraButton) {
    finalizarCompraButton.addEventListener("click", () => {
        console.log("Finalizando compra");
        const cartId = finalizarCompraButton.getAttribute("data-cart-id");
        console.log("invoco al endpoint una vez");
    fetch(`/ticket/${cartId}/purchase`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        })
            .then((response) => response.json())
            .then((data) => {
            if (data._id) {
                console.log("Ticket creado con exito")
                window.location.href = `/ticket/${data._id}`;
            } else {
                console.error(data.error);
              // Manejar el error en caso de que ocurra
            }
        })
            .catch((error) => {
            console.error(error);
            // Manejar el error en caso de que ocurra
        });
    });
    }
  });
  
document.addEventListener("DOMContentLoaded", () => {
  const finalizarCompraButton = document.getElementById("finalCompra");
  if (finalizarCompraButton) {
    finalizarCompraButton.addEventListener("click", () => {
    console.log("Finalizando compra");
    const cartId = finalizarCompraButton.getAttribute("data-cart-id");

    fetch(`/ticket/${cartId}/purchase-redirect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      if (response.ok) {
        // La redirección se completó correctamente.
        // Puedes realizar alguna acción adicional aquí si es necesario.
        response.json().then(data => {
          window.location.href = data.redirectUrl; 
        });
      } else {
        // Manejo de error si la redirección no se completó correctamente.
        console.error("La redirección a MercadoPago no se completó correctamente.");
      }
    })
    .catch(error => {
      console.error(error);
    });
  });
}
});





document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("Submit");
  submitButton.addEventListener("click", async () => {
    try {
      const ticketContent = document.querySelector(".content").innerHTML;

      const response = await fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketHTML: ticketContent }),
      });

      if (response.ok) {
        const data = await response.json();
        const email = data.email 

        console.log("Correo electrónico enviado exitosamente");

        const cartId = data.cartId;
  

        const deleteCartResponse = await fetch(`/api/carts/${cartId}`, {
          method: "DELETE",
      });

      if (deleteCartResponse.ok) {
        console.log("Carrito vaciado exitosamente");
      } else {
        console.error("Error al vaciar el carrito");
      }


        setTimeout(() => {
          window.location.href = "/thankyou";
        }, 2000);
      } else {
        console.error("Error al enviar el correo electrónico");
      }
    } catch (error) {
      window.location.href = "/thankyou";
      console.error("Error al enviar el correo electrónico:", error);
    }
  });
});

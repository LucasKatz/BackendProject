document.addEventListener("DOMContentLoaded", () => {
  // Agrega un evento de clic al botón "Pagar en Efectivo"
  const pagoEfectivoButton = document.querySelector(".pagoEfectivoButton");
  if (pagoEfectivoButton) {
      pagoEfectivoButton.addEventListener("click", async () => {
          const cartId = pagoEfectivoButton.getAttribute("data-cart-id");

          try {
              const response = await fetch(`/ticket/${cartId}/purchase`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
              });

              if (response.ok) {
                  // La solicitud para pagar en efectivo se completó correctamente.
                  // Realiza alguna acción adicional si es necesario.
                  // Por ejemplo, puedes mostrar un mensaje de éxito.
                  console.log("Pago en efectivo completado correctamente.");
              } else {
                  // Manejo de errores si la solicitud no se completó correctamente.
                  console.error("Error al realizar el pago en efectivo.");
              }
          } catch (error) {
              console.error(error);
          }
      });
  }

  // Agrega un evento de clic al botón "Pagar con MercadoPago"
  const pagoMercadoPagoButton = document.querySelector(".pagoMercadoPagoButton");
  if (pagoMercadoPagoButton) {
      pagoMercadoPagoButton.addEventListener("click", async () => {
          const cartId = pagoMercadoPagoButton.getAttribute("data-cart-id");

          try {
              const response = await fetch(`/ticket/${cartId}/purchase-redirect`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
              });

              if (response.ok) {
                  // La redirección se completó correctamente.
                  // Puedes realizar alguna acción adicional aquí si es necesario.
                  response.json().then(data => {
                      window.location.href = data.redirectUrl;
                  });
              } else {
                  // Manejo de errores si la redirección no se completó correctamente.
                  console.error("La redirección a MercadoPago no se completó correctamente.");
              }
          } catch (error) {
              console.error(error);
          }
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

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
        
          }
      })
          .catch((error) => {
          console.error(error);
    
      });
  });
  }
});

  // Agrega un evento de clic al botón "Pagar con MercadoPago"
  const pagoMercadoPagoButton = document.querySelector(".pagoMercadoPagoButton");
  if (pagoMercadoPagoButton) {
      pagoMercadoPagoButton.addEventListener("click", async () => {
          const cartId = pagoMercadoPagoButton.getAttribute("data-cart-id");

          try {
            console.log("hasta aca todo bien")
              const response = await fetch(`/ticket/${cartId}/purchase`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                });
                console.log("a ver si esto llega")

              if (response.ok) {
                  // La redirección se completó correctamente.
                  console.log("la redireccion va bien")
                  response.json().then(data => {
                      console.log(data)
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
;






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

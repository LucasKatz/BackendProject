// Obtener los botones
const userButton = document.getElementById('premiumButton');

// Agregar un event listener al botón de cambiar a premium
userButton.addEventListener('click', async () => {
  try {
//como puedo obtener el ID??
    const response = await fetch(`/premium/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        role: 'premium'  //Como hago de este un valor dinamico??
      })
    });

    const data = await response.json();
    console.log(data); 
  } catch (error) {
    console.error(error);
  }
});


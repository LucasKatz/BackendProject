

const rolButton = document.getElementById('rolButton');


rolButton.addEventListener('click', async (event) => {
  event.preventDefault();

  // Obtener el ID del usuario del atributo data
  const userId = event.target.dataset.userId;

  try {
    // Realizar la solicitud al backend utilizando fetch
    const response = await fetch('/listOfUsers', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    // Verificar el estado de la respuesta
    if (response.ok) {
      const data = await response.json();
      // Hacer algo con la respuesta del backend
      console.log(data);
    } else {
      console.error('Error en la solicitud al backend');
    }
  } catch (error) {
    console.error(error);
  }
});

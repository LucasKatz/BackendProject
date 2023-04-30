// Obtener los botones
const premiumButton = document.getElementById('premiumButton');
const userButton = document.getElementById('userButton');

// Agregar un event listener al botón de cambiar a premium
premiumButton.addEventListener('click', async () => {
  try {
    const response = await fetch(`/api/users/premium/${session.user}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        role: 'premium'
      })
    });

    const data = await response.json();
    console.log(data); 
  } catch (error) {
    console.error(error);
  }
});

// Agregar un event listener al botón de cambiar a usuario
userButton.addEventListener('click', async () => {
  try {
    const response = await fetch(`/api/users/premium/${session.user}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        role: 'user'
      })
    });

    const data = await response.json();
    console.log(data); 
  } catch (error) {
    console.error(error);
  }
});

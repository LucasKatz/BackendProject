
document.getElementById('restablecer').addEventListener('click', async (event) => {
    event.preventDefault();

    const password = document.querySelector('input[name="Newpassword"]').value;
    const repeatPassword = document.querySelector('input[name="repeatNewPassword"]').value;

    let pathname = window.location.pathname.split("/")
    let token = pathname[pathname.length-1]


    const response = await fetch('/reset/:token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        token,
        password,
        repeatPassword
        })
    });

    const data = await response.json();
    alert("Contraseña cambiada con exito");
    window.location.href = '/login'; // Redireccionar al usuario a la página de inicio de sesión
    });


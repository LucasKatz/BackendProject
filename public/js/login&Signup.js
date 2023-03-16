const elementExists = (id) => document.getElementById(id) !== null;

elementExists("send") &&
    document.getElementById("send").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        username,
        password,
        }),
    })
    .then(response=> response.json())
    .then (data =>{
        if (data.message === "logged in") {
                console.log('Intentando redireccionar...')
                window.location.href = "/current"
            } else {
                alert("Credenciales incorrectas")
            }
        }
    )
    .catch((error) => console.error(error));
    });



elementExists("ingreso") &&
    document.getElementById("ingreso").addEventListener("click", function(){
        window.location.href="/current"
    })



elementExists("signup") &&
    document.getElementById("signup").addEventListener("click", function () {
    
if(!first_name || !last_name|| !email||!password||!age){
    console.alert("Por favor rellenar todos los campos")
}else {
    fetch("/signup", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
        body: JSON.stringify(({
            first_name,
            last_name,
            email,
            age,  
            password,
        })),
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
}
    });



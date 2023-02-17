const elementExists = (id) => document.getElementById(id) !== null;

elementExists("send") &&
    document.getElementById("send").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(`/login?username=${username}&password=${password}`, {});
    console.log("aqui voy api")
        .then((response) => response.json())
        //.then((data) => console.log(data))
        .catch((error) => console.error(error));
    });

//elementExists("getButton") &&
 //   document.getElementById("getButton").addEventListener("click", function () {
  //  fetch("/getSignedCookie").then((response) => {
   //     response.json().then((data) => {
  //          console.log(data);
  //      });
  //  });
 //   });

elementExists("signup") &&
    document.getElementById("signup").addEventListener("click", function () {
        const first_name= document.getElementById("first_name").value;
        const last_name= document.getElementById("last_name").value;
        const email= document.getElementById("email").value;
        const password= document.getElementById("password").value;
        const age = document.getElementById("age").value;
if(!first_name || !last_name|| !email||!password||!age){
return alert ("Todos los campos son obligatorios")
}else {
    fetch("/signup", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            age  
        }),
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
}
    });

elementExists("forgotPassword") &&
  document
    .getElementById("forgotPassword")
    .addEventListener("click", function () {
      const email = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const repeatPassword = document.getElementById("repeatPassword").value;

      let pathname = window.location.pathname.split("/")
      let token = pathname[pathname.length-1]

      fetch(`/reset/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password, repeatPassword }) ,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    });
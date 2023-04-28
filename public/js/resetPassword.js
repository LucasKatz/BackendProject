import { resetPassword } from "../../Controllers/forgotRoutesController"

document.getElementById("restablecer").addEventListener("click", function(){
    resetPassword();
})
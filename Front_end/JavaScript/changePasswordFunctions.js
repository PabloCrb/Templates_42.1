
// Función para mostrar/ocultar el contenedor de cambio de contraseña
function toggleChangePassword() {
    var container = document.getElementById('changePasswordContainer');
    container.classList.toggle('active');
}

async function validateOfChangePassword() {
    localStorage.getItem('userId');
    const pass1 = document.getElementById("newPassword");
    console.log(pass1.value);
    const pass2 = document.getElementById("repeatPassword");
    console.log(pass2.value);
    var errorDiv = document.getElementById("passwordError");

    if (pass1.value !== pass2.value) {
        errorDiv.innerText = "Passwords do not match";
    } else if (pass1.value === "" && pass2.value === "") {
        errorDiv.innerText = "Password is empty";
    } else if (pass1.value.length < 6){
        errorDiv.innerText = "At least 6 characters";
    }
}

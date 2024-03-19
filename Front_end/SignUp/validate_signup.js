// validate_signup.js
function validateForm() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    if (password.value !== confirmPassword.value) {
        password.classList.add("error");
        confirmPassword.classList.add("error");
        password.value = "";
        confirmPassword.value = "";
        alert("Las contraseñas no coinciden")
        return false;
    } else {
        confirmPassword.classList.remove("error");
        password.classList.remove("error");
    }

    return true;
}

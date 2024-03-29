function validatePassword() {
    const pass1 = document.getElementById("password").value;
    const pass2 = document.getElementById("confirmPassword").value;
    const errorDiv = document.getElementById("passwordError");

    if (pass1 !== pass2) {
        errorDiv.innerText = "Passwords do not match";
    } else if (pass1.length < 6) {
        errorDiv.innerText = "Password should be at least 6 characters";
    } else {
        errorDiv.innerText = "";
        window.location.href = "../index.html";
    }
}

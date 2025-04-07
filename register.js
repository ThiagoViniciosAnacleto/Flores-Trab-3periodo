document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const registerError = document.getElementById("registerError");

        emailError.textContent = "";
        passwordError.textContent = "";
        registerError.textContent = "";

        let isValid = true;

        if (!email) {
            emailError.textContent = "Informe o e-mail.";
            isValid = false;
        } else if (!validateEmail(email)) {
            emailError.textContent = "Formato inválido.";
            isValid = false;
        }

        if (!password || password.length < 6) {
            passwordError.textContent = "Senha com no mínimo 6 caracteres.";
            isValid = false;
        }

        if (password !== confirmPassword) {
            passwordError.textContent = "As senhas não coincidem.";
            isValid = false;
        }

        if (isValid) {
            const users = JSON.parse(localStorage.getItem("users")) || [];

            const exists = users.some(u => u.email === email);
            if (exists) {
                registerError.textContent = "E-mail já cadastrado.";
                return;
            }

            users.push({ email, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Cadastro realizado com sucesso!");
            window.location.href = "login.html"; // redirecionamento correto
        }
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Captura os valores dos campos
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const loginError = document.getElementById("loginError");

        // Reseta mensagens de erro
        emailError.textContent = "";
        passwordError.textContent = "";
        loginError.textContent = "";

        let isValid = true;

        // Validação do e-mail
        if (!email) {
            emailError.textContent = "O e-mail é obrigatório.";
            isValid = false;
        } else if (!validateEmail(email)) {
            emailError.textContent = "Formato de e-mail inválido.";
            isValid = false;
        }

        // Validação da senha
        if (!password) {
            passwordError.textContent = "A senha é obrigatória.";
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = "A senha deve ter pelo menos 6 caracteres.";
            isValid = false;
        }

        // Se for válido, simula o login
        if (isValid) {
            // Simulação: verifica um usuário fixo (pode ser integrado com um banco de dados futuramente)
            const mockUser = { email: "usuario@teste.com", password: "123456" };

            if (email === mockUser.email && password === mockUser.password) {
                localStorage.setItem("user", email); // Armazena a sessão
                window.location.href = "dashboard.html"; // Redireciona para outra página
            } else {
                loginError.textContent = "E-mail ou senha incorretos.";
            }
        }
    });

    // Função para validar formato de e-mail
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

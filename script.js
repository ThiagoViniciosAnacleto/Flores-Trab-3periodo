document.addEventListener("DOMContentLoaded", function () {
    // Código para o formulário de login
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const emailError = document.getElementById("emailError");
            const passwordError = document.getElementById("passwordError");
            const loginError = document.getElementById("loginError");

            // Resetando mensagens de erro
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

            // Se for válido, verifica os dados salvos no localStorage
            if (isValid) {
                const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

                const userFound = storedUsers.find(user => user.email === email && user.password === password);
                
                if (userFound) {
                    localStorage.setItem("userSession", email);
                    window.location.href = "index.html";
                } else {
                    loginError.textContent = "E-mail ou senha incorretos.";
                }
            }
        });
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Código para o menu hambúrguer
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navbar");
    const carrosDestaqueTitle = document.querySelector(".carros-destaque h2");
    const navIcons = document.querySelector(".nav-icons");

    if (hamburger && navbar && carrosDestaqueTitle) {
        hamburger.addEventListener("click", function () {
            navbar.classList.toggle("active");
            navIcons.classList.toggle("active");

            if (navbar.classList.contains("active")) {
                carrosDestaqueTitle.style.marginTop = "75px";
            } else {
                carrosDestaqueTitle.style.marginTop = "0";
            }
        });
    } else {
        console.error("Hamburger ou Navbar ou Título não encontrados!");
    }
});

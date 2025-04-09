document.addEventListener("DOMContentLoaded", function () {
    // =====================
    // FORMULÁRIO DE LOGIN
    // =====================
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

    // =====================
    // MENU HAMBÚRGUER
    // =====================
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navbar");
    const carrosDestaqueTitle = document.querySelector(".carros-destaque h2");
    const navIcons = document.querySelector(".nav-icons");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navbar && navLinks) {
        hamburger.addEventListener("click", function () {
            navbar.classList.toggle("active");
            navIcons?.classList.toggle("active");
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");

            if (carrosDestaqueTitle) {
                carrosDestaqueTitle.style.marginTop = navbar.classList.contains("active") ? "75px" : "0";
            }
        });
    } else {
        console.error("Hamburger, Navbar ou nav-links não encontrados!");
    }

    // =====================
    // BOTÃO "COMPRAR"
    // =====================
    const botoesComprar = document.querySelectorAll(".comprar-btn");

    botoesComprar.forEach((botao) => {
        botao.addEventListener("click", () => {
            const usuarioLogado = localStorage.getItem("userSession");

            if (usuarioLogado) {
                alert("Compra realizada com sucesso! 🚗💨");
            } else {
                alert("Você precisa estar logado para comprar.");
                window.location.href = "login.html";
            }
        });
    });

    // =====================
    // STATUS DO USUÁRIO + LOGOUT DINÂMICO
    // =====================
    const userStatus = document.getElementById("userStatus");
    const usuarioLogado = localStorage.getItem("userSession");

    if (userStatus) {
        if (usuarioLogado) {
            // Insere o nome + botão
            userStatus.innerHTML = `
                <span style="font-weight: bold; color: #4CAF50;">Bem-vindo, ${usuarioLogado}</span>
                <button id="logoutBtn" style="margin-left: 10px;">Sair</button>
            `;

            // Adiciona evento ao botão
            const logoutBtn = document.getElementById("logoutBtn");
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("userSession");
                alert("Você saiu com sucesso!");
                location.reload();
            });
        } else {
            userStatus.textContent = "Você não está logado!";
            userStatus.style.color = "#f44336";
        }
    }

    // =====================
    // ÍCONE DE LOGIN
    // =====================
    const loginIcon = document.getElementById("navLoginIcon");

    if (loginIcon) {
        if (usuarioLogado) {
            loginIcon.style.display = "none";
        } else {
            loginIcon.style.display = "block";
        }
    }
});

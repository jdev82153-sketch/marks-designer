
/* =========================================
   MARKS DESIGNER — CONFIGURAÇÃO
========================================= */

// Troque pelo seu número real, incluindo código do país e DDD.
// Exemplo de formato: 5511999999999
const WHATSAPP_NUMBER = "5511999999999";

const WHATSAPP_MESSAGE =
  "Olá! Conheci a Marks Designer pelo site e gostaria de conhecer os pacotes de artes.";

/* =========================================
   MODO CLARO E ESCURO
========================================= */

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  const isDark = theme === "dark";

  html.setAttribute("data-theme", isDark ? "dark" : "light");

  themeIcon.textContent = isDark ? "☀" : "☾";

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Ativar modo claro" : "Ativar modo escuro"
  );

  themeToggle.setAttribute(
    "title",
    isDark ? "Ativar modo claro" : "Ativar modo escuro"
  );

  if (themeColor) {
    themeColor.setAttribute("content", isDark ? "#171614" : "#f7f4ee");
  }
}

let savedTheme = "light";

try {
  const storedTheme = localStorage.getItem("marks-designer-theme");

  if (storedTheme === "dark" || storedTheme === "light") {
    savedTheme = storedTheme;
  }
} catch (error) {
  // O site continua funcionando se o armazenamento estiver indisponível.
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);

  try {
    localStorage.setItem("marks-designer-theme", nextTheme);
  } catch (error) {
    // A troca de tema continua funcionando nesta visita.
  }
});

/* =========================================
   MENU PARA CELULAR
========================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

function closeMenu() {
  nav.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );

  document.body.classList.toggle("menu-open", isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});

/* =========================================
   ANIMAÇÕES AO ROLAR A PÁGINA
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -25px 0px"
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* =========================================
   CONTATO PELO WHATSAPP
========================================= */

function openWhatsApp(message) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");

  if (!number || number === "5511999999999") {
    alert(
      "Configure seu número real de WhatsApp no início do arquivo script.js antes de usar os botões de contato."
    );
    return;
  }

  if (number.length < 12 || number.length > 13) {
    alert(
      "Confira o número. Use o código do Brasil (55), DDD e número, sem espaços ou símbolos."
    );
    return;
  }

  const url =
    "https://wa.me/" +
    number +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
}

const whatsappButton = document.getElementById("whatsappButton");

whatsappButton.addEventListener("click", (event) => {
  event.preventDefault();
  openWhatsApp(WHATSAPP_MESSAGE);
});

document.querySelectorAll("[data-package]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const packageName = link.dataset.package;

    const message =
      `Olá! Conheci a Marks Designer pelo site e tenho interesse no pacote "${packageName}". Poderia me passar mais informações e o orçamento?`;

    openWhatsApp(message);
  });
});

/* =========================================
   ANO AUTOMÁTICO NO RODAPÉ
========================================= */

document.getElementById("year").textContent =
  new Date().getFullYear();

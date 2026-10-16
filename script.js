
/* =========================================
   MARKS DESIGNER — CONFIGURAÇÃO
   ========================================= */

// Coloque seu número com código do país.
// Exemplo de formato: 5511999999999
// Troque pelo SEU número real, sem espaços ou símbolos.
const WHATSAPP_NUMBER = "5511999999999";

const WHATSAPP_MESSAGE =
  "Olá! Conheci a Marks Designer pelo site e gostaria de conhecer os pacotes de artes.";


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
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});


/* =========================================
   ANIMAÇÕES DE ENTRADA
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
      rootMargin: "0px 0px -30px 0px"
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
      "Configure seu número de WhatsApp no arquivo script.js antes de usar este botão."
    );
    return;
  }

  if (number.length < 12 || number.length > 13) {
    alert(
      "Confira o número de WhatsApp. Use o código do Brasil (55), DDD e número."
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

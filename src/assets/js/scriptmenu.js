const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropdownMenu = document.querySelector(".dropdown_menu");
const header = document.querySelector("header");

let lastScrollY = window.scrollY;

// Función para mostrar/ocultar el menú desplegable y cambiar el ícono
toggleBtn.onclick = function () {
  dropdownMenu.classList.toggle("open");
  const isOpen = dropdownMenu.classList.contains("open");

  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};

// Función para cerrar el dropdown si se hace clic afuera
document.addEventListener("click", function (event) {
  if (
    !dropdownMenu.contains(event.target) &&
    !toggleBtn.contains(event.target)
  ) {
    dropdownMenu.classList.remove("open");
    toggleBtnIcon.classList = "fa-solid fa-bars";
  }
});

// Ocultar el header al hacer scroll hacia abajo y mostrarlo al hacer scroll hacia arriba
window.addEventListener("scroll", function () {
  if (window.scrollY > lastScrollY) {
    // Scroll hacia abajo - Oculta el header
    header.style.top = "-80px";
  } else {
    header.style.top = "0";
  }
  lastScrollY = window.scrollY;
});


document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".nosotros-content");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => {
    section.classList.add("fade-in");
    observer.observe(section);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.add("fade-in");
    observer.observe(card);
  });
});
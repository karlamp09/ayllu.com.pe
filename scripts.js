// =========================
//  NAV MOBILE
// =========================
document.getElementById("navToggle").addEventListener("click", () => {
  const nav = document.querySelector(".main-nav");
  nav.classList.toggle("open");
});

// =========================
//  HERO SLIDER
// =========================
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

document.getElementById("nextSlide").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

document.getElementById("prevSlide").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// Auto-slide every 6 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 6000);

// =========================
//  VOLUNTEER FORM (Google Apps Script)
// =========================

const volunteerForm = document.getElementById("volunteerForm");
const volunteerMsg = document.getElementById("volunteerMsg");

volunteerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  volunteerMsg.textContent = "Enviando...";
  volunteerMsg.style.color = "#555";

  const formData = new FormData(volunteerForm);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzXvcsxwYk2fy6t-yUK7Rgkzfd1bB6wvU7048eF9fbgMstOkGj63lVhs-LibPZnwmwbhg/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result.status === "success") {
      volunteerMsg.textContent = "¡Gracias! Tu solicitud fue enviada.";
      volunteerMsg.style.color = "green";
      volunteerForm.reset();
    } else {
      volunteerMsg.textContent = "Ocurrió un error. Intenta de nuevo.";
      volunteerMsg.style.color = "red";
    }
  } catch (error) {
    console.error(error);
    volunteerMsg.textContent = "Error de conexión.";
    volunteerMsg.style.color = "red";
  }
});

// =========================
//  CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");
const contactMsg = document.getElementById("contactMsg");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  contactMsg.textContent = "Enviando...";
  contactMsg.style.color = "#555";

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzXvcsxwYk2fy6t-yUK7Rgkzfd1bB6wvU7048eF9fbgMstOkGj63lVhs-LibPZnwmwbhg/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result.status === "success") {
      contactMsg.textContent = "Mensaje enviado. Gracias por escribirnos.";
      contactMsg.style.color = "green";
      contactForm.reset();
    } else {
      contactMsg.textContent = "Ocurrió un error. Intenta de nuevo.";
      contactMsg.style.color = "red";
    }
  } catch (error) {
    console.error(error);
    contactMsg.textContent = "Error de conexión.";
    contactMsg.style.color = "red";
  }
});

// =========================
//  YEAR FOOTER
// =========================
document.getElementById("year").textContent = new Date().getFullYear();

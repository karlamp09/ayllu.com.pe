// Basic interactive behaviors: slider, nav toggle, simple form handling

document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobile-nav');
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    if (open) {
      mobileNav.hidden = true;
    } else {
      mobileNav.hidden = false;
    }
  });

  // Simple slider
  const slides = Array.from(document.querySelectorAll('.slide'));
  let current = slides.findIndex(s => s.classList.contains('active'));
  if (current < 0) current = 0;

  const showSlide = (index) => {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
  };

  document.getElementById('prevSlide').addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  document.getElementById('nextSlide').addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  // Auto-advance
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 6000);

  /************************************
   *  ✅ FORMULARIO DE VOLUNTARIOS — REAL
   *  Ahora conectado a Google Apps Script
   ************************************/
  const volunteerForm = document.getElementById('volunteerForm');
  const volunteerMsg = document.getElementById('volunteerMsg');

  // URL del WebApp
  const APP_URL = "https://script.google.com/macros/s/AKfycbxs0vA6uFQxyZN3FG_c3-94nDsnDfn1V8_0tQqcVYtTl5gyAP_sCEALEiCclXdbSTRv5g/exec";
  const TOKEN = "ayllu2025";

  volunteerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    volunteerMsg.textContent = "";

    // Obtener campos
    const nombre = document.getElementById("vname").value.trim();
    const correo = document.getElementById("vemail").value.trim();
    const telefono = document.getElementById("vphone").value.trim();
    const area = document.getElementById("varea").value.trim();
    const motivo = document.getElementById("vmessage").value.trim();

    // Validación (tu estilo)
    if (!nombre || !correo || !telefono || !area) {
      volunteerMsg.textContent = "Por favor completa los campos obligatorios.";
      volunteerMsg.style.color = "#FFEB3B";
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(correo)) {
      volunteerMsg.textContent = "Ingresa un correo válido.";
      volunteerMsg.style.color = "#FFEB3B";
      return;
    }

    // Datos a enviar al Apps Script
    const data = {
      nombre,
      correo,
      telefono,
      area,
      motivo,
      token: TOKEN
    };

    try {
      const res = await fetch(APP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-App-Token": TOKEN
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.status === "success") {
        volunteerMsg.style.color = "#B5EAD7"; 
        volunteerMsg.textContent = "¡Gracias! Tu solicitud fue enviada correctamente.";
        volunteerForm.reset();
      } else {
        volunteerMsg.style.color = "#FFEB3B";
        volunteerMsg.textContent = "Error: " + result.message;
      }

    } catch (error) {
      console.error("Error:", error);
      volunteerMsg.style.color = "#FFEB3B";
      volunteerMsg.textContent = "Hubo un error al enviar tu solicitud.";
    }
  });

  /************************************
   *  FORMULARIO DE CONTACTO (sin cambios)
   ************************************/
  const contactForm = document.getElementById('contactForm');
  const contactMsg = document.getElementById('contactMsg');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactMsg.textContent = '';
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const msg = contactForm.message.value.trim();

    if (!name || !email || !msg) {
      contactMsg.textContent = 'Por favor completa todos los campos.';
      contactMsg.style.color = '#FFEB3B';
      return;
    }

    contactMsg.style.color = '#7EC8E3';
    contactMsg.textContent = 'Mensaje enviado. ¡Gracias!';
    contactForm.reset();
  });
});


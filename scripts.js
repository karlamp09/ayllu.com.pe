document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('year').textContent = new Date().getFullYear();

  // ----- SLIDER -----
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

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 6000);

  // ---------------------------------------------------
  // ⭐ FORMULARIO VOLUNTARIOS — ENVÍO REAL A GOOGLE SHEET
  // ---------------------------------------------------
  const volunteerForm = document.getElementById('volunteerForm');
  const volunteerMsg = document.getElementById('volunteerMsg');

  volunteerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    volunteerMsg.textContent = "Enviando...";
    volunteerMsg.style.color = "#FFEB3B";

    const data = {
      tipo: "voluntario",
      token: "ayllu2025",
      nombre: volunteerForm.name.value,
      correo: volunteerForm.email.value,
      telefono: volunteerForm.phone.value,
      area: volunteerForm.area.value,
      motivo: volunteerForm.message.value
    };

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbwOcp3-BQtH8VCpuQeM4Ik688MsMkAapvLlVItlJ6w-ZKLvpI7Td0ttPoM3fMAzALIRsw/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const json = await res.json();

      if (json.status === "success") {
        volunteerMsg.textContent = "Tu solicitud fue enviada exitosamente. ¡Gracias!";
        volunteerMsg.style.color = "#B5EAD7";
        volunteerForm.reset();
      } else {
        volunteerMsg.textContent = "Hubo un error: " + json.message;
        volunteerMsg.style.color = "#FFEB3B";
      }

    } catch (error) {
      volunteerMsg.textContent = "Error de conexión. Intenta nuevamente.";
      volunteerMsg.style.color = "#FFEB3B";
    }
  });

  // ---------------------------------------------------
  // ⭐ FORMULARIO CONTACTO — ENVÍO REAL A GOOGLE SHEET
  // ---------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const contactMsg = document.getElementById('contactMsg');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    contactMsg.textContent = "Enviando...";
    contactMsg.style.color = "#7EC8E3";

    const data = {
      tipo: "contacto",
      token: "ayllu2025",
      nombre: contactForm.name.value,
      correo: contactForm.email.value,
      mensaje: contactForm.message.value
    };

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbwOcp3-BQtH8VCpuQeM4Ik688MsMkAapvLlVItlJ6w-ZKLvpI7Td0ttPoM3fMAzALIRsw/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const json = await res.json();

      if (json.status === "success") {
        contactMsg.textContent = "Mensaje enviado correctamente. ¡Gracias!";
        contactMsg.style.color = "#7EC8E3";
        contactForm.reset();
      } else {
        contactMsg.textContent = "Hubo un error: " + json.message;
        contactMsg.style.color = "#FFEB3B";
      }

    } catch (error) {
      contactMsg.textContent = "Error de conexión. Intenta nuevamente.";
      contactMsg.style.color = "#FFEB3B";
    }
  });

});


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

  // Volunteer form: client-side validation and fake submit (you'll connect to server later)
  const volunteerForm = document.getElementById('volunteerForm');
  const volunteerMsg = document.getElementById('volunteerMsg');

  volunteerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    volunteerMsg.textContent = '';
    const name = volunteerForm.name.value.trim();
    const email = volunteerForm.email.value.trim();
    const phone = volunteerForm.phone.value.trim();
    const area = volunteerForm.area.value;

    if (!name || !email || !phone || !area) {
      volunteerMsg.textContent = 'Por favor completa los campos obligatorios.';
      volunteerMsg.style.color = '#FFEB3B';
      return;
    }

    // Basic email pattern
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      volunteerMsg.textContent = 'Ingresa un correo válido.';
      volunteerMsg.style.color = '#FFEB3B';
      return;
    }

    // Simulate submit: here podrías integrar fetch() a tu backend o Google Apps Script
    volunteerMsg.style.color = '#B5EAD7';
    volunteerMsg.textContent = 'Gracias por tu interés. Pronto nos pondremos en contacto.';
    volunteerForm.reset();
  });

  // Contact form behavior (similar fake submit)
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

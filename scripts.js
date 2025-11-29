document.addEventListener('DOMContentLoaded', function () {
  const volunteerForm = document.getElementById('volunteerForm');

  // URL DEL WEBAPP (tu URL real actualizado)
  const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzXvcsxwYk2fy6t-yUK7Rgkzfd1bB6wvU7048eF9fbgMstOkGj63lVhs-LibPZnwmwbhg/exec";

  volunteerForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Deshabilitar botón mientras se envía
    const submitBtn = volunteerForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    // Crear datos para enviar al backend
    const payload = {
      token: "ayllu2025",
      tipo: "voluntario",
      nombre: volunteerForm.name.value,
      correo: volunteerForm.email.value,
      telefono: volunteerForm.phone.value,
      area: volunteerForm.area.value,
      motivo: volunteerForm.message.value
    };

    try {
      const response = await fetch(WEBAPP_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-App-Token": "ayllu2025"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === "success") {
        Swal.fire({
          icon: 'success',
          title: '¡Registro enviado!',
          text: 'Gracias por unirte como voluntario/a.',
          confirmButtonColor: '#6a0dad'
        });

        volunteerForm.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message || 'No se pudo guardar la información.',
          confirmButtonColor: '#d33'
        });
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No pudimos contactar con el servidor.',
        confirmButtonColor: '#d33'
      });
    }

    // Reset botón
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar";
  });
});

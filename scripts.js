document.getElementById("volunteerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    const formData = new FormData(this);

    fetch("https://script.google.com/macros/s/AKfycbzXvcsxwYk2fy6t-yUK7Rgkzfd1bB6wvU7048eF9fbgMstOkGj63lVhs-LibPZnwmwbhg/exec", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(text => {
        Swal.fire({
            icon: 'success',
            title: '¡Enviado!',
            text: 'Tu registro ha sido enviado correctamente.',
            confirmButtonColor: '#3085d6'
        });

        document.getElementById("volunteerForm").reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar";
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al enviar. Intenta nuevamente.',
            confirmButtonColor: '#d33'
        });

        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar";
        console.error("Error:", error);
    });
});

/***********************************************
 * CONFIGURACIÓN
 ***********************************************/
const API_URL = "https://script.google.com/macros/s/AKfycbx6zdOPHP1PCZfqZDr6fqTWWB4CP-jVRBbb8f4zE47tFLIlkEs9UPgzRkJc6NQEN6rZkg/exec";   // Pegas la URL desplegada del Apps Script
const TOKEN = "ayllu2025";

/***********************************************
 * FUNCIÓN: Enviar datos al Apps Script
 ***********************************************/
async function enviarDatos(data) {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const resultado = await respuesta.json();

    if (resultado.status === "success") {
      alert("✔️ Datos enviados correctamente");
      return true;
    } else {
      alert("⚠️ Error: " + resultado.message);
      return false;
    }

  } catch (error) {
    console.error("Error de conexión:", error);
    alert("❌ Error de conexión con el servidor");
    return false;
  }
}

/***********************************************
 * FORMULARIO VOLUNTARIOS
 ***********************************************/
document.getElementById("form-voluntarios")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    tipo: "voluntario",
    token: TOKEN,
    nombre: document.getElementById("nombre_vol").value.trim(),
    correo: document.getElementById("correo_vol").value.trim(),
    telefono: document.getElementById("telefono_vol").value.trim(),
    area: document.getElementById("area_vol").value,
    motivo: document.getElementById("motivo_vol").value.trim()
  };

  const exito = await enviarDatos(data);

  if (exito) e.target.reset();
});

/***********************************************
 * FORMULARIO CONTACTO
 ***********************************************/
document.getElementById("form-contacto")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    tipo: "contacto",
    token: TOKEN,
    nombre: document.getElementById("nombre_con").value.trim(),
    correo: document.getElementById("correo_con").value.trim(),
    mensaje: document.getElementById("mensaje_con").value.trim()
  };

  const exito = await enviarDatos(data);

  if (exito) e.target.reset();
});


// js/excavacion.js
function calcularExcavacion() {
    const ancho = parseFloat(document.getElementById("excAncho").value);
    const largo = parseFloat(document.getElementById("excLargo").value);
    const prof = parseFloat(document.getElementById("excProfundidad").value);

    if (isNaN(ancho) || isNaN(largo) || isNaN(prof)) {
        alert("Por favor ingresa todos los campos.");
        return;
    }

    const volExcavacion = (ancho * largo * prof).toFixed(2);

    const resBox = document.getElementById("resultadoExcavacion");
    resBox.style.display = "block";
    resBox.innerHTML = `<strong>Volumen de excavación:</strong> ${volExcavacion} m³`;

    // Guardar en la base de datos local
    guardarCalculoEnProyecto("excavacion", { volExcavacion });
}
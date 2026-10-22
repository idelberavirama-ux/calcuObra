// LÓGICA MÓDULO 1: DESCAPOTE DEL TERRENO
function evaluarOtroPorcentaje(select) {
    document.getElementById("campoOtroPorcentaje").style.display = (select.value === "otro") ? "block" : "none";
}

function calcularDescapote() {
    const largo = parseFloat(document.getElementById("descLargo").value);
    const ancho = parseFloat(document.getElementById("descAncho").value);
    const espesor = parseFloat(document.getElementById("descEspesor").value);
    const selectExp = document.getElementById("descPorcentaje").value;
    let pct = (selectExp === "otro") ? parseFloat(document.getElementById("descPorcentajePersonalizado").value) : parseFloat(selectExp);

    if (isNaN(largo) || isNaN(ancho) || isNaN(espesor) || isNaN(pct)) {
        alert("Por favor completa los campos correctamente.");
        return;
    }

    const area = largo * ancho;
    const volBanco = area * espesor;
    const volSuelto = volBanco * (1 + (pct / 100));
    const viajes = Math.ceil(volSuelto / 6);

    const resBox = document.getElementById("resultadoDescapote");
    resBox.style.display = "block";
    resBox.innerHTML = `
        <strong>Resultados Descapote:</strong><br>
        • Área: ${area.toFixed(2)} m²<br>
        • Vol. Banco: ${volBanco.toFixed(2)} m³<br>
        • Expansión: ${pct}%<br>
        • <strong>Vol. Suelto a Retirar: ${volSuelto.toFixed(2)} m³</strong><br>
        • Viajes de volqueta (6m³): ${viajes}
    `;

    // Guardar en la base de datos local
    guardarCalculoEnProyecto("descapote", { area, volBanco, pct, volSuelto, viajes });
}
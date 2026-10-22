// LÓGICA MÓDULO 6: MUROS Y MAMPOSTERÍA
function calcularMuros() {
    const area = parseFloat(document.getElementById("muroArea").value);
    const largoL = parseFloat(document.getElementById("muroLargoLadrillo").value);
    const altoL = parseFloat(document.getElementById("muroAltoLadrillo").value);
    const junta = parseFloat(document.getElementById("muroJunta").value);

    if (isNaN(area) || isNaN(largoL) || isNaN(altoL) || isNaN(junta)) {
        alert("Por favor ingresa todos los campos.");
        return;
    }

    const lM = (largoL + junta) / 100;
    const aM = (altoL + junta) / 100;
    const ladrillosM2 = 1 / (lM * aM);
    const totalLadrillos = Math.ceil(area * ladrillosM2 * 1.05); // 5% desperdicio
    const bultosCemento = (area * 0.2).toFixed(1);
    const arenaM3 = (area * 0.02).toFixed(2);

    const resBox = document.getElementById("resultadoMuros");
    resBox.style.display = "block";
    resBox.innerHTML = `
        <strong>Resultados Muros:</strong><br>
        • Área de muro: ${area} m²<br>
        • Total Ladrillos (inc. 5% desp): <strong>${totalLadrillos} un.</strong><br>
        • Cemento estimado: ${bultosCemento} bultos<br>
        • Arena estimada: ${arenaM3} m³
    `;

    // Guardar en la base de datos local
    guardarCalculoEnProyecto("muros", { area, totalLadrillos, bultosCemento, arenaM3 });
}
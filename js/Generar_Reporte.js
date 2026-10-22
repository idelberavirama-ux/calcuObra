// LÓGICA MÓDULO 14: REPORTES Y PDF
function generarResumenReporte() {
    const cont = document.getElementById("contenidoReporte");
    if (!proyectoActivoId) {
        cont.innerHTML = "<p>Selecciona o crea un proyecto para ver el reporte.</p>";
        return;
    }

    const proyectos = obtenerProyectos();
    const p = proyectos.find(item => item.id === proyectoActivoId);

    let html = `<h4>Presupuesto: ${p.nombre}</h4><p><small>Fecha: ${p.fecha}</small></p><hr>`;
    
    if (p.calculos.descapote) {
        const d = p.calculos.descapote;
        html += `<h5>🚜 Descapote:</h5><p>Volumen suelto: ${d.volSuelto.toFixed(2)} m³ (${d.viajes} viajes de volqueta)</p>`;
    }
    if (p.calculos.muros) {
        const m = p.calculos.muros;
        html += `<h5>🧱 Muros:</h5><p>Ladrillos: ${m.totalLadrillos} un. | Cemento: ${m.bultosCemento} bultos | Arena: ${m.arenaM3} m³</p>`;
    }

    if (!p.calculos.descapote && !p.calculos.muros) {
        html += "<p>Aún no has registrado cálculos en esta obra.</p>";
    }

    cont.innerHTML = html;
}

function descargarPDF() {
    const el = document.getElementById("contenidoReporte");
    html2pdf().from(el).set({
        margin: 10,
        filename: `CalcuObra_Presupuesto.pdf`,
        html2canvas: { scale: 2 }
    }).save();
}
// NAVEGACIÓN Y CONTROL GENERAL DE LA APP
function navegarA(pantallaId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(pantallaId).classList.add('active');

    if (pantallaId === 'screenListaProyectos') {
        renderizarListaProyectos();
    } else if (pantallaId === 'screenModuloReporte') {
        generarResumenReporte();
    }
}

function crearProyecto() {
    const nombre = document.getElementById("nombreNuevoProyecto").value;
    if (!nombre) {
        alert("Por favor ingresa un nombre para el proyecto.");
        return;
    }

    const nuevoProyecto = {
        id: Date.now(),
        nombre: nombre,
        fecha: new Date().toLocaleDateString(),
        calculos: {}
    };

    const proyectos = obtenerProyectos();
    proyectos.push(nuevoProyecto);
    guardarProyectosBD(proyectos);

    proyectoActivoId = nuevoProyecto.id;
    document.getElementById("nombreProyectoActivo").innerText = "Obra: " + nombre;
    document.getElementById("nombreNuevoProyecto").value = "";

    alert("¡Proyecto creado y guardado localmente!");
    navegarA('screenPanelObra');
}

function renderizarListaProyectos() {
    const proyectos = obtenerProyectos();
    const contenedor = document.getElementById("listaProyectosContenedor");
    contenedor.innerHTML = "";

    if (proyectos.length === 0) {
        contenedor.innerHTML = "<p>No hay proyectos guardados aún.</p>";
        return;
    }

    proyectos.forEach(p => {
        const div = document.createElement("div");
        div.className = "project-item";
        div.innerHTML = `
            <div>
                <strong>${p.nombre}</strong><br>
                <small style="color: #666;">Fecha: ${p.fecha}</small>
            </div>
            <div>
                <button class="btn btn-primary" style="padding: 4px 8px; font-size: 0.8rem; width: auto;" onclick="seleccionarProyecto(${p.id})">Abrir</button>
                <button class="btn btn-danger" style="padding: 4px 8px; font-size: 0.8rem; width: auto;" onclick="eliminarProyecto(${p.id})">Borrar</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function seleccionarProyecto(id) {
    const proyectos = obtenerProyectos();
    const p = proyectos.find(item => item.id === id);
    if (p) {
        proyectoActivoId = p.id;
        document.getElementById("nombreProyectoActivo").innerText = "Obra: " + p.nombre;
        navegarA('screenPanelObra');
    }
}

function eliminarProyecto(id) {
    if (confirm("¿Seguro que deseas borrar este proyecto de la memoria local?")) {
        let proyectos = obtenerProyectos();
        proyectos = proyectos.filter(p => p.id !== id);
        guardarProyectosBD(proyectos);
        renderizarListaProyectos();
    }
}

function abrirModulo(moduloNombre) {
    if (!proyectoActivoId && moduloNombre !== 'Reporte') {
        if (!confirm("No has seleccionado un proyecto. ¿Deseas hacer un cálculo rápido sin guardar?")) {
            return;
        }
    }
    if (moduloNombre === 'Descapote') navegarA('screenModuloDescapote');
    else if (moduloNombre === 'Muros') navegarA('screenModuloMuros');
    else if (moduloNombre === 'Reporte') navegarA('screenModuloReporte');
    else if (moduloNombre === 'Excavacion') navegarA('screenModuloExcavacion');
}
// Manejo de Persistencia Local (LocalStorage / Offline)
const DB_KEY = "CalcuObra_Proyectos_DB";
let proyectoActivoId = null;

function obtenerProyectos() {
    const datos = localStorage.getItem(DB_KEY);
    return datos ? JSON.parse(datos) : [];
}

function guardarProyectosBD(proyectos) {
    localStorage.setItem(DB_KEY, JSON.stringify(proyectos));
}

function guardarCalculoEnProyecto(modulo, datos) {
    if (!proyectoActivoId) return;

    let proyectos = obtenerProyectos();
    let p = proyectos.find(item => item.id === proyectoActivoId);
    if (p) {
        p.calculos[modulo] = datos;
        guardarProyectosBD(proyectos);
    }
}
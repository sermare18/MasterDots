/*
 * JS Para el juego Masterdots
 */

// VARIABLES GLOBALES
var iniciadoMarcado = false;

/* INCICIALIZACIÓN DEL PANEL */
/**
 * Devuelve un numero random entre 0 y max
 * @param {Integer} max
 * @returns {Integer} numero aleatorio entero comprendido entre 0 y max
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Función que rellena nick y src de avatar
 */
function rellenarFormularioUsuario() {
    document.getElementById("nick").value = nick;
    document.getElementById("avatarImg").src = avatarImg;
}

/**
 * Función que:
 * 1.- Rellena el nick
 * 2.- Rellena el avatar
 * 3.- Pinta de forma automática el panel del juego
 */
function pintarPanelJuego() {
    document.getElementById("juego").style.gridTemplateColumns = `repeat(${tamano}, 1fr)`;
    document.getElementById("juego").style.gridTemplateRows = `repeat(${tamano}, 1fr)`;
    // Elementos de forma automática
    let items = "";
    let color = ["rojo", "verde"];
    let colorRnd = 0;
    for (let index = 0; index < (parseInt(tamano) * parseInt(tamano)); index++) {
        // En los impares no cambiamos el color, en los pares cambaimos el color
        if (index % 2 > 0) colorRnd = getRandomInt(2);
        items += `<div class="containerItem"><div class="item ${color[colorRnd]}"></div></div>`;
    }
    document.getElementById("juego").innerHTML = items;
}

/**
 * Añadir los eventos al juego
 */
function programarEventosJuego() {
    const items = document.getElementsByClassName("item");
    // El evento mousedown se dispara cuando el usuario presiona un botón del ratón sobre un elemento. 
    // Este evento se dispara antes de que el usuario suelte el botón del ratón.
    // Por otro lado, el evento click se dispara cuando el usuario hace clic en un elemento, es decir, cuando presiona y 
    // suelta un botón del ratón sobre un elemento. Este evento se dispara después de que el usuario suelte el botón del ratón.
    for (let item of items) {
        item.addEventListener('mousedown', comenzarMarcar);
        item.addEventListener('mouseover', continuarMarcando);
    }
}

/* FUNCIONES DEL JUEGO */
/**
 * Iniciar el marcado de los dots
 * @param {EventObject} event
 */
function comenzarMarcar(event) {
    let item = event.target;
    // Sacamos el element padre de 'item' que es 'containerItem'
    let containerItem = event.target.parentElement;
    if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
    else containerItem.classList.add('verde');
    if (!iniciadoMarcado) iniciadoMarcado = true;
    console.log("Se ha pinchado sobre un círculo");
}

/**
 * Continuar el marcado de los dots
 * @param {EventObject} event
 */
function continuarMarcando(event) {
    if (iniciadoMarcado) {
        let item = event.target;
        // Sacamos el element padre de 'item' que es 'containerItem'
        let containerItem = event.target.parentElement;
        if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
        else containerItem.classList.add('verde');
        console.log("Pasando sobre un círculo");
    }
}


/**
 * MAIN
 */
// Capturamos los datos del usuario
getDatosUsuario();
// Comprobamos los datos, utilizamos el objeto location para redirigir a index.html si el usuario no ha rellenado el formulario
if (!comprobacionDatosUsuario()) location = "index.html";
// Rellenamos el formulario
rellenarFormularioUsuario();
pintarPanelJuego();
programarEventosJuego();


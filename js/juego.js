/*
 * JS Para el juego Masterdots
 */

// VARIABLES GLOBALES
var iniciadoMarcado = false;
var adyacentes = [];
var idMarcados = [];
var classMarcada;
var tamanoPanel;

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
    tamanoPanel = parseInt(tamano);
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
        items += `<div class="containerItem"><div id="${index}" class="item ${color[colorRnd]}"></div></div>`;
    }
    document.getElementById("juego").innerHTML = items;
}

/**
 * Description
 * @param {Integer} idMarcado número marcado
 * @returns {any}
 */
function calcularAdyacentes(idMarcado) {
    adyacentes = [];
    // Adyacente superior
    if ((idMarcado - tamanoPanel) >= 0) adyacentes.push(idMarcado - tamanoPanel);
    // Adyacente inferior
    if ((idMarcado + tamanoPanel) < (tamanoPanel * tamanoPanel)) adyacentes.push(idMarcado + tamanoPanel);
    // Adyacente izquierda
    if ((idMarcado % tamanoPanel) > 0) adyacentes.push(idMarcado - 1);
    // Adyacente derecha
    if (((idMarcado + 1) % tamanoPanel) > 0) adyacentes.push(idMarcado + 1);

    for (let index = 0; index < adyacentes.length; index++) {
        console.log(adyacentes[index]);
    }
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
    document.addEventListener('mouseup', finalizarMarcado);
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
    if (item.classList.contains('rojo')) {
        classMarcada = "rojo";
        containerItem.classList.add('rojo');
    } else {
        classMarcada = "verde";
        containerItem.classList.add('verde');
    } 
    if (!iniciadoMarcado) iniciadoMarcado = true;

    // Guardo los marcados
    idMarcados.push(parseInt(item.id));

    // Comienzo a calcular adyacentes
    calcularAdyacentes(parseInt(item.id));
    console.log("Se ha pinchado sobre un círculo");
}

/**
 * Continuar el marcando los dots
 * @param {EventObject} event
 */
function continuarMarcando(event) {
    if (iniciadoMarcado) {
        let item = event.target;
        let idNuevo = parseInt(item.id);
        // ¿Es adyacente?
        if (adyacentes.includes(idNuevo) && item.classList.contains(classMarcada)) {
            // Sacamos el element padre de 'item' que es 'containerItem'
            let containerItem = event.target.parentElement;
            if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
            else containerItem.classList.add('verde');

            // Guardo los marcados
            idMarcados.push(parseInt(item.id));

            calcularAdyacentes(idNuevo);
        }
    }
    console.log("Pasando sobre un círculo");
}

/**
 * Finalizar el marcado de los dots
 * @param {EventObject} event
 */
function finalizarMarcado(event) {
    iniciadoMarcado = false;
    // Trabajar con los marcados
    for (let index = 0; index < idMarcados.length; index++) {
        // Capturar el objeto
        let itemMarcado = document.getElementById(idMarcados[index]);
        itemMarcado.parentElement.classList.remove(classMarcada);
        // Cambiar el color de los objetos de forma rnd
        let color = ["rojo", "verde"];
        let colorRnd = getRandomInt(2);
        itemMarcado.classList.remove(classMarcada);
        itemMarcado.classList.add(color[colorRnd]);
    }
    console.log("Finalizar el marcado");
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


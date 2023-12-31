/*
 * JS Para el juego Masterdots
 */

// VARIABLES GLOBALES
var iniciadoMarcado = false;
var adyacentes = [];
var idMarcados = [];
var classMarcada;
var tamanoPanel;
var idInterval;

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

    // for (let index = 0; index < adyacentes.length; index++) {
    //     console.log(adyacentes[index]);
    // }
}

/**
 * Función que realiza el conteo hacia atrás del juego
 */
function cuentaAtras() {
    let tiempoRestante = parseInt(document.getElementById("tmpo").value) - 1;
    document.getElementById("tmpo").value = tiempoRestante;
    if (tiempoRestante == 0) {
        clearInterval(idInterval);
        // Finalizar todos los eventos
        const items = document.getElementsByClassName("item");
        for (let item of items) {
            item.removeEventListener('mousedown', comenzarMarcar);
            item.removeEventListener('mouseover', continuarMarcando);
            item.removeEventListener('touchstart', comenzarMarcar);
            item.removeEventListener('touchmove', continuarMarcando);
        }
        document.removeEventListener('mouseup', finalizarMarcado);
        document.removeEventListener('touchend', finalizarMarcado);
        // Cambiar z-index paneles
        document.getElementById("juegoAcabado").classList.add("juegoAcabadoColor");
        document.getElementById("juegoAcabado").style.zIndex="2";
        document.getElementById("juego").style.zIndex = "1";
        
        document.getElementById("nuevaPartida").addEventListener("click", (event) => {
            // Recargamos la página
            location.reload();
        });
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
        // Eventos para ratón
        item.addEventListener('mousedown', comenzarMarcar);
        item.addEventListener('mouseover', continuarMarcando);

        // Eventos para dispositivos táctiles
        item.addEventListener('touchstart', comenzarMarcar);
        item.addEventListener('touchmove', continuarMarcando);
    }
    // Eventos para ratón
    document.addEventListener('mouseup', finalizarMarcado);

    // Eventos para dispositivos táctiles
    document.addEventListener('touchend', finalizarMarcado);

    // Cuenta atrás 
    idInterval = setInterval(cuentaAtras, 1000);
}

/* FUNCIONES DEL JUEGO */
/**
 * Iniciar el marcado de los dots
 * @param {EventObject} event
 */
function comenzarMarcar(event) {
    event.preventDefault();

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
    // console.log("Se ha pinchado sobre un círculo");
}

/**
 * Continuar el marcando los dots
 * @param {EventObject} event
 */
function continuarMarcando(event) {
    if (iniciadoMarcado) {
        let item;
        if (event.type === 'touchmove') {
            let touch = event.touches[0];
            item = document.elementFromPoint(touch.clientX, touch.clientY);
        } else {
            item = event.target;
        }
        let idNuevo = parseInt(item.id);
        // ¿Es adyacente?
        if (adyacentes.includes(idNuevo) && item.classList.contains(classMarcada)) {
            // Sacamos el element padre de 'item' que es 'containerItem'
            let containerItem = item.parentElement;
            if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
            else containerItem.classList.add('verde');

            // Verificamos si el elemento ya ha sido marcado
            if (!idMarcados.includes(idNuevo)) {
                // Guardo los marcados
                idMarcados.push(parseInt(item.id));

                calcularAdyacentes(idNuevo);
            }
        }
    }
    // console.log("Pasando sobre un círculo");
}

/**
 * Finalizar el marcado de los dots
 * @param {EventObject} event
 */
function finalizarMarcado(event) {
    iniciadoMarcado = false;
    adyacentes = [];
    // Añadir puntuación
    const puntuacionInput = document.getElementById('puntuacion');
    if (idMarcados.length > 1) {
        puntuacionInput.value = parseInt(puntuacionInput.value) + idMarcados.length;
    }
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
    idMarcados = [];
    // console.log("Finalizar el marcado");
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


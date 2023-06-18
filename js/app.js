/*
 * JS Para la comprobación de datos del Formulario de entrada
 */

// Inicialización de variables, objetos, DOM
const botonJugar = document.getElementById("jugar");

// Funciones de evento
function comprobarForm () {
    console.log("Comprobamos el formulario");
}

function ejecutarAccion () {
    console.log("Ejecutar accion");
    // Una vez ejecutada la acción asocida al evento eliminamos el controlador de eventos (ejecutarAccion) del botón para evitar que se ejecute de nuevo
    botonJugar.removeEventListener('click', ejecutarAccion);
}

// Con addEventListener podemos definir varias funciones para un mismo evento en un mismo objeto
botonJugar.addEventListener('click', comprobarForm);
botonJugar.addEventListener('click', ejecutarAccion);

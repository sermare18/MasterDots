/*
 * JS Para la comprobación de datos del Formulario de entrada
 */

// Inicialización de variables, objetos, DOM
const nickInput = document.getElementById("nick");
const tamanoInput = document.getElementById("tamano");
const formEntrada = document.getElementById("formEntrada");

// Funciones de evento
function comprobarForm (event) {
    // Comprobar cambios
    if (nickInput.value.length == 0) {
        console.log("No hay nick");
        nickInput.focus(); // El cursor se colocará en el input automáticamente
        event.preventDefault(); // Evitamos que se haga el submit
        return false; // Es buena práctica que los manejadores de eventos devuelvan valores boolenaos
    } else if (tamanoInput.value == "0") {
        console.log("No se ha seleccionado tamaño de panel");
        tamanoInput.focus();
        event.preventDefault();
        return false;
    }
    return true;
}

// Inicio de carga de eventos

// El evento submit es desecadenado también al pulsar ENTER dentro del formulario, a parte de dar click al botón de JUGAR de tipo submit
formEntrada.addEventListener('submit', comprobarForm);





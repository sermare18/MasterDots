/*
 * JS Para la comprobación de datos del Formulario de entrada
 */

// Inicialización de variables, objetos, DOM
var nickInput;
var tamanoInput;
var emailInput;
var formEntrada;
var error;

// Funciones de evento
/**
 * Comprueba los datos correctos del formulario de entrada
 * @param {EventObject} event Evento que salta al realizar el submit
 */
function comprobarForm(event) {
    // Validación de formulario a nivel de JS (Nivel de seguridad 2 de 3)
    // Si queremos la mayor seguridad posible (Nivel 3 de 3) tendríamos que utilizar un backend como una db y un framework p.e Laravel, Spring, .NET, etc
    if (nickInput.value.match(/(?<!\S)[0-9]/)) { // Con la funnción 'match()' comprobamos que el string cumpla un determinada expresión regular, en este caso que no comience por un número
        nickInput.focus(); // El cursor se colocará en el input automáticamente
        event.preventDefault(); // Evitamos que se haga el submit
        error.innerText = "El campo de nick no puede comenzar con un número"; // Establecemos el mensaje de error
        return false; // Es buena práctica que los manejadores de eventos devuelvan valores boolenaos
    } else if (tamanoInput.value == "0") {
        tamanoInput.focus();
        event.preventDefault();
        error.innerText = "Se debe seleccionar un tamaño de panel"; // Establecemos el mensaje de error
        return false;
    }
    // Información es correcta
    datosUsuarios(nickInput, tamanoInput, emailInput);
    historicoUsuarios(nickInput);
    return true;
}


/**
 * Carga de objetos del DOM, comprobaciones y eventos del formulario.
 * 
 * Sí, si sacas una función de domCargado que tenga dependencias sobre elementos del DOM y la llamas antes de que el DOM esté completamente 
 * cargado y analizado, es posible que la función falle. Esto se debe a que los elementos del DOM en los que la función depende 
 * aún no estarían disponibles. Por lo tanto, es importante asegurarse de que el DOM esté completamente cargado y analizado antes 
 * de llamar a funciones que dependen de elementos del DOM.
 */
function domCargado() {
    // Captura de todos los Elements necesarios
    nickInput = document.getElementById("nick");
    tamanoInput = document.getElementById("tamano");
    emailInput = document.getElementById("email");
    formEntrada = document.getElementById("formEntrada");
    error = document.getElementById("error");

    // Comprobar si hay algún error de juego.html
    if (sessionStorage.getItem('error')) {
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }

    // El evento submit es desecadenado también al pulsar ENTER dentro del formulario, a parte de dar click al botón de JUGAR de tipo submit
    formEntrada.addEventListener('submit', comprobarForm);

}

// INICIO DE CARGA DE EVENTOS
// El evento DOMContentLoaded se dispara cuando el contenido del DOM de la página ha sido completamente cargado y analizado, sin esperar a que se carguen las hojas de estilo, imágenes y subframes.
document.addEventListener('DOMContentLoaded', domCargado);
// Geolocalización
// Esta función no tiene ninguna dependencia con los elementos del DOM, por lo tanto, es mejore dejarla fuera de domCargado, para que se ejecute antes de que se cargue el DOM
datoGeolocalizacion();





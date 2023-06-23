/*
 * JS Para la comprobación de datos del Formulario de entrada
 */

// Inicialización de variables, objetos, DOM
const nickInput = document.getElementById("nick");
const tamanoInput = document.getElementById("tamano");
const emailInput = document.getElementById("email");
const formEntrada = document.getElementById("formEntrada");
const error = document.getElementById("error");

// Comprobar si hay algún error de juego.html
if(sessionStorage.getItem('error')) {
    error.innerText = sessionStorage.getItem('error');
    sessionStorage.removeItem('error');
}

// Funciones de evento
function comprobarForm (event) {
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

// Inicio de carga de eventos
// El evento submit es desecadenado también al pulsar ENTER dentro del formulario, a parte de dar click al botón de JUGAR de tipo submit
formEntrada.addEventListener('submit', comprobarForm);
// Geolocalización
datoGeolocalizacion();





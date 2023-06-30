/*
 * JS Para la comprobación de datos del Formulario de entrada
 */

// Inicialización de variables, objetos, DOM
var nickInput;
var tamanoInput;
var emailInput;
var formEntrada;
var error;
var avatarItems;
var itemImg;
var avatarContainer;

// Funciones de evento
/**
 * Comprueba los datos correctos del formulario de entrada
 * @param {EventObject} event Evento que salta al realizar el submit
 */
function comprobarForm(event) {
    // Validación de formulario a nivel de JS (Nivel de seguridad 2 de 3)
    // Si queremos la mayor seguridad posible (Nivel 3 de 3) tendríamos que utilizar un backend como una db y un framework p.e Laravel, Spring, .NET, etc
    if (nickInput.value.match(/^\d/)) { // Con la funnción 'match()' comprobamos que el string cumpla un determinada expresión regular, en este caso que no comience por un número
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
    datosUsuarios(nickInput, tamanoInput, emailInput, avatarContainer);
    historicoUsuarios(nickInput);
    return true;
}

function moviendoImg(event) {
    itemImg = event.target
    // console.dir(itemImg); // Para ver todas sus propiedades
    console.log(itemImg.src);
}

function cambiarImg(event) {
    avatarContainer.src = itemImg.src;
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

    avatarItems = document.getElementsByClassName("avatarImgItem");

    // Eventos del D&D (Drag & Drop)
    for(let item of avatarItems) {
        item.addEventListener('click', moviendoImg);
        item.addEventListener('click', cambiarImg);
        item.addEventListener('dragstart', moviendoImg);
    }

    avatarContainer = document.getElementById("avatarImg");
    /*
     * Un elemento de destino válido es un elemento que ha sido designado para aceptar elementos arrastrables. 
     * Esto se logra agregando un controlador de eventos para el evento dragover en el elemento de destino y llamando al método 
     * preventDefault del objeto event dentro del controlador de eventos. Esto cancela el comportamiento predeterminado del 
     * navegador de no permitir que se suelte un elemento arrastrable en un elemento de destino.
     */
    avatarContainer.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
    avatarContainer.addEventListener('drop', cambiarImg);

}

// INICIO DE CARGA DE EVENTOS
// El evento DOMContentLoaded se dispara cuando el contenido del DOM de la página ha sido completamente cargado y analizado, sin esperar a que se carguen las hojas de estilo, imágenes y subframes.
document.addEventListener('DOMContentLoaded', domCargado);
// Geolocalización
// Esta función no tiene ninguna dependencia con los elementos del DOM, por lo tanto, es mejore dejarla fuera de domCargado, para que se ejecute antes de que se cargue el DOM
// datoGeolocalizacion();





/**
 * JS Para la gestión de los datos de usuario
 * @author Sergio Martín Reizábal <sergio.mare2002@gmail.com>
 * @link https://github.com/sermare18/frontend_html_css_js GitHub
 */

var nick;
var tamano;
var email;
var geolocalizacionTxt;

// Session Storage
/**
 * Almacenar los datos en el sessionStorage
 * @param {HTMLElement} nick nick del usuario
 * @param {HTMLElement} tamano tamaño del panel
 * @param {HTMLElement} email email del usuario
 */
function datosUsuarios(nick, tamano, email) {
    // Almacenamos un nuevo elemento en la sesión de la forma clave: valor
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('tamano', tamano.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('geolocalizacionTxt', geolocalizacionTxt);
}

function getDatosUsuario() {
    nick = sessionStorage.getItem('nick');
    nick = sessionStorage.getItem('tamano');
    nick = sessionStorage.getItem('email');
}

function comprobacionDatosUsuario() {
    if(nick==null) {
        sessionStorage.setItem('error', 'No se ha rellenado correctamente el formulario');
        return false;
    }
    return true;
}

function datoGeolocalizacion() {
    if(!navigator.geolocation) {
        geolocalizacionTxt = "El navegador no es compatible con API Geolocation";
    } else {
        navigator.geolocation.getCurrentPosition(
            // Éxito
            (position) => {
                geolocalizacionTxt = `Latitud: ${position.coords.latitude}, longitud: ${position.coords.longitude}`;
            },
            // Error
            (error) => {
                geolocalizacionTxt = "El navegador no es compatible con API Geolocation";
            }
        );
    }
}

// Local Storage
function historicoUsuarios(nick) {
    let historicoStorage = localStorage.getItem('historico');
    let historico;
    if(historicoStorage == null) {
        historico = [];
    } else {
        // Convierte el contenido de historicoStorage que es un string a un objeto JS
        historico = JSON.parse(historicoStorage);
    }
    let registroUsuario = {
        usuario: nick.value,
        fecha: Date.now()
    }
    historico.push(registroUsuario);
    // En el local storage, NO meter directamente objetos JS, sino strings.
    localStorage.setItem('historico', JSON.stringify(historico));
}
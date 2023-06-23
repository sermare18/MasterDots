/*
 * JS Para la gestión de los datos de usuario
 */

var nick;

// Session Storage
function datosUsuarios(nick) {
    // Almacenamos un nuevo elemento en la sesión de la forma clave: valor
    sessionStorage.setItem('nick', nick.value);
}

function getDatosUsuario() {
    nick = sessionStorage.getItem('nick');
    console.log(nick);
}

function comprobacionDatosUsuario() {
    if(nick==null) {
        sessionStorage.setItem('error', 'No se ha rellenado correctamente el formulario');
        return false;
    }
    return true;
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
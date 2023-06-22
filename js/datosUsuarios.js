/*
 * JS Para la gestión de los datos de usuario
 */

function datosUsuarios(nick) {
    // Almacenamos un nuevo elemento en la sesión de la forma clave: valor
    sessionStorage.setItem('nick', nick.value);
}

function mostrarDatosUsuario() {
    let nick = sessionStorage.getItem('nick');
    console.log(nick);
}
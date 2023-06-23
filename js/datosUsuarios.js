/*
 * JS Para la gestión de los datos de usuario
 */

function datosUsuarios(nick) {
    // Almacenamos un nuevo elemento en la sesión de la forma clave: valor
    sessionStorage.setItem('nick', nick.value);
    // A borrar en otros vídeos
    // El localStorage no se borra al cerrar el navegador
    localStorage.setItem('nick', nick.value);
}

function mostrarDatosUsuario() {
    let nick = sessionStorage.getItem('nick');
    console.log(nick);
    // A borrar en otros videos
    let nickLocal = localStorage.getItem('nick')
    console.log(nickLocal);
}
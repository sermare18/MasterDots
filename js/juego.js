/*
 * JS Para el juego Masterdots
 */

function rellenarFormularioUsuario() {
    document.getElementById("nick").value = nick;
    document.getElementById("avatarImg").src = avatarImg;
}

function pintarPanelJuego() {
    document.getElementById("juego").style.gridTemplateColumns = `repeat(${tamano}, 1fr)`;
    document.getElementById("juego").style.gridTemplateRows = `repeat(${tamano}, 1fr)`;
}

// Capturamos los datos del usuario
getDatosUsuario();
// Comprobamos los datos, utilizamos el objeto location para redirigir a index.html si el usuario no ha rellenado el formulario
if(!comprobacionDatosUsuario()) location = "index.html";
// Rellenamos el formulario
rellenarFormularioUsuario();
pintarPanelJuego();


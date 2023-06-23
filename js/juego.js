/*
 * JS Para el juego Masterdots
 */

// Capturamos los datos del usuario
getDatosUsuario();
// Comprobamos los datos, utilizamos el objeto location para redirigir a index.html si el usuario no ha rellenado el formulario
if(!comprobacionDatosUsuario()) location = "index.html";

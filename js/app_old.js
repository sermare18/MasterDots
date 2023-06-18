/*
 * JS Para la comprobación de datos del Formulario de entrada
 */

// Capturar el valor del input nick
const nickInput = document.getElementById('nick');
// Para ver de que tipo es el elemento
console.log(nickInput.nodeType); // 1
console.dir(nickInput); // Para ver todos sus atributos
console.log(nickInput.value); // Para acceder al valor de atributo value
nickInput.value = "Sergio"; // Para modificar el contenido del atributo value del elemento con id nick
console.log(nickInput.value);

// Capturar el valor del select
const tamanoInput = document.getElementById('tamano');
// Para ver de que tipo es el elemento
console.log(tamanoInput.nodeType); // 1
console.dir(tamanoInput); // Para ver todos sus atributos
console.log(tamanoInput.value); // Para acceder al valor de atributo value
console.log(tamanoInput.options[tamanoInput.selectedIndex].text);

// Ejemplo sobre eventos
function test() {
    console.log("EVENTO SOBRE RATON");
}
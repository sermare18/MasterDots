// El DOM (Modelo de Objeto de Documento) es una interfaz de programación para documentos HTML y XML. 
// Proporciona una representación estructurada del documento y define cómo los programas pueden acceder, para modificar tanto 
// su estructura, estilo y contenido. El DOM representa el documento como un grupo de nodos y objetos estructurados que tienen 
// propiedades y métodos. Esencialmente, conecta las páginas web a scripts o lenguajes de programación.

// Todos los elementos de DOM heredan de Node.
// Node tiene una propiedad que se denomina nodeType, que nos devuelve el tipo del elemento en cuestión.
// Cada tipo está representado por un número.

const liItems = document.getElementsByTagName('li');

console.log("documento: " + document.nodeType);
// El html collection no tiene un tipo, devuelve undefined
console.log("HTMLCollection: " + liItems.nodeType);

for (const liItem of liItems) {
    console.log("liElement: " + liItem.nodeType);
}
// Fig. 11.7: BuscarCadenas.js
// Búsqueda de cadenas con indexOf y lastIndexOf.
var letras = "abcdefghijklmnopqrstuvwxyzabcdefghijklm";

function botonpresionado() {
    var campoEntrada = document.getElementById("campoEntrada");

    document.getElementById("resultados").innerHTML = 
        "<p>La primera ocurrencia se encuentra en el &iacute;ndice " + 
        letras.indexOf(campoEntrada.value) + "</p>" +
        "<p>La &uacute;ltima ocurrencia se encuentra en el &iacute;ndice " +
        letras.lastIndexOf(campoEntrada.value) + "</p>" +
        "<p>La primera ocurrencia desde el &iacute;ndice 12 se encuentra en el &iacute;ndice " +
        letras.indexOf(campoEntrada.value, 12) + "</p>" +
        "<p>La &uacute;ltima ocurrencia desde el &iacute;ndice 12 se encuentra en el &iacute;ndice " +
        letras.lastIndexOf(campoEntrada.value, 12) + "</p>";
} // fin de la función botonpresionado

// Registrar manejador de evento de clic para el botonBuscar
function iniciar() {
    var botonBuscar = document.getElementById("botonBuscar");
    botonBuscar.addEventListener("click", botonpresionado, false);
} // fin de la función iniciar

window.addEventListener("load", iniciar, false);
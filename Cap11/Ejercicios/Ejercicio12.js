// Ejercicio 11.12
// Convierte una línea de texto a mayúsculas y minúsculas usando toUpperCase() y toLowerCase().

function iniciar()
{
   var boton = document.getElementById( "botonConvertir" );
   boton.addEventListener( "click", convertirTexto, false );
} // fin de la función iniciar

function convertirTexto()
{
   var entrada = document.getElementById( "campoEntrada" ).value;
   var campoMayusculas = document.getElementById( "salidaMayusculas" );
   var campoMinusculas = document.getElementById( "salidaMinusculas" );

   // Conversión empleando los métodos nativos del objeto String
   var textoMayusculas = entrada.toUpperCase();
   var textoMinusculas = entrada.toLowerCase();

   // Asignar los resultados a los campos de salida del formulario
   campoMayusculas.value = textoMayusculas;
   campoMinusculas.value = textoMinusculas;
} // fin de la función convertirTexto

window.addEventListener( "load", iniciar, false );
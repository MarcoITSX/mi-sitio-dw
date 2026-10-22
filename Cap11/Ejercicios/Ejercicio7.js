// Ejercicio 11.7
// Genera enunciados aleatorios concatenando elementos de cuatro arreglos de palabras.

// Arreglos de palabras especificados por el ejercicio
var articulo = [ "el", "un", "algún", "ningún" ];
var sustantivo = [ "niño", "niña", "perro", "ciudad", "auto" ];
var verbo = [ "manejó", "saltó", "corrió", "caminó", "omitió" ];
var preposicion = [ "a", "desde", "encima de", "debajo de", "sobre" ];

function iniciar()
{
   var boton = document.getElementById( "botonGenerar" );
   boton.addEventListener( "click", generarHistoria, false );
} // fin de la función iniciar

// Devuelve un elemento aleatorio de un arreglo
function obtenerPalabraAleatoria( arreglo )
{
   var indice = Math.floor( Math.random() * arreglo.length );
   return arreglo[ indice ];
} // fin de la función obtenerPalabraAleatoria

// Construye un único enunciado concatenando palabras en el orden requerido
function crearEnunciado()
{
   var art1 = obtenerPalabraAleatoria( articulo );
   var sust1 = obtenerPalabraAleatoria( sustantivo );
   var verb = obtenerPalabraAleatoria( verbo );
   var prep = obtenerPalabraAleatoria( preposicion );
   var art2 = obtenerPalabraAleatoria( articulo );
   var sust2 = obtenerPalabraAleatoria( sustantivo );

   // Convertir a mayúscula la primera letra del primer artículo
   art1 = art1.charAt( 0 ).toUpperCase() + art1.slice( 1 );

   // Ensamblar las palabras separadas por espacios y finalizar con punto
   return art1 + " " + sust1 + " " + verb + " " + prep + " " + art2 + " " + sust2 + ".";
} // fin de la función crearEnunciado

// Genera la historia completa de 20 enunciados y la despliega en el textarea
function generarHistoria()
{
   var salida = "Había una vez...\n\n";

   // Generar exactamente 20 enunciados aleatorios
   for ( var i = 1; i <= 20; ++i )
   {
      salida += i + ". " + crearEnunciado() + "\n";
   }

   salida += "\nFIN";

   document.getElementById( "historia" ).value = salida;
} // fin de la función generarHistoria

window.addEventListener( "load", iniciar, false );
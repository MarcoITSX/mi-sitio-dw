// Ejercicio 11.16
// Filtra e imprime en un textarea sólo aquellas cadenas que terminan con "ed" usando lastIndexOf.

function iniciar()
{
   var boton = document.getElementById( "botonFiltrar" );
   boton.addEventListener( "click", filtrarCadenas, false );
} // fin de la función iniciar

function filtrarCadenas()
{
   var entrada = document.getElementById( "textoInput" ).value;
   var areaSalida = document.getElementById( "salida" );

   if ( entrada.trim() === "" )
   {
      areaSalida.value = "Por favor, introduzca una serie de cadenas o palabras.";
      return;
   }

   // Dividir la entrada en palabras separadas por espacios
   var palabras = entrada.trim().split( /\s+/ );
   var coincidencias = [];

   for ( var i = 0; i < palabras.length; ++i )
   {
      var palabra = palabras[ i ];

      // Limpiar signos de puntuación finales si los hubiese (ej. comas, puntos)
      var palabraLimpia = palabra.replace( /[^a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/, "" ).toLowerCase();

      // Verificar si "ed" se encuentra exactamente al final de la cadena usando lastIndexOf
      // Si el índice devuelto por lastIndexOf("ed") es igual a (longitud - 2), termina en "ed"
      if ( palabraLimpia.length >= 2 && palabraLimpia.lastIndexOf( "ed" ) === ( palabraLimpia.length - 2 ) )
      {
         coincidencias.push( palabra );
      }
   }

   // Desplegar resultados
   if ( coincidencias.length > 0 )
   {
      var resultado = "Se encontraron " + coincidencias.length + " palabra(s) que terminan en 'ed':\n\n";
      resultado += coincidencias.join( "\n" );
      areaSalida.value = resultado;
   }
   else
   {
      areaSalida.value = "No se encontraron palabras que terminen con los caracteres 'ed'.";
   }
} // fin de la función filtrarCadenas

window.addEventListener( "load", iniciar, false );

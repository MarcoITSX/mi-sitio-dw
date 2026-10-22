// Ejercicio 11.14: ContarLetrasAlfabeto.js
// Cuenta la frecuencia de cada letra del alfabeto (a-z) en un texto utilizando un arreglo y String.prototype.indexOf.

function iniciar()
{
   var boton = document.getElementById( "botonContar" );
   boton.addEventListener( "click", contarTodasLasLetras, false );
} // fin de la función iniciar

function contarTodasLasLetras()
{
   var textoOriginal = document.getElementById( "textoInput" ).value;
   var areaResultados = document.getElementById( "salida" );

   if ( textoOriginal.trim() === "" )
   {
      areaResultados.value = "Por favor, introduzca un texto para analizar.";
      return;
   }

   // Convertir el texto a minúsculas para tratar mayúsculas y minúsculas como una sola
   var texto = textoOriginal.toLowerCase();

   var alfabeto = "abcdefghijklmnopqrstuvwxyz";
   var contadores = new Array( 26 ); // Arreglo para almacenar los totales de las 26 letras

   // Inicializar cada posición del arreglo en cero
   for ( var i = 0; i < contadores.length; ++i )
   {
      contadores[ i ] = 0;
   }

   // Determinar las ocurrencias de cada letra mediante el método indexOf
   for ( var i = 0; i < alfabeto.length; ++i )
   {
      var letra = alfabeto.charAt( i );
      var posicion = texto.indexOf( letra, 0 );

      while ( posicion !== -1 )
      {
         ++contadores[ i ]; // Incrementar el contador correspondiente en el arreglo
         posicion = texto.indexOf( letra, posicion + 1 );
      }
   }

   // Formatear los resultados en una tabla alineada
   var tablaFormat = "===================================\n";
   tablaFormat += " FRECUENCIA DE LETRAS DEL ALFABETO \n";
   tablaFormat += "===================================\n";
   tablaFormat += "  Letra\t\tOcurrencias\n";
   tablaFormat += "-----------------------------------\n";

   var totalLetrasContadas = 0;

   for ( var k = 0; k < alfabeto.length; ++k )
   {
      var letraActual = alfabeto.charAt( k ).toUpperCase();
      var cantidad = contadores[ k ];
      totalLetrasContadas += cantidad;

      tablaFormat += "    " + letraActual + "\t\t    " + cantidad + "\n";
   }

   tablaFormat += "-----------------------------------\n";
   tablaFormat += "Total letras identificadas: " + totalLetrasContadas + "\n";

   areaResultados.value = tablaFormat;
} // fin de la función contarTodasLasLetras

window.addEventListener( "load", iniciar, false );
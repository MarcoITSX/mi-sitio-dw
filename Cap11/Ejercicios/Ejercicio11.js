// Ejercicio 11.11
// Divide una línea de texto en tokens usando String.prototype.split() y los muestra en orden inverso.

function iniciar()
{
   var boton = document.getElementById( "botonInvertir" );
   boton.addEventListener( "click", invertirTokens, false );
} // fin de la función iniciar

function invertirTokens()
{
   var entrada = document.getElementById( "campoEntrada" ).value;
   var areaSalida = document.getElementById( "salida" );

   if ( entrada.trim() === "" )
   {
      areaSalida.value = "Por favor, introduzca una línea de texto válida.";
      return;
   }

   // Dividir la línea de texto en tokens utilizando como delimitador uno o más espacios en blanco
   var tokens = entrada.trim().split( /\s+/ );

   // Invertir la secuencia de elementos en el arreglo
   tokens.reverse();

   // Unir los tokens en una cadena única separada por espacios
   areaSalida.value = tokens.join( " " );
} // fin de la función invertirTokens

window.addEventListener( "load", iniciar, false );
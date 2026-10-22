// Ejercicio 11.15
// Filtra e imprime en un textarea sólo aquellas cadenas que comienzan con la letra "b".

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

   // Dividir la entrada en tokens utilizando espacios en blanco como delimitadores
   var palabras = entrada.trim().split( /\s+/ );
   var coincidencias = [];

   // Evaluar cada palabra en el arreglo
   for ( var i = 0; i < palabras.length; ++i )
   {
      var palabra = palabras[ i ];
      
      // Limpiar signos de puntuación iniciales si los hubiera
      var palabraLimpia = palabra.replace( /^[^a-zA-ZáéíóúÁÉÍÓÚñÑ]+/, "" );

      // Verificar si el primer carácter es 'b' o 'B' mediante charAt(0)
      if ( palabraLimpia.length > 0 && palabraLimpia.charAt( 0 ).toLowerCase() === "b" )
      {
         coincidencias.push( palabra );
      }
   }

   // Desplegar el resultado
   if ( coincidencias.length > 0 )
   {
      var resultadoText = "Se encontraron " + coincidencias.length + " palabra(s) que comienzan con 'b':\n\n";
      resultadoText += coincidencias.join( "\n" );
      areaSalida.value = resultadoText;
   }
   else
   {
      areaSalida.value = "No se encontraron palabras que comiencen con el carácter 'b'.";
   }
} // fin de la función filtrarCadenas

window.addEventListener( "load", iniciar, false );
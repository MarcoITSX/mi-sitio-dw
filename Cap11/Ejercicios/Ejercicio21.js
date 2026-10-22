// Ejercicio 11.21
// Genera todas las combinaciones posibles de 3 letras a partir de una palabra de 5 letras usando charAt.

function iniciar()
{
   var boton = document.getElementById( "botonGenerar" );
   boton.addEventListener( "click", generarCombinaciones, false );
} // fin de la función iniciar

function generarCombinaciones()
{
   var campoInput = document.getElementById( "palabraInput" );
   var areaSalida = document.getElementById( "salida" );
   var divError = document.getElementById( "mensajeError" );

   // Limpiar salidas previas
   areaSalida.value = "";
   divError.innerHTML = "";

   var palabra = campoInput.value.trim();

   // Validar que la palabra tenga exactamente 5 letras
   if ( palabra.length !== 5 )
   {
      divError.innerHTML = "Por favor, introduzca una palabra que contenga exactamente 5 letras.";
      return;
   }

   var combinaciones = [];

   // Tres ciclos anidados para seleccionar 3 posiciones distintas (i, j, k) dentro de la palabra de 5 letras
   for ( var i = 0; i < 5; ++i )
   {
      for ( var j = 0; j < 5; ++j )
      {
         if ( j === i ) continue; // Evitar reutilizar la misma posición de letra

         for ( var k = 0; k < 5; ++k )
         {
            if ( k === i || k === j ) continue; // Evitar índices repetidos

            // Construir la combinación de 3 letras mediante charAt
            var subpalabra = palabra.charAt( i ) + palabra.charAt( j ) + palabra.charAt( k );

            // Evitar guardar duplicados si la palabra original posee letras repetidas
            if ( combinaciones.indexOf( subpalabra ) === -1 )
            {
               combinaciones.push( subpalabra );
            }
         }
      }
   }

   // Formatear los resultados para su despliegue en el textarea
   var textoResultados = "=======================================================\n";
   textoResultados += " COMBINACIONES DE 3 LETRAS GENERADAS (Total: " + combinaciones.length + ")\n";
   textoResultados += "=======================================================\n\n";

   // Organizar las palabras en columnas de 5 por fila
   for ( var m = 0; m < combinaciones.length; ++m )
   {
      textoResultados += combinaciones[ m ] + "\t\t";
      if ( ( m + 1 ) % 5 === 0 )
      {
         textoResultados += "\n";
      }
   }

   areaSalida.value = textoResultados;
} // fin de la función generarCombinaciones

window.addEventListener( "load", iniciar, false );
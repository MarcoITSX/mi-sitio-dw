// Ejercicio 11.20
// Implementación personalizada de la función de búsqueda miLastIndexOf sin utilizar String.prototype.lastIndexOf.

// Función personalizada que simula String.prototype.lastIndexOf
function miLastIndexOf( cadenaOrigen, subcadena, indiceInicial )
{
   var longOrigen = cadenaOrigen.length;
   var longSub = subcadena.length;

   // Determinar el índice inicial por defecto si no se proporciona o no es un número
   if ( typeof indiceInicial === "undefined" || isNaN( indiceInicial ) || indiceInicial === "" )
   {
      indiceInicial = longOrigen;
   }
   else
   {
      indiceInicial = parseInt( indiceInicial, 10 );
   }

   // Ajustar el índice inicial si es negativo
   if ( indiceInicial < 0 )
   {
      indiceInicial = 0;
   }

   // Si la subcadena a buscar es más larga que la cadena de origen, no puede existir
   if ( longSub > longOrigen )
   {
      return -1;
   }

   // Caso límite: subcadena vacía
   if ( longSub === 0 )
   {
      return indiceInicial < longOrigen ? indiceInicial : longOrigen;
   }

   // Ajustar el límite superior de inicio de la búsqueda
   var inicio = Math.min( indiceInicial, longOrigen - longSub );

   // Recorrer la cadena de origen HACIA ATRÁS (desde 'inicio' hasta 0)
   for ( var i = inicio; i >= 0; --i )
   {
      var coincide = true;

      // Comparar carácter por carácter con la subcadena
      for ( var j = 0; j < longSub; ++j )
      {
         if ( cadenaOrigen.charAt( i + j ) !== subcadena.charAt( j ) )
         {
            coincide = false;
            break; // Romper el ciclo interno si un carácter no coincide
         }
      }

      // Si coincidieron todos los caracteres, devolver la posición inicial de la última ocurrencia
      if ( coincide )
      {
         return i;
      }
   }

   // Devolver -1 si no se encontró la subcadena
   return -1;
} // fin de la función miLastIndexOf

function probarMiLastIndexOf()
{
   var texto = document.getElementById( "cadenaOrigen" ).value;
   var subcadena = document.getElementById( "subcadena" ).value;
   var inicioInput = document.getElementById( "indiceInicial" ).value;
   var divResultados = document.getElementById( "resultados" );

   var inicio = ( inicioInput === "" ) ? undefined : parseInt( inicioInput, 10 );

   // Evaluar con la función personalizada
   var resultadoPersonalizado = miLastIndexOf( texto, subcadena, inicio );

   // Evaluar con el método nativo lastIndexOf de JavaScript
   var resultadoNativo = texto.lastIndexOf( subcadena, inicio );

   var mensaje = "<h3>Resultados de la evaluación:</h3>" +
      "<ul>" +
      "<li><strong>Texto de origen:</strong> \"" + texto + "\"</li>" +
      "<li><strong>Subcadena buscada:</strong> \"" + subcadena + "\"</li>" +
      "<li><strong>Índice inicial:</strong> " + ( typeof inicio === "undefined" ? "Final de cadena (predeterminado)" : inicio ) + "</li>" +
      "<li><strong>Resultado de <code>miLastIndexOf</code> (Algoritmo propio):</strong> " + resultadoPersonalizado + "</li>" +
      "<li><strong>Resultado de <code>lastIndexOf</code> (Método nativo):</strong> " + resultadoNativo + "</li>" +
      "</ul>";

   if ( resultadoPersonalizado === resultadoNativo )
   {
      mensaje += "<p style='color: green;'><strong>¡Verificación correcta!</strong> El algoritmo personalizado devuelve exactamente el mismo resultado que la función nativa de JavaScript.</p>";
   }
   else
   {
      mensaje += "<p style='color: red;'><strong>Divergencia detectada.</strong> Verifique los parámetros ingresados.</p>";
   }

   divResultados.innerHTML = mensaje;
} // fin de la función probarMiLastIndexOf

function iniciar()
{
   var boton = document.getElementById( "botonProbar" );
   boton.addEventListener( "click", probarMiLastIndexOf, false );
} // fin de la función iniciar

window.addEventListener( "load", iniciar, false );
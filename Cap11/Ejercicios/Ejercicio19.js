// Ejercicio 11.19
// Implementación personalizada de la función de búsqueda miIndexOf sin utilizar String.prototype.indexOf.

// Función personalizada que simula String.prototype.indexOf
function miIndexOf( cadenaOrigen, subcadena, indiceInicial )
{
   // Si no se especifica indiceInicial o no es numérico, por defecto es 0
   if ( typeof indiceInicial === "undefined" || isNaN( indiceInicial ) )
   {
      indiceInicial = 0;
   }
   else
   {
      indiceInicial = parseInt( indiceInicial, 10 );
   }

   // Ajustar indiceInicial si es negativo
   if ( indiceInicial < 0 )
   {
      indiceInicial = 0;
   }

   var longOrigen = cadenaOrigen.length;
   var longSub = subcadena.length;

   // Caso límite: subcadena vacía
   if ( longSub === 0 )
   {
      return indiceInicial <= longOrigen ? indiceInicial : longOrigen;
   }

   // Caso límite: índice inicial fuera de rango o subcadena más larga que el texto
   if ( indiceInicial >= longOrigen || longSub > longOrigen )
   {
      return -1;
   }

   // Límite máximo donde puede comenzar la subcadena
   var limite = longOrigen - longSub;

   // Iterar por la cadena de origen desde indiceInicial hasta el límite
   for ( var i = indiceInicial; i <= limite; ++i )
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

      // Si todos los caracteres coincidieron, devolver la posición inicial
      if ( coincide )
      {
         return i;
      }
   }

   // Si no se encontró ninguna coincidencia en toda la cadena
   return -1;
} // fin de la función miIndexOf

function probarMiIndexOf()
{
   var texto = document.getElementById( "cadenaOrigen" ).value;
   var subcadena = document.getElementById( "subcadena" ).value;
   var inicioInput = document.getElementById( "indiceInicial" ).value;
   var divResultados = document.getElementById( "resultados" );

   var inicio = parseInt( inicioInput, 10 );

   // Evaluar con el algoritmo propio
   var resultadoPersonalizado = miIndexOf( texto, subcadena, inicio );

   // Evaluar con el método nativo de JavaScript para comparar
   var resultadoNativo = texto.indexOf( subcadena, inicio );

   var mensaje = "<h3>Resultados de la evaluación:</h3>" +
      "<ul>" +
      "<li><strong>Texto de origen:</strong> \"" + texto + "\"</li>" +
      "<li><strong>Subcadena buscada:</strong> \"" + subcadena + "\"</li>" +
      "<li><strong>Índice inicial:</strong> " + ( isNaN( inicio ) ? 0 : inicio ) + "</li>" +
      "<li><strong>Resultado de <code>miIndexOf</code> (Algoritmo propio):</strong> " + resultadoPersonalizado + "</li>" +
      "<li><strong>Resultado de <code>indexOf</code> (Método nativo):</strong> " + resultadoNativo + "</li>" +
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
} // fin de la función probarMiIndexOf

function iniciar()
{
   var boton = document.getElementById( "botonProbar" );
   boton.addEventListener( "click", probarMiIndexOf, false );
} // fin de la función iniciar

window.addEventListener( "load", iniciar, false );
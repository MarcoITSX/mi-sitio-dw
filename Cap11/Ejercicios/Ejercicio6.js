// Ejercicio 11.6
// Compara dos cadenas ingresadas mediante operadores relacionales (<, >) y de igualdad (===).

function compararCadenas()
{
   var cadena1 = document.getElementById( "cadena1" ).value;
   var cadena2 = document.getElementById( "cadena2" ).value;
   var resultados = document.getElementById( "resultados" );

   var mensaje = "";

   // Comparaciones lexicográficas basadas en el orden de códigos Unicode
   if ( cadena1 < cadena2 )
   {
      mensaje = "<p>La cadena <strong>\"" + cadena1 + "\"</strong> es <strong>MENOR que</strong> la cadena <strong>\"" + cadena2 + "\"</strong> (<code>\"" + cadena1 + "\" &lt; \"" + cadena2 + "\"</code>).</p>";
   }
   else if ( cadena1 > cadena2 )
   {
      mensaje = "<p>La cadena <strong>\"" + cadena1 + "\"</strong> es <strong>MAYOR que</strong> la cadena <strong>\"" + cadena2 + "\"</strong> (<code>\"" + cadena1 + "\" &gt; \"" + cadena2 + "\"</code>).</p>";
   }
   else
   {
      mensaje = "<p>La cadena <strong>\"" + cadena1 + "\"</strong> es <strong>IGUAL a</strong> la cadena <strong>\"" + cadena2 + "\"</strong> (<code>\"" + cadena1 + "\" === \"" + cadena2 + "\"</code>).</p>";
   }

   // Desglose detallado de todos los operadores relacionales
   mensaje += "<h4>Evaluación detallada de operadores:</h4>" +
      "<ul>" +
      "<li><code>\"" + cadena1 + "\" &lt; \"" + cadena2 + "\"</code>: <strong>" + ( cadena1 < cadena2 ) + "</strong></li>" +
      "<li><code>\"" + cadena1 + "\" &gt; \"" + cadena2 + "\"</code>: <strong>" + ( cadena1 > cadena2 ) + "</strong></li>" +
      "<li><code>\"" + cadena1 + "\" &lt;= \"" + cadena2 + "\"</code>: <strong>" + ( cadena1 <= cadena2 ) + "</strong></li>" +
      "<li><code>\"" + cadena1 + "\" &gt;= \"" + cadena2 + "\"</code>: <strong>" + ( cadena1 >= cadena2 ) + "</strong></li>" +
      "<li><code>\"" + cadena1 + "\" === \"" + cadena2 + "\"</code>: <strong>" + ( cadena1 === cadena2 ) + "</strong></li>" +
      "<li><code>\"" + cadena1 + "\" !== \"" + cadena2 + "\"</code>: <strong>" + ( cadena1 !== cadena2 ) + "</strong></li>" +
      "</ul>";

   resultados.innerHTML = mensaje;
} // fin de la función compararCadenas

function iniciar()
{
   var boton = document.getElementById( "botonComparar" );
   boton.addEventListener( "click", compararCadenas, false );
} // fin de la función iniciar

window.addEventListener( "load", iniciar, false );

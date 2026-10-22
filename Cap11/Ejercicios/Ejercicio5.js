// Ejercicio 11.5: RedondearConRound.js
// Redondeo de números a enteros, décimas, centésimas y milésimas usando el método Math.round.

// a) Redondea al entero más cercano usando Math.round
function redondearAEntero( numero )
{
   return Math.round( numero );
} // fin de la función redondearAEntero

// b) Redondea a la décima más cercana (1 lugar decimal)
function redondearADecimas( numero )
{
   return Math.round( numero * 10 ) / 10;
} // fin de la función redondearADecimas

// c) Redondea a la centésima más cercana (2 lugares decimales)
function redondearACentesimas( numero )
{
   return Math.round( numero * 100 ) / 100;
} // fin de la función redondearACentesimas

// d) Redondea a la milésima más cercana (3 lugares decimales)
function redondearAMilesimas( numero )
{
   return Math.round( numero * 1000 ) / 1000;
} // fin de la función redondearAMilesimas

// Procesa el número ingresado y muestra los resultados en una tabla HTML5
function procesarRedondeo()
{
   var campo = document.getElementById( "numeroInput" );
   var valor = parseFloat( campo.value );
   var contenedor = document.getElementById( "resultados" );

   if ( isNaN( valor ) )
   {
      contenedor.innerHTML = "<p style='color:red;'>Por favor, introduzca un número entero o decimal válido.</p>";
      return;
   }

   var entero = redondearAEntero( valor );
   var decimas = redondearADecimas( valor );
   var centesimas = redondearACentesimas( valor );
   var milesimas = redondearAMilesimas( valor );

   var salida = "<table border='1' cellpadding='6' cellspacing='0'>" +
      "<thead><tr><th>Tipo de redondeo</th><th>Valor resultante (Math.round)</th></tr></thead><tbody>" +
      "<tr><td><strong>Valor original</strong></td><td>" + valor + "</td></tr>" +
      "<tr><td><strong>Entero más cercano (redondearAEntero)</strong></td><td>" + entero + "</td></tr>" +
      "<tr><td><strong>Décima más cercana (redondearADecimas)</strong></td><td>" + decimas + "</td></tr>" +
      "<tr><td><strong>Centésima más cercana (redondearACentesimas)</strong></td><td>" + centesimas + "</td></tr>" +
      "<tr><td><strong>Milésima más cercana (redondearAMilesimas)</strong></td><td>" + milesimas + "</td></tr>" +
      "</tbody></table>";

   contenedor.innerHTML = salida;
} // fin de la función procesarRedondeo

function iniciar()
{
   var boton = document.getElementById( "botonRedondear" );
   boton.addEventListener( "click", procesarRedondeo, false );
} // fin de la función iniciar

window.addEventListener( "load", iniciar, false );

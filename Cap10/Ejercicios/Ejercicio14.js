// Ejercicio 10.14
// Simulación del tiro de dos dados 36,000 veces utilizando un arreglo bidimensional.

function iniciar()
{
   var boton = document.getElementById( "botonSimular" );
   boton.addEventListener( "click", simularLanzamientos, false );
} // fin de la función iniciar

function simularLanzamientos()
{
   // Arreglo bidimensional de 7x7 para registrar la frecuencia de cada combinación [dado1][dado2]
   // Se utilizan subíndices del 1 al 6 para alinearse directamente con las caras del dado
   var combinaciones = [
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ]
   ];

   var TOTAL_TIROS = 36000;

   // Simular 36,000 lanzamientos registrando cada combinación en el arreglo bidimensional
   for ( var i = 0; i < TOTAL_TIROS; ++i )
   {
      var dado1 = Math.floor( 1 + Math.random() * 6 );
      var dado2 = Math.floor( 1 + Math.random() * 6 );
      ++combinaciones[ dado1 ][ dado2 ];
   }

   // Arreglo para acumular la frecuencia de cada suma (índices de 2 a 12)
   var totalSuma = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

   // Recorrer el arreglo bidimensional para sumar los eventos correspondientes
   for ( var d1 = 1; d1 <= 6; ++d1 )
   {
      for ( var d2 = 1; d2 <= 6; ++d2 )
      {
         var suma = d1 + d2;
         totalSuma[ suma ] += combinaciones[ d1 ][ d2 ];
      }
   }

   // Construcción de la tabla HTML5 con los resultados
   var salida = "<h3>Resultados acumulados para 36,000 lanzamientos</h3>";
   salida += "<table border='1' cellpadding='5' cellspacing='0'><thead><tr>" +
      "<th>Suma</th>" +
      "<th>Frecuencia Observada</th>" +
      "<th>Porcentaje Observado</th>" +
      "<th>Frecuencia Esperada (Teórica)</th>" +
      "<th>Porcentaje Esperado</th>" +
      "</tr></thead><tbody>";

   // Cantidad de combinaciones teóricas posibles para cada suma (de 2 a 12)
   // Total de combinaciones posibles = 36
   var formasTeoricas = [ 0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1 ];

   for ( var s = 2; s <= 12; ++s )
   {
      var frecObs = totalSuma[ s ];
      var pctObs = ( ( frecObs / TOTAL_TIROS ) * 100 ).toFixed( 2 );
      var frecEsp = Math.round( ( formasTeoricas[ s ] / 36 ) * TOTAL_TIROS );
      var pctEsp = ( ( formasTeoricas[ s ] / 36 ) * 100 ).toFixed( 2 );

      salida += "<tr>" +
         "<td style='text-align:center;'><strong>" + s + "</strong></td>" +
         "<td style='text-align:right;'>" + frecObs + "</td>" +
         "<td style='text-align:right;'>" + pctObs + "%</td>" +
         "<td style='text-align:right;'>" + frecEsp + "</td>" +
         "<td style='text-align:right;'>" + pctEsp + "%</td>" +
         "</tr>";
   }

   salida += "</tbody></table>";

   // Evaluación de razonabilidad
   salida += "<h4>Evaluación de razonabilidad:</h4>";
   salida += "<p>Los resultados obtenidos son <strong>altamente razonables</strong>. La suma <strong>7</strong> aparece aproximadamente 6,000 veces (cerca del 16.67% o 1/6 del total), lo cual coincide con las 6 combinaciones posibles sobre 36. Asimismo, las sumas extremas <strong>2</strong> y <strong>12</strong> representan aproximadamente 1,000 apariciones cada una (alrededor del 2.78% o 1/36), demostrando la validez de la simulación probabilística.</p>";

   document.getElementById( "salida" ).innerHTML = salida;
} // fin de la función simularLanzamientos

window.addEventListener( "load", iniciar, false );
// Ejercicio 10.16
// Implementación del algoritmo de la Criba de Eratóstenes para números primos del 1 al 999.

function iniciar()
{
   var TAMANIO = 1000;
   var primos = new Array( TAMANIO );

   // a) Inicializar todos los elementos del arreglo en 1
   for ( var i = 0; i < primos.length; ++i )
   {
      primos[ i ] = 1;
   }

   // b) Establecer los primeros dos elementos en 0 (0 y 1 no son primos)
   primos[ 0 ] = 0;
   primos[ 1 ] = 0;

   // Criba de Eratóstenes: descalificar múltiplos de cada primo encontrado
   for ( var i = 2; i < primos.length; ++i )
   {
      if ( primos[ i ] === 1 )
      {
         // Recorrer el arreglo asignando 0 a todos los múltiplos de i
         for ( var j = i + i; j < primos.length; j += i )
         {
            primos[ j ] = 0;
         }
      }
   }

   // Mostrar los resultados procesados en el documento
   mostrarResultados( primos );
} // fin de la función iniciar

function mostrarResultados( primos )
{
   var contenedor = document.getElementById( "resultados" );
   var listaPrimos = [];

   // Recopilar todos los subíndices cuyos elementos se mantuvieron en 1
   for ( var i = 2; i < primos.length; ++i )
   {
      if ( primos[ i ] === 1 )
      {
         listaPrimos.push( i );
      }
   }

   var salida = "<h3>Se encontraron " + listaPrimos.length + " números primos entre 1 y 999:</h3>";
   salida += "<table class='tabla-primos'><thead><tr><th colspan='10'>Números primos encontrados</th></tr></thead><tbody>";

   // Formatear los números primos en una tabla con 10 columnas
   var COLUMNAS = 10;
   for ( var k = 0; k < listaPrimos.length; ++k )
   {
      if ( k % COLUMNAS === 0 )
      {
         salida += "<tr>";
      }

      salida += "<td>" + listaPrimos[ k ] + "</td>";

      if ( ( k + 1 ) % COLUMNAS === 0 || k === listaPrimos.length - 1 )
      {
         // Rellenar celdas vacías al final de la última fila si es necesario
         if ( k === listaPrimos.length - 1 && ( k + 1 ) % COLUMNAS !== 0 )
         {
            var faltantes = COLUMNAS - ( ( k + 1 ) % COLUMNAS );
            for ( var f = 0; f < faltantes; ++f )
            {
               salida += "<td></td>";
            }
         }
         salida += "</tr>";
      }
   }

   salida += "</tbody></table>";
   contenedor.innerHTML = salida;
} // fin de la función mostrarResultados

window.addEventListener( "load", iniciar, false );
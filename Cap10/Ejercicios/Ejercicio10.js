// Ejercicio 10.10
// Determina cuántos vendedores obtuvieron salarios en cada rango de comisión.

// Arreglo de contadores para los 9 rangos de salario (índices 0 a 8)
// Posición 0: $200-$299, 1: $300-$399, ..., 7: $900-$999, 8: $1000 y más
var rangos = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

// Registra el evento al cargar la ventana e inicializa la interfaz
function iniciar()
{
   var boton = document.getElementById( "botonCalcular" );
   boton.addEventListener( "click", registrarVendedor, false );
   actualizarTabla(); // Muestra la tabla vacía al inicio
} // fin de la función iniciar

// Calcula el salario del vendedor e incrementa el contador adecuado
function registrarVendedor( e )
{
   // Evita que el formulario recargue la página al hacer clic
   if ( e ) {
      e.preventDefault();
   }

   var campoVentas = document.getElementById( "ventas" );
   var ventasBrutas = parseFloat( campoVentas.value );

   if ( isNaN( ventasBrutas ) || ventasBrutas < 0 )
   {
      alert( "Por favor, introduzca un monto válido de ventas brutas." );
      return;
   }

   // El salario se calcula como $200 + 9% de ventas brutas (truncado a entero)
   var salario = Math.floor( 200 + 0.09 * ventasBrutas );

   // Determina el índice correspondiente en el arreglo (de 0 a 8)
   var indice = Math.floor( ( salario - 200 ) / 100 );

   if ( indice < 0 )
   {
      indice = 0;
   }
   else if ( indice > 8 )
   {
      indice = 8; // Los salarios >= $1000 se acumulan en el último índice
   }

   // Incrementar el contador del rango
   ++rangos[ indice ];

   // Limpiar campo de texto y actualizar la vista
   campoVentas.value = "";
   campoVentas.focus();
   actualizarTabla();
} // fin de la función registrarVendedor

// Genera y actualiza la tabla de HTML5 con los resultados del arreglo
function actualizarTabla()
{
   var etiquetas = [
      "$200 - $299",
      "$300 - $399",
      "$400 - $499",
      "$500 - $599",
      "$600 - $699",
      "$700 - $799",
      "$800 - $899",
      "$900 - $999",
      "$1000 y más"
   ];

   var contenido = "<table><thead><tr><th>Rango de salario</th>" +
      "<th>Número de vendedores</th></tr></thead><tbody>";

   for ( var i = 0; i < rangos.length; ++i )
   {
      contenido += "<tr><td>" + etiquetas[ i ] + "</td><td>" + rangos[ i ] + "</td></tr>";
   }

   contenido += "</tbody></table>";
   document.getElementById( "salida" ).innerHTML = contenido;
} // fin de la función actualizarTabla

window.addEventListener( "load", iniciar, false );
// Ejercicio 11.24
// Implementa la técnica de protección de cheques rellenando con asteriscos los espacios a la izquierda (total 9 posiciones).

function iniciar()
{
   var boton = document.getElementById( "botonProteger" );
   boton.addEventListener( "click", aplicarProteccionCheque, false );
} // fin de la función iniciar

function aplicarProteccionCheque()
{
   var campoMonto = document.getElementById( "montoInput" );
   var campoSalida = document.getElementById( "montoProtegido" );
   var divError = document.getElementById( "mensajeError" );

   // Limpiar salidas previas
   campoSalida.value = "";
   divError.innerHTML = "";

   var valorNumerico = parseFloat( campoMonto.value );

   if ( isNaN( valorNumerico ) || valorNumerico < 0 )
   {
      divError.innerHTML = "Por favor, introduzca un monto numérico positivo válido.";
      return;
   }

   // Formatear el monto a dos decimales
   var cadenaMonto = valorNumerico.toFixed( 2 );

   // Definir el número total de espacios en el cheque (9 posiciones)
   var LIMITE_ESPACIOS = 9;

   if ( cadenaMonto.length > LIMITE_ESPACIOS )
   {
      divError.innerHTML = "El monto excede los 9 espacios disponibles para la impresión en el cheque ($" + cadenaMonto + ").";
      return;
   }

   // Rellenar con asteriscos a la izquierda hasta completar exactamente 9 caracteres
   var asteriscosFaltantes = LIMITE_ESPACIOS - cadenaMonto.length;
   var prefijoAsteriscos = "";

   for ( var i = 0; i < asteriscosFaltantes; ++i )
   {
      prefijoAsteriscos += "*";
   }

   var montoProtegido = prefijoAsteriscos + cadenaMonto;

   // Asignar el monto impreso formateado al campo de texto
   campoSalida.value = montoProtegido;
} // fin de la función aplicarProteccionCheque

window.addEventListener( "load", iniciar, false );
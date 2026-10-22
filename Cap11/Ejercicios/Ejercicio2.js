// Ejercicio 11.2
// Manejo de eventos de clic y cálculo de fechas relativas con el objeto Date.

// Muestra la fecha y hora actuales
function mostrarAhora()
{
   var ahora = new Date();
   window.alert( "Fecha y hora actuales:\n" + ahora.toString() );
} // fin de la función mostrarAhora

// Muestra la fecha y hora de hace 24 horas
function mostrarAyer()
{
   var ayer = new Date();
   ayer.setDate( ayer.getDate() - 1 ); // Resta 1 día (24 horas)
   window.alert( "Fecha y hora hace 24 horas (Ayer):\n" + ayer.toString() );
} // fin de la función mostrarAyer

// Muestra la fecha y hora de hace diez años
function mostrarDiezAniosAtras()
{
   var diezAnios = new Date();
   diezAnios.setFullYear( diezAnios.getFullYear() - 10 ); // Resta 10 años
   window.alert( "Fecha y hora hace diez años:\n" + diezAnios.toString() );
} // fin de la función mostrarDiezAniosAtras

// Muestra la fecha y hora una semana en el futuro
function mostrarUnaSemanaDespues()
{
   var unaSemana = new Date();
   unaSemana.setDate( unaSemana.getDate() + 7 ); // Suma 7 días
   window.alert( "Fecha y hora una semana a partir de hoy:\n" + unaSemana.toString() );
} // fin de la función mostrarUnaSemanaDespues

// Registra los componentes de escucha de eventos cuando se carga el DOM
function iniciar()
{
   var botonAhora = document.getElementById( "botonAhora" );
   var botonAyer = document.getElementById( "botonAyer" );
   var botonDiezAnios = document.getElementById( "botonDiezAnios" );
   var botonUnaSemana = document.getElementById( "botonUnaSemana" );

   botonAhora.addEventListener( "click", mostrarAhora, false );
   botonAyer.addEventListener( "click", mostrarAyer, false );
   botonDiezAnios.addEventListener( "click", mostrarDiezAniosAtras, false );
   botonUnaSemana.addEventListener( "click", mostrarUnaSemanaDespues, false );
} // fin de la función iniciar

window.addEventListener( "load", iniciar, false );
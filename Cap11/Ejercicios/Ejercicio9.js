// Ejercicio 11.9
// Traductor de oraciones a "latín cerdo" (Pig Latin) utilizando split y subcadenas.

function iniciar()
{
   var boton = document.getElementById( "botonTraducir" );
   boton.addEventListener( "click", procesarTraduccion, false );
} // fin de la función iniciar

function procesarTraduccion()
{
   var entrada = document.getElementById( "enunciado" ).value;
   var areaSalida = document.getElementById( "salida" );

   if ( entrada.trim() === "" )
   {
      areaSalida.value = "Por favor, introduzca una frase para traducir.";
      return;
   }

   var traduccion = imprimirLatinCerdo( entrada );
   areaSalida.value = traduccion;
} // fin de la función procesarTraduccion

// Recibe una frase, la divide en tokens y traduce cada palabra a latín cerdo
function imprimirLatinCerdo( enunciado )
{
   var palabras = enunciado.trim().split( /\s+/ ); // Dividir por uno o más espacios
   var palabrasTraducidas = [];

   for ( var i = 0; i < palabras.length; ++i )
   {
      var palabra = palabras[ i ];
      var palabraTraducida = traducirPalabra( palabra );
      palabrasTraducidas.push( palabraTraducida );
   }

   return palabrasTraducidas.join( " " );
} // fin de la función imprimirLatinCerdo

// Traduce una sola palabra aplicando la regla: (resto de la palabra) + (primera letra) + "ay"
function traducirPalabra( palabra )
{
   if ( palabra.length === 0 )
   {
      return "";
   }

   // Conservar signos de puntuación al final si los hay (ej. '.', ',', '!', '?')
   var puntuacion = "";
   var ultimoCaracter = palabra.charAt( palabra.length - 1 );

   if ( ".,;!?".indexOf( ultimoCaracter ) !== -1 )
   {
      puntuacion = ultimoCaracter;
      palabra = palabra.substring( 0, palabra.length - 1 );
   }

   if ( palabra.length === 0 )
   {
      return puntuacion;
   }

   var primeraLetra = palabra.charAt( 0 );
   var restoPalabra = palabra.substring( 1 );

   // Mantener la capitalización adecuada si la primera letra era mayúscula
   var esMayuscula = ( primeraLetra === primeraLetra.toUpperCase() && primeraLetra !== primeraLetra.toLowerCase() );

   if ( esMayuscula )
   {
      primeraLetra = primeraLetra.toLowerCase();
      if ( restoPalabra.length > 0 )
      {
         restoPalabra = restoPalabra.charAt( 0 ).toUpperCase() + restoPalabra.substring( 1 );
      }
   }

   return restoPalabra + primeraLetra + "ay" + puntuacion;
} // fin de la función traducirPalabra

window.addEventListener( "load", iniciar, false );

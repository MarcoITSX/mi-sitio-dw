// Ejercicio 11.13
// Cuenta las ocurrencias de un carácter en un texto de varias líneas usando String.prototype.indexOf.

function iniciar()
{
   var boton = document.getElementById( "botonContar" );
   boton.addEventListener( "click", contarOcurrencias, false );
} // fin de la función iniciar

function contarOcurrencias()
{
   var texto = document.getElementById( "textoInput" ).value;
   var caracterBusqueda = document.getElementById( "caracterInput" ).value;
   var divResultados = document.getElementById( "resultados" );

   // Validar que se haya especificado un carácter
   if ( caracterBusqueda.length === 0 )
   {
      divResultados.innerHTML = "<p style='color: red;'>Por favor, introduzca un carácter de búsqueda.</p>";
      return;
   }

   var contador = 0;
   // Buscar la primera ocurrencia comenzando en el índice 0
   var posicion = texto.indexOf( caracterBusqueda, 0 );

   // Mientas se siga encontrando el carácter (indexOf devuelve un índice >= 0)
   while ( posicion !== -1 )
   {
      ++contador;
      // Reanudar la búsqueda a partir del siguiente carácter después del encontrado
      posicion = texto.indexOf( caracterBusqueda, posicion + 1 );
   }

   // Desplegar el resultado
   divResultados.innerHTML = "<p>El car&aacute;cter <strong>'" + caracterBusqueda + 
      "'</strong> aparece <strong>" + contador + 
      "</strong> " + ( contador === 1 ? "vez" : "veces" ) + " en el texto proporcionado.</p>";
} // fin de la función contarOcurrencias

window.addEventListener( "load", iniciar, false );
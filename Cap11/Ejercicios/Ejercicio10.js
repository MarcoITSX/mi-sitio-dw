// Ejercicio 11.10
// Desglosa un número telefónico en código de área y número de 7 dígitos usando String.prototype.split().

function iniciar()
{
   var boton = document.getElementById( "botonDesglosar" );
   boton.addEventListener( "click", desglosarTelefono, false );
} // fin de la función iniciar

function desglosarTelefono()
{
   var entrada = document.getElementById( "telefonoInput" ).value;
   var campoArea = document.getElementById( "codigoArea" );
   var campoNumero = document.getElementById( "numeroSieteDigitos" );
   var divError = document.getElementById( "mensajeError" );

   // Limpiar salidas previas
   campoArea.value = "";
   campoNumero.value = "";
   divError.innerHTML = "";

   // Dividir la cadena mediante la expresión regular /[()\s-]+/ que busca '(', ')', espacios y '-'
   var tokens = entrada.trim().split( /[()\s-]+/ );

   // Filtrar posibles subcadenas vacías generadas al separar símbolos al inicio/final
   var tokensLimpios = [];
   for ( var i = 0; i < tokens.length; ++i )
   {
      if ( tokens[ i ] !== "" )
      {
         tokensLimpios.push( tokens[ i ] );
      }
   }

   // Validar que se hayan obtenido los tres componentes requeridos
   if ( tokensLimpios.length === 3 )
   {
      var codigoArea = tokensLimpios[ 0 ];      // Ej: "555"
      var tresDigitos = tokensLimpios[ 1 ];     // Ej: "555"
      var cuatroDigitos = tokensLimpios[ 2 ];   // Ej: "5555"

      // Concatenar los primeros 3 dígitos con los últimos 4 dígitos
      var numeroSiete = tresDigitos + cuatroDigitos;

      // Asignar los resultados a los campos de texto del formulario
      campoArea.value = codigoArea;
      campoNumero.value = numeroSiete;
   }
   else
   {
      divError.innerHTML = "Formato de número telefónico inválido. Por favor, use el formato (555) 555-5555 o (555)555-5555.";
   }
} // fin de la función desglosarTelefono

window.addEventListener( "load", iniciar, false );
// Ejercicio 11.17: CodigoACaracter.js
// Obtiene el carácter correspondiente a un código numérico entero mediante String.fromCharCode().

function iniciar()
{
   var boton = document.getElementById( "botonConvertir" );
   boton.addEventListener( "click", convertirCodigoACaracter, false );
} // fin de la función iniciar

function convertirCodigoACaracter()
{
   var campoCodigo = document.getElementById( "codigoInput" );
   var campoCaracter = document.getElementById( "caracterObtenido" );
   var campoHex = document.getElementById( "notacionHex" );
   var divError = document.getElementById( "mensajeError" );

   // Limpiar campos de salida
   campoCaracter.value = "";
   campoHex.value = "";
   divError.innerHTML = "";

   var codigo = parseInt( campoCodigo.value, 10 );

   // Validar que la entrada sea un entero válido dentro del rango
   if ( isNaN( codigo ) || codigo < 0 || codigo > 65535 )
   {
      divError.innerHTML = "Por favor, introduzca un valor entero válido entre 0 y 65535.";
      return;
   }

   // Convertir el código numérico a carácter con String.fromCharCode
   var caracter = String.fromCharCode( codigo );

   // Representación hexadecimal de 4 dígitos (ej. U+0041)
   var hex = codigo.toString( 16 ).toUpperCase();
   while ( hex.length < 4 )
   {
      hex = "0" + hex;
   }

   // Asignar salidas
   campoCaracter.value = caracter;
   campoHex.value = "Decimal: " + codigo + " | Unicode: U+" + hex;
} // fin de la función convertirCodigoACaracter

window.addEventListener( "load", iniciar, false );

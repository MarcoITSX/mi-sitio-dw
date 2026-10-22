// Ejercicio 11.25: MontoEnPalabras.js
// Convierte un monto numérico decimal a su representación formal en letras (ej. 112.43 -> CIENTO DOCE CON 43/100).

function iniciar()
{
   var boton = document.getElementById( "botonConvertir" );
   boton.addEventListener( "click", procesarMonto, false );
} // fin de la función iniciar

function procesarMonto()
{
   var campoInput = document.getElementById( "montoInput" );
   var campoSalida = document.getElementById( "montoEnPalabras" );
   var divError = document.getElementById( "mensajeError" );

   // Limpiar salidas
   campoSalida.value = "";
   divError.innerHTML = "";

   var valor = parseFloat( campoInput.value );

   if ( isNaN( valor ) || valor < 0 )
   {
      divError.innerHTML = "Por favor, introduzca un monto numérico positivo válido.";
      return;
   }

   if ( valor >= 1000000 )
   {
      divError.innerHTML = "El algoritmo admite montos menores a $1,000,000.00.";
      return;
   }

   // Separar parte entera y parte decimal (centavos)
   var parteEntera = Math.floor( valor );
   var parteDecimal = Math.round( ( valor - parteEntera ) * 100 );

   // Formatear los centavos a dos dígitos (ej. 5 -> "05")
   var textoCentavos = ( parteDecimal < 10 ? "0" : "" ) + parteDecimal;

   // Convertir la cantidad entera a palabras
   var textoEntero = convertirEnteroAPalabras( parteEntera );

   // Formato final estándar de impresión de cheque: "TEXTO ENTERO CON XX/100"
   campoSalida.value = textoEntero + " CON " + textoCentavos + "/100";
} // fin de la función procesarMonto

// Convierte un entero entre 0 y 999,999 a palabras en español
function convertirEnteroAPalabras( numero )
{
   if ( numero === 0 )
   {
      return "CERO";
   }

   var unidades = [ "", "UN", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE" ];
   var especiales10 = [ "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISÉIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE" ];
   var decenas = [ "", "", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA" ];
   var centenas = [ "", "CIENTO", "DOSCIENTOS", "TRESCIENTOS", "CUATROCIENTOS", "QUINIENTOS", "SEISCIENTOS", "SETECIENTOS", "OCHOCIENTOS", "NOVECIENTOS" ];

   function convertirDecenas( n )
   {
      if ( n < 10 ) return unidades[ n ];
      if ( n >= 10 && n <= 19 ) return especiales10[ n - 10 ];
      if ( n >= 20 && n <= 29 )
      {
         if ( n === 20 ) return "VEINTE";
         var u = n % 10;
         if ( u === 1 ) return "VEINTIÚN";
         if ( u === 2 ) return "VEINTIDÓS";
         if ( u === 3 ) return "VEINTITRÉS";
         if ( u === 6 ) return "VEINTISÉIS";
         return "VEINTI" + unidades[ u ];
      }

      var d = Math.floor( n / 10 );
      var u = n % 10;
      if ( u === 0 ) return decenas[ d ];
      if ( u === 1 ) return decenas[ d ] + " Y UN";
      return decenas[ d ] + " Y " + unidades[ u ];
   }

   function convertirCentenas( n )
   {
      if ( n === 100 ) return "CIEN";
      var c = Math.floor( n / 100 );
      var resto = n % 100;
      var textoC = centenas[ c ];

      if ( resto === 0 ) return textoC;
      return ( textoC ? textoC + " " : "" ) + convertirDecenas( resto );
   }

   if ( numero < 1000 )
   {
      return convertirCentenas( numero );
   }
   else
   {
      var miles = Math.floor( numero / 1000 );
      var restoMiles = numero % 1000;
      var textoMiles = ( miles === 1 ) ? "UN MIL" : convertirCentenas( miles ) + " MIL";

      if ( restoMiles === 0 ) return textoMiles;
      return textoMiles + " " + convertirCentenas( restoMiles );
   }
} // fin de la función convertirEnteroAPalabras

window.addEventListener( "load", iniciar, false );

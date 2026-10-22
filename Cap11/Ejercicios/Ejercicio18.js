// Ejercicio 11.18: GenerarCaracteresASCII.js
// Genera todos los códigos de tres dígitos en el rango de 000 a 255 y muestra los caracteres correspondientes mediante String.fromCharCode().

function iniciar()
{
   var boton = document.getElementById( "botonGenerar" );
   boton.addEventListener( "click", generarTablaCaracteres, false );
} // fin de la función iniciar

function generarTablaCaracteres()
{
   var areaSalida = document.getElementById( "salida" );
   var texto = "===========================================\n";
   texto += " TABLA DE CARACTERES UNICODE/ASCII (000-255)\n";
   texto += "===========================================\n";
   texto += " Código\t\tCarácter\n";
   texto += "-------------------------------------------\n";

   for ( var i = 0; i <= 255; ++i )
   {
      // Formatear el código a tres dígitos con ceros a la izquierda (ej. 000, 001, ..., 065)
      var codigoFormateado = i.toString();
      while ( codigoFormateado.length < 3 )
      {
         codigoFormateado = "0" + codigoFormateado;
      }

      // Obtener el carácter correspondiente mediante String.fromCharCode
      var caracter = String.fromCharCode( i );

      // Identificar caracteres de control o no imprimibles para evitar alterar la maquetación del textarea
      var representacion = "";
      if ( i >= 0 && i <= 31 )
      {
         representacion = "[Carácter de control no imprimible]";
      }
      else if ( i === 32 )
      {
         representacion = "[Espacio en blanco]";
      }
      else if ( i === 127 )
      {
         representacion = "[DEL - Suprimir]";
      }
      else if ( i >= 128 && i <= 159 )
      {
         representacion = "[Control C1 / Extensión no imprimible]";
      }
      else
      {
         representacion = "'" + caracter + "'";
      }

      texto += "  " + codigoFormateado + "\t\t  " + representacion + "\n";
   }

   areaSalida.value = texto;
} // fin de la función generarTablaCaracteres

window.addEventListener( "load", iniciar, false );

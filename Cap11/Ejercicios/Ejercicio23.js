// Ejercicio 11.23
// Implementación de las tres técnicas de análisis de texto descritas en la sección especial.

function iniciar()
{
   var boton = document.getElementById( "botonAnalizar" );
   boton.addEventListener( "click", ejecutarAnalisis, false );
} // fin de la función iniciar

function ejecutarAnalisis()
{
   var texto = document.getElementById( "textoInput" ).value;

   if ( texto.trim() === "" )
   {
      alert( "Por favor, introduzca un texto válido para analizar." );
      return;
   }

   // Ejecución de las tres partes del ejercicio
   analizarParteA( texto );
   analizarParteB( texto );
   analizarParteC( texto );
} // fin de la función ejecutarAnalisis


// ----------------------------------------------------------------------------
// PARTE A: Número de ocurrencias de cada letra del alfabeto
// ----------------------------------------------------------------------------
function analizarParteA( texto )
{
   var area = document.getElementById( "salidaParteA" );
   var textoMin = texto.toLowerCase();
   var alfabeto = "abcdefghijklmnopqrstuvwxyz";
   var contadores = new Array( 26 );

   for ( var i = 0; i < contadores.length; ++i )
   {
      contadores[ i ] = 0;
   }

   // Contar apariciones de cada letra con indexOf
   for ( var i = 0; i < alfabeto.length; ++i )
   {
      var letra = alfabeto.charAt( i );
      var pos = textoMin.indexOf( letra, 0 );

      while ( pos !== -1 )
      {
         ++contadores[ i ];
         pos = textoMin.indexOf( letra, pos + 1 );
      }
   }

   var reporte = "=======================================================================\n";
   reporte += " PARTE A: OCURRENCIAS DE CADA LETRA DEL ALFABETO\n";
   reporte += "=======================================================================\n";

   var lineaLetras = "";
   for ( var k = 0; k < alfabeto.length; ++k )
   {
      var letraMayus = alfabeto.charAt( k ).toUpperCase();
      var cant = contadores[ k ];
      lineaLetras += letraMayus + ": " + cant + ( cant === 0 ? " (ninguna)" : "" ) + "\t";

      if ( ( k + 1 ) % 4 === 0 )
      {
         lineaLetras += "\n";
      }
   }

   reporte += lineaLetras;
   area.value = reporte;
} // fin de la función analizarParteA


// ----------------------------------------------------------------------------
// PARTE B: Tabla de frecuencia por longitud de palabra (1, 2, 3, ... letras)
// ----------------------------------------------------------------------------
function analizarParteB( texto )
{
   var area = document.getElementById( "salidaParteB" );

   // Extraer palabras limpiando signos de puntuación y espacios
   var palabras = extraerPalabrasLimpias( texto );
   var conteoLongitudes = {};
   var maxLongitud = 0;

   for ( var i = 0; i < palabras.length; ++i )
   {
      var len = palabras[ i ].length;
      if ( len > 0 )
      {
         conteoLongitudes[ len ] = ( conteoLongitudes[ len ] || 0 ) + 1;
         if ( len > maxLongitud )
         {
            maxLongitud = len;
         }
      }
   }

   var reporte = "=======================================================================\n";
   reporte += " PARTE B: OCURRENCIAS POR LONGITUD DE PALABRA\n";
   reporte += "=======================================================================\n";
   reporte += "Longitud de palabra\t\tOcurrencias\n";
   reporte += "-----------------------------------------------------------------------\n";

   for ( var len = 1; len <= maxLongitud; ++len )
   {
      var ocurrencias = conteoLongitudes[ len ] || 0;
      reporte += "  " + len + "\t\t\t\t  " + ocurrencias + "\n";
   }

   area.value = reporte;
} // fin de la función analizarParteB


// ----------------------------------------------------------------------------
// PARTE C: Frecuencia de cada palabra distinta (aparición y alfabético)
// ----------------------------------------------------------------------------
function analizarParteC( texto )
{
   var area = document.getElementById( "salidaParteC" );
   var palabras = extraerPalabrasLimpias( texto );

   var listaOrdenAparicion = [];
   var mapaFrecuencias = {};

   for ( var i = 0; i < palabras.length; ++i )
   {
      var p = palabras[ i ].toLowerCase();
      if ( p.length === 0 ) continue;

      if ( !mapaFrecuencias[ p ] )
      {
         mapaFrecuencias[ p ] = 1;
         listaOrdenAparicion.push( p );
      }
      else
      {
         mapaFrecuencias[ p ]++;
      }
   }

   var reporte = "=======================================================================\n";
   reporte += " PARTE C: OCURRENCIAS DE PALABRAS DISTINTAS\n";
   reporte += "=======================================================================\n\n";

   // 1. Mostrar en orden de primera aparición
   reporte += "--- 1. Orden de primera aparición en el texto ---\n";
   reporte += "Palabra\t\t\tOcurrencias\n";
   reporte += "---------------------------------------------------\n";
   for ( var j = 0; j < listaOrdenAparicion.length; ++j )
   {
      var palabra = listaOrdenAparicion[ j ];
      var tab = palabra.length < 8 ? "\t\t\t" : ( palabra.length < 16 ? "\t\t" : "\t" );
      reporte += "\"" + palabra + "\"" + tab + mapaFrecuencias[ palabra ] + "\n";
   }

   // 2. Mostrar en orden alfabético
   var listaAlfabetica = listaOrdenAparicion.slice( 0 ).sort();
   reporte += "\n--- 2. Lista organizada en orden alfabético ---\n";
   reporte += "Palabra\t\t\tOcurrencias\n";
   reporte += "---------------------------------------------------\n";
   for ( var k = 0; k < listaAlfabetica.length; ++k )
   {
      var palabra = listaAlfabetica[ k ];
      var tab = palabra.length < 8 ? "\t\t\t" : ( palabra.length < 16 ? "\t\t" : "\t" );
      reporte += "\"" + palabra + "\"" + tab + mapaFrecuencias[ palabra ] + "\n";
   }

   area.value = reporte;
} // fin de la función analizarParteC


// Función auxiliar para extraer palabras eliminando signos de puntuación
function extraerPalabrasLimpias( texto )
{
   // Reemplazar saltos de línea y signos de puntuación comunes por espacios
   var textoLimpio = texto.replace( /[.,;:¿?¡!()"'\-\n\r]/g, " " );
   var tokens = textoLimpio.trim().split( /\s+/ );
   var palabras = [];

   for ( var i = 0; i < tokens.length; ++i )
   {
      if ( tokens[ i ] !== "" )
      {
         palabras.push( tokens[ i ] );
      }
   }

   return palabras;
} // fin de la función extraerPalabrasLimpias

window.addEventListener( "load", iniciar, false );

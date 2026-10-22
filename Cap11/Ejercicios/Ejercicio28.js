// Ejercicio 11.28
// Proyecto: Generador automático de crucigramas con diccionario de palabras y matriz bidimensional.

// Diccionario computarizado de palabras y sus pistas
var diccionarioGeneral = [
   { palabra: "JAVASCRIPT", pista: "Lenguaje de programación orientado a objetos para la Web." },
   { palabra: "STRING", pista: "Objeto de cadenas de caracteres en JavaScript." },
   { palabra: "CADENA", pista: "Secuencia de caracteres agrupados." },
   { palabra: "MATRIZ", pista: "Estructura de datos bidimensional o arreglo de arreglos." },
   { palabra: "INDICE", pista: "Posición numérica de un elemento en un arreglo o cadena." },
   { palabra: "CONSOLA", pista: "Objeto utilizado para depurar e imprimir mensajes en el navegador." },
   { palabra: "OBJETO", pista: "Entidad que posee atributos y comportamientos (métodos)." },
   { palabra: "EVENTO", pista: "Acción detectada por el navegador como 'click' o 'load'." },
   { palabra: "CODIGO", pista: "Conjunto de instrucciones escritas en un lenguaje de programación." },
   { palabra: "METODO", pista: "Función asociada a un objeto." },
   { palabra: "BOOLEANO", pista: "Tipo de dato que representa true o false." },
   { palabra: "PROMPT", pista: "Cuadro de diálogo de entrada para solicitar cadenas al usuario." }
];

var FILAS = 10;
var COLUMNAS = 10;
var matrizTablero = [];
var palabrasColocadas = [];
var mostrandoSolucion = false;

function iniciar()
{
   document.getElementById( "botonGenerar" ).addEventListener( "click", construirCrucigrama, false );
   document.getElementById( "botonVerificar" ).addEventListener( "click", verificarRespuestas, false );
   document.getElementById( "botonSolucion" ).addEventListener( "click", alternarSolucion, false );

   construirCrucigrama();
} // fin de la función iniciar

// Genera y construye un nuevo crucigrama seleccionando e intersecando palabras del diccionario
function construirCrucigrama()
{
   mostrandoSolucion = false;
   document.getElementById( "resultados" ).innerHTML = "";

   // 1. Inicializar matriz de 10x10 vacía
   matrizTablero = [];
   for ( var r = 0; r < FILAS; ++r )
   {
      var fila = [];
      for ( var c = 0; c < COLUMNAS; ++c )
      {
         fila.push( { letra: "", numero: 0, esActiva: false } );
      }
      matrizTablero.push( fila );
   }

   palabrasColocadas = [];

   // Meclar aleatoriamente una copia del diccionario
   var diccionarioMezclado = diccionarioGeneral.slice(0).sort( function() {
      return 0.5 - Math.random();
   } );

   // 2. Colocar la primera palabra horizontalmente cerca del centro
   var primera = diccionarioMezclado[ 0 ];
   var filaIni = 4;
   var colIni = Math.max( 0, Math.floor( ( COLUMNAS - primera.palabra.length ) / 2 ) );

   if ( colocarPalabra( primera.palabra, primera.pista, filaIni, colIni, "H" ) )
   {
      // 3. Intentar cruzar las siguientes palabras del diccionario
      for ( var i = 1; i < diccionarioMezclado.length; ++i )
      {
         var item = diccionarioMezclado[ i ];
         intentarCruzarPalabra( item.palabra, item.pista );
      }
   }

   // 4. Numerar celdas iniciales de las palabras colocadas
   asignarNumeracionCeldas();

   // 5. Renderizar el HTML de la cuadrícula y las pistas
   dibujarTableroHTML();
   dibujarPistasHTML();
} // fin de la función construirCrucigrama

// Intenta colocar una palabra buscando intersecciones con letras existentes en el tablero
function intentarCruzarPalabra( palabra, pista )
{
   for ( var r = 0; r < FILAS; ++r )
   {
      for ( var c = 0; c < COLUMNAS; ++c )
      {
         var celdaActual = matrizTablero[ r ][ c ];
         if ( celdaActual.esActiva )
         {
            // Buscar si la letra coincide con alguna posición dentro de la nueva palabra
            for ( var k = 0; k < palabra.length; ++k )
            {
               if ( palabra.charAt( k ) === celdaActual.letra )
               {
                  // Probar orientación Vertical
                  var rInicioV = r - k;
                  var cInicioV = c;
                  if ( validarColocacion( palabra, rInicioV, cInicioV, "V" ) )
                  {
                     colocarPalabra( palabra, pista, rInicioV, cInicioV, "V" );
                     return true;
                  }

                  // Probar orientación Horizontal
                  var rInicioH = r;
                  var cInicioH = c - k;
                  if ( validarColocacion( palabra, rInicioH, cInicioH, "H" ) )
                  {
                     colocarPalabra( palabra, pista, rInicioH, cInicioH, "H" );
                     return true;
                  }
               }
            }
         }
      }
   }
   return false;
} // fin de la función intentarCruzarPalabra

// Valida los límites y evita colisiones adyacentes inválidas
function validarColocacion( palabra, fila, col, orientacion )
{
   var len = palabra.length;

   if ( orientacion === "H" )
   {
      if ( col < 0 || col + len > COLUMNAS || fila < 0 || fila >= FILAS ) return false;

      // Verificar casilla anterior y posterior
      if ( col > 0 && matrizTablero[ fila ][ col - 1 ].esActiva ) return false;
      if ( col + len < COLUMNAS && matrizTablero[ fila ][ col + len ].esActiva ) return false;

      for ( var i = 0; i < len; ++i )
      {
         var celda = matrizTablero[ fila ][ col + i ];
         if ( celda.esActiva && celda.letra !== palabra.charAt( i ) ) return false;

         // Evitar adyacencia lateral si la casilla no es una intersección
         if ( !celda.esActiva )
         {
            if ( fila > 0 && matrizTablero[ fila - 1 ][ col + i ].esActiva ) return false;
            if ( fila < FILAS - 1 && matrizTablero[ fila + 1 ][ col + i ].esActiva ) return false;
         }
      }
   }
   else if ( orientacion === "V" )
   {
      if ( fila < 0 || fila + len > FILAS || col < 0 || col >= COLUMNAS ) return false;

      // Verificar casilla superior e inferior
      if ( fila > 0 && matrizTablero[ fila - 1 ][ col ].esActiva ) return false;
      if ( fila + len < FILAS && matrizTablero[ fila + len ][ col ].esActiva ) return false;

      for ( var j = 0; j < len; ++j )
      {
         var celdaV = matrizTablero[ fila + j ][ col ];
         if ( celdaV.esActiva && celdaV.letra !== palabra.charAt( j ) ) return false;

         if ( !celdaV.esActiva )
         {
            if ( col > 0 && matrizTablero[ fila + j ][ col - 1 ].esActiva ) return false;
            if ( col < COLUMNAS - 1 && matrizTablero[ fila + j ][ col + 1 ].esActiva ) return false;
         }
      }
   }

   return true;
} // fin de la función validarColocacion

// Escribe los caracteres de la palabra en la matriz del tablero
function colocarPalabra( palabra, pista, fila, col, orientacion )
{
   if ( !validarColocacion( palabra, fila, col, orientacion ) ) return false;

   for ( var i = 0; i < palabra.length; ++i )
   {
      var r = ( orientacion === "H" ) ? fila : fila + i;
      var c = ( orientacion === "H" ) ? col + i : col;

      matrizTablero[ r ][ c ].letra = palabra.charAt( i );
      matrizTablero[ r ][ c ].esActiva = true;
   }

   palabrasColocadas.push( {
      palabra: palabra,
      pista: pista,
      fila: fila,
      col: col,
      orientacion: orientacion,
      numero: 0
   } );

   return true;
} // fin de la función colocarPalabra

// Asigna números correlativos a las celdas de origen de cada palabra
function asignarNumeracionCeldas()
{
   var contadorNumero = 1;

   // Ordenar palabras por posición de fila y columna
   palabrasColocadas.sort( function( a, b ) {
      if ( a.fila === b.fila ) return a.col - b.col;
      return a.fila - b.fila;
   } );

   for ( var i = 0; i < palabrasColocadas.length; ++i )
   {
      var p = palabrasColocadas[ i ];
      var celdaOrigen = matrizTablero[ p.fila ][ p.col ];

      if ( celdaOrigen.numero === 0 )
      {
         celdaOrigen.numero = contadorNumero;
         p.numero = contadorNumero;
         ++contadorNumero;
      }
      else
      {
         p.numero = celdaOrigen.numero;
      }
   }
} // fin de la función asignarNumeracionCeldas

// Dibuja la cuadrícula HTML en base a la matriz del tablero
function dibujarTableroHTML()
{
   var divTablero = document.getElementById( "tableroCrucigrama" );
   var html = "<table class='crucigrama'>";

   for ( var r = 0; r < FILAS; ++r )
   {
      html += "<tr>";
      for ( var c = 0; c < COLUMNAS; ++c )
      {
         var celda = matrizTablero[ r ][ c ];

         if ( celda.esActiva )
         {
            html += "<td class='activa'>";
            if ( celda.numero > 0 )
            {
               html += "<span class='numero-celda'>" + celda.numero + "</span>";
            }
            html += "<input type='text' id='celda_" + r + "_" + c + "' maxlength='1' autocomplete='off'>";
            html += "</td>";
         }
         else
         {
            html += "<td></td>";
         }
      }
      html += "</tr>";
   }

   html += "</table>";
   divTablero.innerHTML = html;
} // fin de la función dibujarTableroHTML

// Despliega las listas de pistas Horizontales y Verticales
function dibujarPistasHTML()
{
   var ulH = document.getElementById( "pistasHorizontales" );
   var ulV = document.getElementById( "pistasVerticales" );

   ulH.innerHTML = "";
   ulV.innerHTML = "";

   for ( var i = 0; i < palabrasColocadas.length; ++i )
   {
      var item = palabrasColocadas[ i ];
      var li = "<li><strong>" + item.numero + ".</strong> " + item.pista + " (" + item.palabra.length + " letras)</li>";

      if ( item.orientacion === "H" )
      {
         ulH.innerHTML += li;
      }
      else
      {
         ulV.innerHTML += li;
      }
   }
} // fin de la función dibujarPistasHTML

// Muestra u oculta la solución completa en las celdas
function alternarSolucion()
{
   mostrandoSolucion = !mostrandoSolucion;

   for ( var r = 0; r < FILAS; ++r )
   {
      for ( var c = 0; c < COLUMNAS; ++c )
      {
         var celda = matrizTablero[ r ][ c ];
         if ( celda.esActiva )
         {
            var input = document.getElementById( "celda_" + r + "_" + c );
            if ( input )
            {
               input.value = mostrandoSolucion ? celda.letra : "";
            }
         }
      }
   }
} // fin de la función alternarSolucion

// Compara los caracteres ingresados por el usuario contra la matriz solución
function verificarRespuestas()
{
   var correctas = 0;
   var totalCeldas = 0;

   for ( var r = 0; r < FILAS; ++r )
   {
      for ( var c = 0; c < COLUMNAS; ++c )
      {
         var celda = matrizTablero[ r ][ c ];
         if ( celda.esActiva )
         {
            ++totalCeldas;
            var input = document.getElementById( "celda_" + r + "_" + c );
            if ( input && input.value.trim().toUpperCase() === celda.letra )
            {
               ++correctas;
               input.style.color = "green";
            }
            else if ( input && input.value.trim() !== "" )
            {
               input.style.color = "red";
            }
         }
      }
   }

   var divResultados = document.getElementById( "resultados" );
   var porcentaje = Math.round( ( correctas / totalCeldas ) * 100 );

   if ( correctas === totalCeldas )
   {
      divResultados.innerHTML = "<p style='color: green; font-weight: bold; font-size: 1.1em;'>¡Felicidades! Ha completado el crucigrama correctamente (100%).</p>";
   }
   else
   {
      divResultados.innerHTML = "<p style='color: #d35400; font-weight: bold;'>Progreso: " + correctas + " de " + totalCeldas + " letras correctas (" + porcentaje + "%).</p>";
   }
} // fin de la función verificarRespuestas

window.addEventListener( "load", iniciar, false );

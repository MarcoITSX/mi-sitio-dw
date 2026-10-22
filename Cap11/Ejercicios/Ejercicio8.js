// Ejercicio 11.8: Quintillas.js
// Genera quintillas al azar asegurando el esquema de rima AABBA.

// Bancos de palabras organizadas por familias de rima (Grupo A)
var rimasA = [
   [ "pato", "gato", "zapato", "retrato", "trato" ],
   [ "castillo", "brillo", "grillo", "martillo", "bolsillo" ],
   [ "demonio", "patrimonio", "matrimonio", "macedonio", "manicomio" ],
   [ "viento", "aliento", "momento", "pensamiento", "cuento" ]
];

// Bancos de palabras organizadas por familias de rima (Grupo B)
var rimasB = [
   [ "sol", "caracol", "girasol", "farol" ],
   [ "mar", "cantar", "volar", "soñar" ],
   [ "río", "frío", "desafío", "navío" ],
   [ "flor", "amor", "sabor", "calor" ]
];

// Plantillas de versos para estructurar la composición
var plantillasLinea1 = [
   "Había una vez un famoso ",
   "Conozco la historia de un ",
   "Cierto día se vio a un ",
   "Caminaba contento un "
];

var plantillasLinea2 = [
   "que llevaba en la mano un ",
   "que buscaba con prisa un ",
   "que jugaba feliz con un ",
   "que guardaba celoso un "
];

var plantillasLinea3 = [
   "Salió corriendo al ",
   "Miró fijamente al ",
   "Nadó sin temor por el ",
   "Bailó alegre bajo el "
];

var plantillasLinea4 = [
   "sin dejar de ",
   "empezó a ",
   "para luego ",
   "sin parar de "
];

var plantillasLinea5 = [
   "y todo terminó con un bello ",
   "y al final tropezó con un viejo ",
   "mientras sonreía junto a un ",
   "y quedó dibujado en un lindo "
];

// Selecciona un elemento aleatorio de un arreglo
function obtenerAleatorio( arreglo )
{
   var indice = Math.floor( Math.random() * arreglo.length );
   return arreglo[ indice ];
} // fin de la función obtenerAleatorio

// Selecciona N elementos aleatorios sin repetir del mismo grupo de rima
function obtenerSubconjuntoSinRepetir( arreglo, cantidad )
{
   var copia = arreglo.slice( 0 );
   var seleccionados = [];

   for ( var i = 0; i < cantidad; ++i )
   {
      var idx = Math.floor( Math.random() * copia.length );
      seleccionados.push( copia[ idx ] );
      copia.splice( idx, 1 ); // Extrae el elemento para no repetirlo en el mismo verso
   }

   return seleccionados;
} // fin de la función obtenerSubconjuntoSinRepetir

// Construye una quintilla con métrica y rima AABBA
function generarQuintilla()
{
   // Seleccionar una familia de rima para A (requiere 3 palabras distintas: A1, A2, A3)
   var grupoA = obtenerAleatorio( rimasA );
   var palabrasA = obtenerSubconjuntoSinRepetir( grupoA, 3 );

   // Seleccionar una familia de rima para B (requiere 2 palabras distintas: B1, B2)
   var grupoB = obtenerAleatorio( rimasB );
   var palabrasB = obtenerSubconjuntoSinRepetir( grupoB, 2 );

   // Ensamblar la estructura AABBA
   var verso1 = obtenerAleatorio( plantillasLinea1 ) + palabrasA[ 0 ] + ",";
   var verso2 = obtenerAleatorio( plantillasLinea2 ) + palabrasA[ 1 ] + ".";
   var verso3 = obtenerAleatorio( plantillasLinea3 ) + palabrasB[ 0 ] + ",";
   var verso4 = obtenerAleatorio( plantillasLinea4 ) + palabrasB[ 1 ] + ",";
   var verso5 = obtenerAleatorio( plantillasLinea5 ) + palabrasA[ 2 ] + ".";

   return verso1 + "\n" + verso2 + "\n" + verso3 + "\n" + verso4 + "\n" + verso5;
} // fin de la función generarQuintilla

function mostrarUnaQuintilla()
{
   document.getElementById( "salida" ).value = generarQuintilla();
} // fin de la función mostrarUnaQuintilla

function mostrarCincoQuintillas()
{
   var texto = "";
   for ( var i = 1; i <= 5; ++i )
   {
      texto += "--- QUINTILLA " + i + " ---\n";
      texto += generarQuintilla() + "\n\n";
   }
   document.getElementById( "salida" ).value = texto.trim();
} // fin de la función mostrarCincoQuintillas

function iniciar()
{
   var btn1 = document.getElementById( "botonGenerar" );
   var btn2 = document.getElementById( "botonGenerarVarias" );

   btn1.addEventListener( "click", mostrarUnaQuintilla, false );
   btn2.addEventListener( "click", mostrarCincoQuintillas, false );
} // fin de la función iniciar

window.addEventListener( "load", iniciar, false );
// Ejercicio 11.27
// Implementación de una herramienta de corrección ortográfica basada en el diccionario listaDePalabras.

// Arreglo global de palabras en el diccionario
var listaDePalabras = [
   "predeterminado",
   "javascript",
   "programacion",
   "computadora",
   "desarrollo",
   "algoritmo",
   "internet",
   "diccionario",
   "ejercicio",
   "subcadena",
   "palabra",
   "correcto",
   "lenguaje",
   "funciones",
   "estructura",
   "arreglo",
   "objeto",
   "consola",
   "html",
   "estilo"
];

function iniciar()
{
   document.getElementById( "botonVerificar" ).addEventListener( "click", verificarPalabra, false );
   document.getElementById( "botonAgregar" ).addEventListener( "click", agregarPalabraAlDiccionario, false );

   actualizarVistaDiccionario();
} // fin de la función iniciar

// Muestra las palabras almacenadas actualmente en el diccionario
function actualizarVistaDiccionario()
{
   var area = document.getElementById( "diccionarioTextArea" );
   var copialista = listaDePalabras.slice( 0 ).sort();
   area.value = copialista.join( ", " );
} // fin de la función actualizarVistaDiccionario

// Agrega una nueva palabra al diccionario listaDePalabras
function agregarPalabraAlDiccionario()
{
   var input = document.getElementById( "nuevaPalabraInput" );
   var palabra = input.value.trim().toLowerCase();

   if ( palabra.length === 0 )
   {
      alert( "Por favor, introduzca una palabra válida." );
      return;
   }

   if ( listaDePalabras.indexOf( palabra ) !== -1 )
   {
      alert( "La palabra '" + palabra + "' ya existe en el diccionario." );
   }
   else
   {
      listaDePalabras.push( palabra );
      actualizarVistaDiccionario();
      input.value = "";
      alert( "La palabra '" + palabra + "' fue agregada exitosamente a listaDePalabras." );
   }
} // fin de la función agregarPalabraAlDiccionario

// Procesa la verificación de ortografía
function verificarPalabra()
{
   var campoInput = document.getElementById( "palabraInput" );
   var divResultados = document.getElementById( "resultados" );

   var palabraOriginal = campoInput.value.trim();

   if ( palabraOriginal.length === 0 )
   {
      divResultados.innerHTML = "<p style='color: red;'>Por favor, introduzca una palabra para verificar.</p>";
      return;
   }

   // Limpiar signos de puntuación e igualar a minúsculas
   var palabraLimpia = palabraOriginal.toLowerCase().replace( /[^a-záéíóúñ]/g, "" );

   // 1. Comprobación directa en el diccionario
   if ( listaDePalabras.indexOf( palabraLimpia ) !== -1 )
   {
      divResultados.innerHTML = "<div style='background-color: #d4edda; color: #155724; padding: 12px; border-radius: 5px; font-size: 1.1em;'>" +
         "<strong>✓ La palabra está escrita correctamente.</strong>" +
         "</div>";
      return;
   }

   // 2. Si no se encuentra, buscar sugerencias
   var sugerencias = buscarSugerencias( palabraLimpia );

   var mensaje = "<div style='background-color: #f8d7da; color: #721c24; padding: 12px; border-radius: 5px; font-size: 1.1em;'>" +
      "<strong>✗ La palabra no está escrita correctamente.</strong><br>";

   if ( sugerencias.length > 0 )
   {
      mensaje += "<div style='margin-top: 8px; color: #0c5460;'>";
      for ( var i = 0; i < sugerencias.length; ++i )
      {
         mensaje += "¿Quiso decir <strong>\"" + sugerencias[ i ] + "\"</strong>?<br>";
      }
      mensaje += "</div>";
   }
   else
   {
      mensaje += "<span style='font-size: 0.9em;'>No se encontraron sugerencias cercanas en el diccionario.</span>";
   }

   mensaje += "</div>";
   divResultados.innerHTML = mensaje;
} // fin de la función verificarPalabra

// Algoritmo de búsqueda de sugerencias (Transposiciones y reducción de dobles letras)
function buscarSugerencias( palabra )
{
   var sugerencias = [];

   // --- Prueba 1: Transposición de letras adyacentes (ej. "perdeterminado" -> "predeterminado") ---
   for ( var i = 0; i < palabra.length - 1; ++i )
   {
      var letras = palabra.split( "" );
      // Intercambiar posición i e i+1
      var temp = letras[ i ];
      letras[ i ] = letras[ i + 1 ];
      letras[ i + 1 ] = temp;

      var candidato = letras.join( "" );

      if ( listaDePalabras.indexOf( candidato ) !== -1 && sugerencias.indexOf( candidato ) === -1 )
      {
         sugerencias.push( candidato );
      }
   }

   // --- Prueba 2: Reemplazo de letras dobles por una sola letra (ej. "corrrecto" -> "correcto") ---
   for ( var j = 0; j < palabra.length - 1; ++j )
   {
      if ( palabra.charAt( j ) === palabra.charAt( j + 1 ) )
      {
         var candidatoDoble = palabra.substring( 0, j ) + palabra.substring( j + 1 );

         if ( listaDePalabras.indexOf( candidatoDoble ) !== -1 && sugerencias.indexOf( candidatoDoble ) === -1 )
         {
            sugerencias.push( candidatoDoble );
         }
      }
   }

   // --- Prueba 3: Sustitución de un solo carácter ---
   var abecedario = "abcdefghijklmnopqrstuvwxyz";
   for ( var k = 0; k < palabra.length; ++k )
   {
      for ( var m = 0; m < abecedario.length; ++m )
      {
         var caracterNuevo = abecedario.charAt( m );
         if ( caracterNuevo !== palabra.charAt( k ) )
         {
            var candidatoSust = palabra.substring( 0, k ) + caracterNuevo + palabra.substring( k + 1 );
            if ( listaDePalabras.indexOf( candidatoSust ) !== -1 && sugerencias.indexOf( candidatoSust ) === -1 )
            {
               sugerencias.push( candidatoSust );
            }
         }
      }
   }

   return sugerencias;
} // fin de la función buscarSugerencias

window.addEventListener( "load", iniciar, false );

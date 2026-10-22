// Ejercicio 10.15
// Simulación de los gráficos de tortuga (Logo) utilizando un arreglo bidimensional de 20x20.

// Estado global de la tortuga y del tablero
var piso;            // Arreglo de 20x20
var filaActual;      // Posición de la fila (0 a 19)
var colActual;       // Posición de la columna (0 a 19)
var plumaAbajo;      // boolean: true = pluma abajo (escribe), false = pluma arriba
var direccion;       // 0 = Derecha, 1 = Abajo, 2 = Izquierda, 3 = Arriba

function iniciar()
{
   var boton = document.getElementById( "botonEjecutar" );
   var selector = document.getElementById( "programaSel" );

   boton.addEventListener( "click", procesarEntradaUsuario, false );
   selector.addEventListener( "change", cargarProgramaPredefinido, false );
} // fin de la función iniciar

// Reinicia la tortuga y el tablero a su estado inicial
function reiniciarLienzo()
{
   piso = new Array( 20 );
   for ( var i = 0; i < 20; ++i )
   {
      piso[ i ] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
   }

   filaActual = 0;
   colActual = 0;
   plumaAbajo = false;
   direccion = 0; // Inicia mirando a la derecha
} // fin de la función reiniciarLienzo

// Carga secuencias predefinidas de comandos en el campo de texto
function cargarProgramaPredefinido()
{
   var opcion = document.getElementById( "programaSel" ).value;
   var campo = document.getElementById( "comandosTexto" );

   if ( opcion === "cuadrado" )
   {
      campo.value = "2, 5,12, 3, 5,12, 3, 5,12, 3, 5,12, 1, 6, 9";
   }
   else if ( opcion === "espiral" )
   {
      campo.value = "2, 5,18, 3, 5,18, 3, 5,16, 3, 5,16, 3, 5,14, 3, 5,14, 3, 5,12, 3, 5,12, 1, 6, 9";
   }
   else if ( opcion === "triangulo" )
   {
      campo.value = "2, 5,12, 3, 5,3, 3, 5,3, 3, 5,9, 3, 5,3, 3, 5,3, 1, 6, 9";
   }
} // fin de la función cargarProgramaPredefinido

// Lee los comandos ingresados y los ejecuta paso a paso
function procesarEntradaUsuario()
{
   reiniciarLienzo();

   var texto = document.getElementById( "comandosTexto" ).value;
   var tokens = texto.split( "," );
   var comandos = [];

   // Convertir cadenas a números enteros limpiando espacios
   for ( var i = 0; i < tokens.length; ++i )
   {
      var num = parseInt( tokens[ i ].trim() );
      if ( !isNaN( num ) )
      {
         comandos.push( num );
      }
   }

   ejecutarComandos( comandos );
} // fin de la función procesarEntradaUsuario

// Intérprete principal de comandos de la tortuga
function ejecutarComandos( comandos )
{
   var i = 0;
   var impreso = false;

   while ( i < comandos.length )
   {
      var cmd = comandos[ i ];

      switch ( cmd )
      {
         case 1: // Pluma arriba
            plumaAbajo = false;
            break;

         case 2: // Pluma abajo
            plumaAbajo = true;
            // Marca la casilla inicial cuando se baja la pluma
            piso[ filaActual ][ colActual ] = 1;
            break;

         case 3: // Girar a la derecha (90 grados en sentido horario)
            direccion = ( direccion + 1 ) % 4;
            break;

         case 4: // Girar a la izquierda (90 grados en sentido antihorario)
            direccion = ( direccion + 3 ) % 4;
            break;

         case 5: // Avanzar N pasos
            ++i; // Leer el siguiente valor como cantidad de pasos
            var pasos = comandos[ i ];
            moverTortuga( pasos );
            break;

         case 6: // Imprimir el tablero de 20x20
            imprimirTablero();
            impreso = true;
            break;

         case 9: // Fin de datos
            if ( !impreso )
            {
               imprimirTablero();
            }
            return;
      }

      ++i;
   }
} // fin de la función ejecutarComandos

// Desplaza la tortuga según la dirección actual y la cantidad de pasos
function moverTortuga( pasos )
{
   for ( var p = 0; p < pasos; ++p )
   {
      switch ( direccion )
      {
         case 0: // Derecha
            if ( colActual < 19 ) ++colActual;
            break;
         case 1: // Abajo
            if ( filaActual < 19 ) ++filaActual;
            break;
         case 2: // Izquierda
            if ( colActual > 0 ) --colActual;
            break;
         case 3: // Arriba
            if ( filaActual > 0 ) --filaActual;
            break;
      }

      if ( plumaAbajo )
      {
         piso[ filaActual ][ colActual ] = 1;
      }
   }
} // fin de la función moverTortuga

// Genera la representación visual del lienzo (asteriscos para 1, espacios para 0)
function imprimirTablero()
{
   var resultado = "";

   for ( var f = 0; f < 20; ++f )
   {
      for ( var c = 0; c < 20; ++c )
      {
         if ( piso[ f ][ c ] === 1 )
         {
            resultado += "* ";
         }
         else
         {
            resultado += ". "; // Usamos un punto claro para facilitar la lectura de la cuadrícula
         }
      }
      resultado += "\n";
   }

   document.getElementById( "salida" ).textContent = resultado;
} // fin de la función imprimirTablero

window.addEventListener( "load", iniciar, false );
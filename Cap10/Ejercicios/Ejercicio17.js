// Ejercicio 10.17
// Simulación de la carrera entre la tortuga y la liebre (70 posiciones).

var posTortuga = 1;
var posLiebre = 1;
var tic = 0;

function iniciar()
{
   var boton = document.getElementById( "botonIniciar" );
   boton.addEventListener( "click", simularCarrera, false );
} // fin de la función iniciar

function simularCarrera()
{
   posTortuga = 1;
   posLiebre = 1;
   tic = 0;

   var salida = "¡BANG !!!!!\nY ARRANCAN !!!!!\n\n";

   // La carrera continúa mientras ninguno alcance o supere la posición 70
   while ( posTortuga < 70 && posLiebre < 70 )
   {
      ++tic;
      moverTortuga();
      moverLiebre();
      salida += imprimirLineaPista();
   }

   // Determinar al ganador de la carrera
   salida += "\n" + "=".repeat(70) + "\n";
   if ( posTortuga >= 70 && posLiebre >= 70 )
   {
      salida += "ES UN EMPATE.\n";
   }
   else if ( posTortuga >= 70 )
   {
      salida += "LA TORTUGA GANA!!! ¡YAY!!!\n";
   }
   else
   {
      salida += "La liebre gana. Ni hablar.\n";
   }

   document.getElementById( "pista" ).textContent = salida;
} // fin de la función simularCarrera

// Determina el movimiento de la tortuga según las probabilidades del ejercicio
function moverTortuga()
{
   var i = Math.floor( 1 + Math.random() * 10 ); // Valor aleatorio de 1 a 10

   if ( i >= 1 && i <= 5 ) // 50%: Gran paso (+3)
   {
      posTortuga += 3;
   }
   else if ( i >= 6 && i <= 7 ) // 20%: Resbalón (-6)
   {
      posTortuga -= 6;
   }
   else // 30%: Paso lento (+1)
   {
      posTortuga += 1;
   }

   // Límite inferior: no puede resbalar más allá de la casilla 1
   if ( posTortuga < 1 )
   {
      posTortuga = 1;
   }
} // fin de la función moverTortuga

// Determina el movimiento de la liebre según las probabilidades del ejercicio
function moverLiebre()
{
   var i = Math.floor( 1 + Math.random() * 10 ); // Valor aleatorio de 1 a 10

   if ( i >= 1 && i <= 2 ) // 20%: Duerme (sin movimiento)
   {
      // Queda en la misma posición
   }
   else if ( i >= 3 && i <= 4 ) // 20%: Gran salto (+9)
   {
      posLiebre += 9;
   }
   else if ( i === 5 ) // 10%: Gran resbalón (-12)
   {
      posLiebre -= 12;
   }
   else if ( i >= 6 && i <= 8 ) // 30%: Pequeño salto (+1)
   {
      posLiebre += 1;
   }
   else // 20%: Pequeño resbalón (-2)
   {
      posLiebre -= 2;
   }

   // Límite inferior: no puede resbalar más allá de la casilla 1
   if ( posLiebre < 1 )
   {
      posLiebre = 1;
   }
} // fin de la función moverLiebre

// Genera la representación visual de la pista para el tic actual
function imprimirLineaPista()
{
   var linea = "";

   for ( var pos = 1; pos <= 70; ++pos )
   {
      if ( pos === posTortuga && pos === posLiebre )
      {
         linea += "OUCH!!!";
         pos += 6; // Salta posiciones adicionales para compensar la palabra OUCH!!!
      }
      else if ( pos === posTortuga )
      {
         linea += "T";
      }
      else if ( pos === posLiebre )
      {
         linea += "H";
      }
      else
      {
         linea += ".";
      }
   }

   var ticFormateado = tic < 10 ? "0" + tic : tic;
   return "Tic " + ticFormateado + ": " + linea + "\n";
} // fin de la función imprimirLineaPista

window.addEventListener( "load", iniciar, false );
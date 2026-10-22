// Ejercicio 11.3
// Evalúa las funciones del objeto Math y muestra los resultados formateados en un textarea.

function iniciar()
{
   var boton = document.getElementById( "botonEvaluar" );
   boton.addEventListener( "click", evaluarFuncionesMath, false );
} // fin de la función iniciar

function evaluarFuncionesMath()
{
   var salida = document.getElementById( "salida" );
   var texto = "=======================================================================\n";
   texto += "           EVALUACIÓN DE FUNCIONES DE LA BIBLIOTECA Math               \n";
   texto += "=======================================================================\n\n";

   // 1. Math.abs(x)
   texto += "1. Math.abs(x) - Valor absoluto de x:\n";
   texto += "----------------------------------------\n";
   texto += "x\t\tMath.abs(x)\n";
   var valoresAbs = [ -7.2, -5.6, 0, 4.5, -10 ];
   for ( var i = 0; i < valoresAbs.length; ++i )
   {
      var x = valoresAbs[ i ];
      texto += x + "\t\t" + Math.abs( x ) + "\n";
   }
   texto += "\n";

   // 2. Math.ceil(x)
   texto += "2. Math.ceil(x) - Redondea al entero más pequeño no menor que x:\n";
   texto += "--------------------------------------------------------\n";
   texto += "x\t\tMath.ceil(x)\n";
   var valoresCeil = [ 9.2, -9.8, 0, 4.0, 7.8 ];
   for ( var i = 0; i < valoresCeil.length; ++i )
   {
      var x = valoresCeil[ i ];
      texto += x + "\t\t" + Math.ceil( x ) + "\n";
   }
   texto += "\n";

   // 3. Math.floor(x)
   texto += "3. Math.floor(x) - Redondea al entero más grande no mayor que x:\n";
   texto += "---------------------------------------------------------\n";
   texto += "x\t\tMath.floor(x)\n";
   var valoresFloor = [ 9.2, -9.8, 0, 4.0, 7.8 ];
   for ( var i = 0; i < valoresFloor.length; ++i )
   {
      var x = valoresFloor[ i ];
      texto += x + "\t\t" + Math.floor( x ) + "\n";
   }
   texto += "\n";

   // 4. Math.round(x)
   texto += "4. Math.round(x) - Redondea al entero más cercano:\n";
   texto += "--------------------------------------------------\n";
   texto += "x\t\tMath.round(x)\n";
   var valoresRound = [ 9.75, 9.25, -9.5, -9.2, 0.5 ];
   for ( var i = 0; i < valoresRound.length; ++i )
   {
      var x = valoresRound[ i ];
      texto += x + "\t\t" + Math.round( x ) + "\n";
   }
   texto += "\n";

   // 5. Math.exp(x)
   texto += "5. Math.exp(x) - Exponencial e^x:\n";
   texto += "---------------------------------\n";
   texto += "x\t\tMath.exp(x)\n";
   for ( var x = 0; x <= 4; ++x )
   {
      texto += x + "\t\t" + Math.exp( x ).toFixed( 5 ) + "\n";
   }
   texto += "\n";

   // 6. Math.log(x)
   texto += "6. Math.log(x) - Logaritmo natural (base e):\n";
   texto += "-------------------------------------------\n";
   texto += "x\t\tMath.log(x)\n";
   var valoresLog = [ 1, 2.71828, 7.38906, 10, 100 ];
   for ( var i = 0; i < valoresLog.length; ++i )
   {
      var x = valoresLog[ i ];
      texto += x + "\t\t" + Math.log( x ).toFixed( 5 ) + "\n";
   }
   texto += "\n";

   // 7. Math.sqrt(x)
   texto += "7. Math.sqrt(x) - Raíz cuadrada de x:\n";
   texto += "------------------------------------\n";
   texto += "x\t\tMath.sqrt(x)\n";
   var valoresSqrt = [ 0, 4, 9, 16, 25, 900 ];
   for ( var i = 0; i < valoresSqrt.length; ++i )
   {
      var x = valoresSqrt[ i ];
      texto += x + "\t\t" + Math.sqrt( x ) + "\n";
   }
   texto += "\n";

   // 8. Trigonometría: Math.sin(x), Math.cos(x), Math.tan(x) (x en radianes)
   texto += "8. Funciones trigonométricas (x en radianes):\n";
   texto += "---------------------------------------------\n";
   texto += "x (rad)\t\tMath.sin(x)\tMath.cos(x)\tMath.tan(x)\n";
   var angulos = [ 0, Math.PI / 6, Math.PI / 4, Math.PI / 3 ];
   for ( var i = 0; i < angulos.length; ++i )
   {
      var x = angulos[ i ];
      texto += x.toFixed( 2 ) + "\t\t" +
               Math.sin( x ).toFixed( 4 ) + "\t\t" +
               Math.cos( x ).toFixed( 4 ) + "\t\t" +
               Math.tan( x ).toFixed( 4 ) + "\n";
   }
   texto += "\n";

   // 9. Math.pow(x, y)
   texto += "9. Math.pow(x, y) - x elevada a la potencia y:\n";
   texto += "----------------------------------------------\n";
   texto += "x\ty\tMath.pow(x, y)\n";
   var paresPow = [ [1, 2], [9, 0.5], [3, 4], [3, 5] ];
   for ( var i = 0; i < paresPow.length; ++i )
   {
      var x = paresPow[ i ][ 0 ];
      var y = paresPow[ i ][ 1 ];
      texto += x + "\t" + y + "\t" + Math.pow( x, y ) + "\n";
   }
   texto += "\n";

   // 10. Math.max(x, y) y Math.min(x, y)
   texto += "10. Math.max(x, y) y Math.min(x, y):\n";
   texto += "------------------------------------\n";
   texto += "x\ty\tMath.max(x, y)\tMath.min(x, y)\n";
   var paresMinMax = [ [2.3, 12.7], [-2.3, -12.7], [6] ];
   for ( var i = 0; i < paresMinMax.length; ++i )
   {
      var x = paresMinMax[ i ][ 0 ];
      var y = paresMinMax[ i ][ 1 ];
      texto += x + "\t" + y + "\t" + Math.max( x, y ) + "\t\t" + Math.min( x, y ) + "\n";
   }

   salida.value = texto;
} // fin de la función evaluarFuncionesMath

window.addEventListener( "load", iniciar, false );
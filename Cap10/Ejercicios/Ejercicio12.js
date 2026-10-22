// Ejercicio 10.12
// Lee 10 números de entrada (10-100) y muestra solo los valores no duplicados.

var numeros = []; // Arreglo para almacenar los valores únicos (máximo 10 elementos)
var contadorEntradas = 0; // Rastrea el total de intentos de entrada (hasta 10)

// Registra el manejador de eventos del botón al cargar la página
function iniciar()
{
   var boton = document.getElementById( "botonIngresar" );
   boton.addEventListener( "click", ingresarNumero, false );
} // fin de la función iniciar

// Procesa cada número ingresado por el usuario
function ingresarNumero()
{
   var campoNumero = document.getElementById( "numero" );
   var valor = parseInt( campoNumero.value );
   var mensaje = document.getElementById( "mensaje" );
   var resultado = document.getElementById( "resultado" );

   // Validar que no se superen los 10 intentos
   if ( contadorEntradas >= 10 )
   {
      mensaje.innerHTML = "Ya se han ingresado los 10 números requeridos.";
      return;
   }

   // Validar que el valor esté en el rango permitido (10 a 100)
   if ( isNaN( valor ) || valor < 10 || valor > 100 )
   {
      mensaje.innerHTML = "Por favor, introduzca un número entero válido entre 10 y 100.";
      return;
   }

   ++contadorEntradas; // Incrementar el contador de lecturas

   // Búsqueda de duplicados usando indexOf
   if ( numeros.indexOf( valor ) === -1 )
   {
      numeros.push( valor ); // Si no existe en el arreglo, se añade
      mensaje.innerHTML = "El número " + valor + " es único y fue agregado.";
   }
   else
   {
      mensaje.innerHTML = "El número " + valor + " ya había sido ingresado (duplicado ignorado).";
   }

   // Mostrar el contenido actual del arreglo de números únicos
   resultado.innerHTML = numeros.join( " " );

   // Limpiar y enfocar el campo de entrada
   campoNumero.value = "";
   campoNumero.focus();

   // Deshabilitar la entrada tras alcanzar el límite de 10 números
   if ( contadorEntradas === 10 )
   {
      mensaje.innerHTML += "<br><strong>Se completaron las 10 entradas de datos.</strong>";
      document.getElementById( "botonIngresar" ).disabled = true;
   }
} // fin de la función ingresarNumero

window.addEventListener( "load", iniciar, false );

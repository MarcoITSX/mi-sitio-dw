// Ejercicio 11.26
// Programa de conversión entre unidades métricas e inglesas con validación de categorías físicas.

// Base de conocimientos de unidades organizadas por categoría física
var unidades = {
   // --- CATEGORÍA: LONGITUD (Base: metros) ---
   "metro":       { categoria: "longitud", factor: 1.0, pl: "metros" },
   "metros":      { categoria: "longitud", factor: 1.0, pl: "metros" },
   "centimetro":  { categoria: "longitud", factor: 0.01, pl: "centímetros" },
   "centímetros": { categoria: "longitud", factor: 0.01, pl: "centímetros" },
   "centimetro":  { categoria: "longitud", factor: 0.01, pl: "centímetros" },
   "centimetros": { categoria: "longitud", factor: 0.01, pl: "centímetros" },
   "kilometro":   { categoria: "longitud", factor: 1000.0, pl: "kilómetros" },
   "kilómetros":  { categoria: "longitud", factor: 1000.0, pl: "kilómetros" },
   "kilometros":  { categoria: "longitud", factor: 1000.0, pl: "kilómetros" },
   "pulgada":     { categoria: "longitud", factor: 0.0254, pl: "pulgadas" },
   "pulgadas":    { categoria: "longitud", factor: 0.0254, pl: "pulgadas" },
   "pie":         { categoria: "longitud", factor: 0.3048, pl: "pies" },
   "pies":        { categoria: "longitud", factor: 0.3048, pl: "pies" },
   "yarda":       { categoria: "longitud", factor: 0.9144, pl: "yardas" },
   "yardas":      { categoria: "longitud", factor: 0.9144, pl: "yardas" },
   "milla":       { categoria: "longitud", factor: 1609.344, pl: "millas" },
   "millas":      { categoria: "longitud", factor: 1609.344, pl: "millas" },

   // --- CATEGORÍA: MASA / PESO (Base: gramos) ---
   "gramo":       { categoria: "masa", factor: 1.0, pl: "gramos" },
   "gramos":      { categoria: "masa", factor: 1.0, pl: "gramos" },
   "kilogramo":   { categoria: "masa", factor: 1000.0, pl: "kilogramos" },
   "kilogramos":  { categoria: "masa", factor: 1000.0, pl: "kilogramos" },
   "kilo":        { categoria: "masa", factor: 1000.0, pl: "kilogramos" },
   "kilos":       { categoria: "masa", factor: 1000.0, pl: "kilogramos" },
   "libra":       { categoria: "masa", factor: 453.592, pl: "libras" },
   "libras":      { categoria: "masa", factor: 453.592, pl: "libras" },
   "onza":        { categoria: "masa", factor: 28.3495, pl: "onzas" },
   "onzas":       { categoria: "masa", factor: 28.3495, pl: "onzas" },

   // --- CATEGORÍA: VOLUMEN (Base: litros) ---
   "litro":       { categoria: "volumen", factor: 1.0, pl: "litros" },
   "litros":      { categoria: "volumen", factor: 1.0, pl: "litros" },
   "mililitro":  { categoria: "volumen", factor: 0.001, pl: "mililitros" },
   "mililitros": { categoria: "volumen", factor: 0.001, pl: "mililitros" },
   "cuarto":      { categoria: "volumen", factor: 0.946353, pl: "cuartos" },
   "cuartos":     { categoria: "volumen", factor: 0.946353, pl: "cuartos" },
   "galon":       { categoria: "volumen", factor: 3.78541, pl: "galones" },
   "galón":       { categoria: "volumen", factor: 3.78541, pl: "galones" },
   "galones":     { categoria: "volumen", factor: 3.78541, pl: "galones" }
};

function iniciar()
{
   document.getElementById( "botonProcesarPregunta" ).addEventListener( "click", procesarConsultaTexto, false );
   document.getElementById( "botonConvertirDirecto" ).addEventListener( "click", procesarSeleccionDirecta, false );

   // Registrar los botones de ejemplo rápido
   var botonesEjemplo = document.querySelectorAll( ".btnEjemplo" );
   for ( var i = 0; i < botonesEjemplo.length; ++i )
   {
      botonesEjemplo[ i ].addEventListener( "click", function() {
         document.getElementById( "preguntaInput" ).value = this.value;
         procesarConsultaTexto();
      }, false );
   }

   poblarDesplegables();
} // fin de la función iniciar

// Llenar los menús desplegables con las unidades disponibles ordenadas
function poblarDesplegables()
{
   var selOrigen = document.getElementById( "unidadOrigenSelect" );
   var selDestino = document.getElementById( "unidadDestinoSelect" );

   var listaUnidadesUnicas = [
      "metros", "centímetros", "kilómetros", "pulgadas", "pies", "yardas", "millas",
      "gramos", "kilogramos", "libras", "onzas",
      "litros", "mililitros", "cuartos", "galones"
   ];

   for ( var i = 0; i < listaUnidadesUnicas.length; ++i )
   {
      var u = listaUnidadesUnicas[ i ];
      var opt1 = new Option( u, u );
      var opt2 = new Option( u, u );
      selOrigen.add( opt1 );
      selDestino.add( opt2 );
   }

   selOrigen.value = "cuartos";
   selDestino.value = "litros";
} // fin de la función poblarDesplegables

// Procesa preguntas en lenguaje natural tipo "¿Cuántas pulgadas hay en 2 metros?"
function procesarConsultaTexto()
{
   var textoPregunta = document.getElementById( "preguntaInput" ).value.trim();
   var divResultados = document.getElementById( "resultados" );

   if ( textoPregunta === "" )
   {
      divResultados.innerHTML = "<p style='color: red;'>Por favor, ingrese una pregunta de conversión.</p>";
      return;
   }

   // Limpiar signos de puntuación e interpolar la consulta
   var textoLimpio = textoPregunta.replace( /[¿?¡!,.]/g, "" ).toLowerCase();
   var tokens = textoLimpio.split( /\s+/ );

   var cantidad = null;
   var unidadDestino = null;
   var unidadOrigen = null;

   // Extraer el valor numérico
   for ( var i = 0; i < tokens.length; ++i )
   {
      var num = parseFloat( tokens[ i ] );
      if ( !isNaN( num ) )
      {
         cantidad = num;
         break;
      }
   }

   // Identificar la unidad de destino (aparece antes del valor numérico) y la de origen (después del número)
   for ( var k = 0; k < tokens.length; ++k )
   {
      var palabra = tokens[ k ];
      if ( unidades[ palabra ] )
      {
         if ( cantidad === null || k < tokens.indexOf( cantidad.toString() ) )
         {
            if ( !unidadDestino ) unidadDestino = palabra;
         }
         else
         {
            if ( !unidadOrigen ) unidadOrigen = palabra;
         }
      }
   }

   // Si no se detectaron por posición relativa, asignar las dos primeras unidades encontradas
   if ( (!unidadOrigen || !unidadDestino) && cantidad !== null )
   {
      var halladas = [];
      for ( var m = 0; m < tokens.length; ++m )
      {
         if ( unidades[ tokens[ m ] ] )
         {
            halladas.push( tokens[ m ] );
         }
      }
      if ( halladas.length >= 2 )
      {
         unidadDestino = halladas[ 0 ];
         unidadOrigen = halladas[ 1 ];
      }
   }

   if ( cantidad === null || !unidadOrigen || !unidadDestino )
   {
      divResultados.innerHTML = "<p style='color: red;'><strong>No se pudo interpretar la pregunta.</strong> Asegúrese de incluir una cantidad y dos unidades reconocidas.<br><em>Ejemplo: ¿Cuántas pulgadas hay en 2 metros?</em></p>";
      return;
   }

   ejecutarConversion( cantidad, unidadOrigen, unidadDestino );
} // fin de la función procesarConsultaTexto

// Procesa conversiones seleccionadas desde los menús desplegables
function procesarSeleccionDirecta()
{
   var cantidad = parseFloat( document.getElementById( "cantidadInput" ).value );
   var unidadOrigen = document.getElementById( "unidadOrigenSelect" ).value.toLowerCase();
   var unidadDestino = document.getElementById( "unidadDestinoSelect" ).value.toLowerCase();
   var divResultados = document.getElementById( "resultados" );

   if ( isNaN( cantidad ) )
   {
      divResultados.innerHTML = "<p style='color: red;'>Por favor, introduzca una cantidad numérica válida.</p>";
      return;
   }

   ejecutarConversion( cantidad, unidadOrigen, unidadDestino );
} // fin de la función procesarSeleccionDirecta

// Realiza el cálculo matemático y valida la compatibilidad de categorías
function ejecutarConversion( cantidad, origenNombre, destinoNombre )
{
   var divResultados = document.getElementById( "resultados" );
   var uOrigen = unidades[ origenNombre ];
   var uDestino = unidades[ destinoNombre ];

   if ( !uOrigen || !uDestino )
   {
      divResultados.innerHTML = "<p style='color: red;'>Una o ambas unidades no se encuentran registradas en el sistema.</p>";
      return;
   }

   // Validación clave: comprobar que ambas unidades pertenezcan a la misma categoría física
   if ( uOrigen.categoria !== uDestino.categoria )
   {
      var mensajeInvalido = "<div style='background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; padding: 12px; border-radius: 5px;'>" +
         "<strong>Conversión inválida solicitada:</strong><br>" +
         "La pregunta de convertir <em>" + uOrigen.pl + "</em> (" + uOrigen.categoria + ") a <em>" + uDestino.pl + "</em> (" + uDestino.categoria + ") no es válida " +
         "debido a que pertenecen a dimensiones físicas distintas." +
         "</div>";
      divResultados.innerHTML = mensajeInvalido;
      return;
   }

   // Cálculo a la unidad base de la categoría y posterior conversión a la unidad de destino
   var valorEnBase = cantidad * uOrigen.factor;
   var resultadoFinal = valorEnBase / uDestino.factor;

   var mensajeExito = "<div style='background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; padding: 12px; border-radius: 5px; font-size: 1.1em;'>" +
      "<strong>Resultado:</strong> " + cantidad + " " + uOrigen.pl + " equivalen a <strong>" + resultadoFinal.toFixed( 4 ) + " " + uDestino.pl + "</strong>." +
      "</div>";

   divResultados.innerHTML = mensajeExito;
} // fin de la función ejecutarConversion

window.addEventListener( "load", iniciar, false );
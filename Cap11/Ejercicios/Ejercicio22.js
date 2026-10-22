// Ejercicio 11.22
// Lee una fecha desde un control de formulario HTML5 y la despliega en múltiples formatos usando métodos de Date.

function iniciar()
{
   var boton = document.getElementById( "botonConvertir" );
   boton.addEventListener( "click", procesarFecha, false );

   // Establecer por defecto la fecha actual en el campo date
   var campoFecha = document.getElementById( "fechaInput" );
   var hoy = new Date();
   var anio = hoy.getFullYear();
   var mes = ( hoy.getMonth() + 1 < 10 ? "0" : "" ) + ( hoy.getMonth() + 1 );
   var dia = ( hoy.getDate() < 10 ? "0" : "" ) + hoy.getDate();
   campoFecha.value = anio + "-" + mes + "-" + dia;
} // fin de la función iniciar

function procesarFecha()
{
   var campoFecha = document.getElementById( "fechaInput" );
   var divResultados = document.getElementById( "resultados" );

   if ( !campoFecha.value )
   {
      divResultados.innerHTML = "<p style='color: red;'>Por favor, seleccione una fecha válida.</p>";
      return;
   }

   // Descomponer el valor aaaa-mm-dd para construir el objeto Date local sin desfasamiento horario
   var partes = campoFecha.value.split( "-" );
   var anio = parseInt( partes[ 0 ], 10 );
   var mes = parseInt( partes[ 1 ], 10 ) - 1; // Los meses en Date van de 0 (Enero) a 11 (Diciembre)
   var dia = parseInt( partes[ 2 ], 10 );

   // Crear el objeto Date con los componentes ingresados
   var fechaObjeto = new Date( anio, mes, dia );

   // Construcción de la tabla con los diferentes formatos de cadena
   var salida = "<table border='1' cellpadding='8' cellspacing='0'>" +
      "<thead>" +
         "<tr><th>Método de conversión (Date)</th><th>Resultado en cadena</th><th>Descripción</th></tr>" +
      "</thead>" +
      "<tbody>" +
         "<tr>" +
            "<td><code>toString()</code></td>" +
            "<td>" + fechaObjeto.toString() + "</td>" +
            "<td>Representación completa en cadena local.</td>" +
         "</tr>" +
         "<tr>" +
            "<td><code>toLocaleString()</code></td>" +
            "<td>" + fechaObjeto.toLocaleString() + "</td>" +
            "<td>Formato de fecha y hora según la configuración regional de la computadora.</td>" +
         "</tr>" +
         "<tr>" +
            "<td><code>toDateString()</code></td>" +
            "<td>" + fechaObjeto.toDateString() + "</td>" +
            "<td>Únicamente la porción de fecha en formato legible.</td>" +
         "</tr>" +
         "<tr>" +
            "<td><code>toLocaleDateString()</code></td>" +
            "<td>" + fechaObjeto.toLocaleDateString() + "</td>" +
            "<td>Porción de fecha adaptada a la configuración regional local.</td>" +
         "</tr>" +
         "<tr>" +
            "<td><code>toTimeString()</code></td>" +
            "<td>" + fechaObjeto.toTimeString() + "</td>" +
            "<td>Porción de hora e información sobre la zona horaria local.</td>" +
         "</tr>" +
         "<tr>" +
            "<td><code>toLocaleTimeString()</code></td>" +
            "<td>" + fechaObjeto.toLocaleTimeString() + "</td>" +
            "<td>Porción de hora formateada según la configuración regional local.</td>" +
         "</tr>" +
         "<tr>" +
            "<td><code>toUTCString()</code></td>" +
            "<td>" + fechaObjeto.toUTCString() + "</td>" +
            "<td>Fecha y hora convertidas al Tiempo Universal Coordinado (UTC).</td>" +
         "</tr>" +
         "<tr>" +
            "<td><code>toISOString()</code></td>" +
            "<td>" + fechaObjeto.toISOString() + "</td>" +
            "<td>Formato estándar internacional ISO 8601 (AAAA-MM-DDTHH:mm:ss.sssZ).</td>" +
         "</tr>" +
         "<tr>" +
            "<td><code>valueOf()</code> / <code>getTime()</code></td>" +
            "<td>" + fechaObjeto.valueOf() + " ms</td>" +
            "<td>Número de milisegundos transcurridos desde el 1 de enero de 1970 UTC.</td>" +
         "</tr>" +
      "</tbody>" +
      "</table>";

   divResultados.innerHTML = salida;
} // fin de la función procesarFecha

window.addEventListener( "load", iniciar, false );
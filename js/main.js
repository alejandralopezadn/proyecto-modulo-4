//Revisar la conexión
//console.log('Sistema de Gestión Bancaria - v0.1.0');

//IMPORTAR VALIDADORES, HELPERS Y FORMATEADORES
//Importamos las funciones encargadas de validar información.
import {validarCampoObligatorio, validarMonto,} from './utils/validators.js';

//Importamos nuestra función auxiliar encargada de generar identificadores.
import {generarId,} from './utils/helpers.js';

//Importamos las funciones utilizadas para preparar los datos antes de mostrarlos al usuario.
import {formatCurrency, formatDate, formatAccountNumber,} from './utils/formatters.js';





//PUNTO DE ENTRADA DE LA APLICACIÓN 

//VERSIÓN ACTUAL DEL PROYECTO
console.log('Sistema de Gestión Bancaria - v0.2.0');

//Validación de campo que debe mostrar true
console.log('Campo obligatorio:', validarCampoObligatorio('Banco Digital'),);

//Probar validación del monto ya que debe regresar true
console.log('Monto válido:', validarMonto(1000),);

//Se genera un identificador dinamico
console.log('ID generado:', generarId(),);

//Se convierte los 1500 a un formato monetario 
console.log('Monto formateado:', formatCurrency(1500),);

//Se va a formatear la fecha actual
console.log('Fecha formateada:', formatDate(new Date()),);

//Separamos cada uno de los cuatro digitos
console.log('Número de cuenta:', formatAccountNumber('123456789012'),);



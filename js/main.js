//Revisar la conexión
//console.log('Sistema de Gestión Bancaria - v0.1.0');

//IMPORTAR VALIDADORES, HELPERS Y FORMATEADORES
//Importamos las funciones encargadas de validar información.
import {validarCampoObligatorio, validarMonto,} from './utils/validators.js';

//Importamos nuestra función auxiliar encargada de generar identificadores.
import {generarId,} from './utils/helpers.js';

//Importamos las funciones utilizadas para preparar los datos antes de mostrarlos al usuario.
import {formatCurrency, formatDate, formatAccountNumber,} from './utils/formatters.js';

//Importar modelo de usuario
import { Usuario } from './models/Usuario.js';

//Importar modelo de cuenta
import { Cuenta } from './models/Cuenta.js';

//Importar modelo de movimiento
import { Movimiento } from './models/Movimiento.js';




//VERSIÓN ACTUAL DEL PROYECTO
console.log('Sistema de Gestión Bancaria - v0.2.0');



//PUNTO DE ENTRADA DE LA APLICACIÓN 

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


//USUARIO
const usuarioDemo = new Usuario({
    nombre: 'Alejandra Lopez',
    email: 'alepez@correo.com',
    telefono: '1111111111',
    password: 'pato',
});

console.log('Usuario:', usuarioDemo,);


//CUENTA
const cuentaDemo = new Cuenta({
    numeroCuenta: '2222222222',
    usuarioId: usuarioDemo.id,
});

console.log('Cuenta:', cuentaDemo,);


//DEPOSITO DE DEMOSTRACION
cuentaDemo.depositar(1000);

console.log('Saldo después del depósito:', formatCurrency(cuentaDemo.saldo),);


//MOVIMIENTO
const movimientoDemo = new Movimiento({
    tipo: 'DEPOSITO',
    monto: 1000,
    descripcion: 'Depósito inicial',
    cuentaOrigen: cuentaDemo.id,
    saldoResultante: cuentaDemo.saldo,
});

console.log('Movimiento:', movimientoDemo,);


//RELACIONES
console.log('La cuenta pertenece al usuario:', usuarioDemo.id === cuentaDemo.usuarioId,);

console.log('El movimiento pertenece a la cuenta:', cuentaDemo.id === movimientoDemo.cuentaOrigen,);
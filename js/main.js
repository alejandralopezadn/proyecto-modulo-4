//Comprobar la conexión
//console.log('Sistema de Gestión Bancaria - v0.1.0');


//IMPORTACIONES
// Importamos las funciones encargadas de validar información.
import { validarCampoObligatorio, validarMonto } from "./utils/validators.js";
// Importamos nuestra función auxiliar encargada de generar identificadores.
import { generarId } from "./utils/helpers.js";
// Importamos las funciones utilizadas para preparar los datos antes de mostrarlos al usuario.
import {formatCurrency, formatDate, formatAccountNumber,} from "./utils/formatters.js";
//Importar modelo de usuario
import { Usuario } from "./models/Usuario.js";
//Importar modelo de cuenta
import { Cuenta } from "./models/Cuenta.js";
//Importar modelo de movimiento
import { Movimiento } from "./models/Movimiento.js";
//Importar Banco
import { Banco } from "./models/Banco.js";
//IMPORTAR SERVICIO DE PERSISTENCIA
import { STORAGE_KEYS, storageService } from "./services/StorageService.js";



//VERSION ACTUAL
console.log("Sistema de Gestión Bancaria - v0.5.0");



// FUNCIONES DE PERSISTENCIA EN LOCAL STORAGE
function guardarBanco(banco) {
  storageService.guardar(STORAGE_KEYS.USUARIOS, banco.usuarios);

  storageService.guardar(STORAGE_KEYS.CUENTAS, banco.cuentas);

  storageService.guardar(STORAGE_KEYS.MOVIMIENTOS, banco.movimientos);
}



// FUNCION PARA CARGAR LOS DATOS DEL BANCO
function cargarBanco() {
  const usuariosGuardados = storageService.obtener(STORAGE_KEYS.USUARIOS, []);
  const cuentasGuardadas = storageService.obtener(STORAGE_KEYS.CUENTAS, []);
  const movimientosGuardados = storageService.obtener(STORAGE_KEYS.MOVIMIENTOS, [],);

  // RECONSTRUIMOS LAS INSTANCIAS PARA RECUPERAR USUARIO, Y SUS METODOS
  const usuarios = usuariosGuardados.map((usuario) => new Usuario(usuario));
  const cuentas = cuentasGuardadas.map((cuenta) => new Cuenta(cuenta));
  const movimientos = movimientosGuardados.map((movimiento) => new Movimiento(movimiento),);

  //RECONSTRUIMOS NUEVAMENTE EL BANCO
  return new Banco({
    usuarios,
    cuentas,
    movimientos,
  });
}

// PRUEBAS DE UTILIDADES
// Validación de campo debe mostrar true
console.log("Campo obligatorio:", validarCampoObligatorio("Banco Digital"));
// Probar validación del monto debe regresar True
console.log("Monto válido:", validarMonto(1000));
// Generamos un identificador dinámico
console.log("ID generado:", generarId());
// Convertimos 1500 a formato monetario MXN
console.log("Monto formateado:", formatCurrency(1500));
// Formateamos la fecha actual
console.log("Fecha formateada:", formatDate(new Date()));
// Separamos visualmente cada cuatro dígitos
console.log("Número de cuenta:", formatAccountNumber("123456789012"));


// CARGAR BANCO PERSISTIDO
// cargarBanco() primero busca información guardada antes de crear la instancia.
const bancoDemo = cargarBanco();


// DATOS INICIALES
// VALIDAR SI EL BANCO ESTÁ VACÍO
if (bancoDemo.usuarios.length === 0) {
  // CREAR USUARIO INICIAL DEMO
  const usuarioDemo = new Usuario({
    nombre: "Alejandra Lopez",
    email: "ale@correo.com",
    telefono: "123456789",
    password: "pato",
  });


  // REGISTRAR USUARIO
  bancoDemo.agregarUsuario(usuarioDemo);


  // CREAR CUENTA INICIAL DEMO
  const cuentaDemo = new Cuenta({
    numeroCuenta: "987654321",
    usuarioId: usuarioDemo.id,
  });

  // REGISTRAR CUENTA
  bancoDemo.agregarCuenta(cuentaDemo);

  // REALIZAR DEPÓSITO INICIAL DEMO
  bancoDemo.realizarDeposito({
    cuentaId: cuentaDemo.id,
    monto: 1000,
    descripcion: "Depósito inicial",
  });


  // GUARDAR BANCO DEMO
  guardarBanco(bancoDemo);
  console.log("Datos iniciales creados y guardados.");
}


// COMPROBAR DATOS RECUPERADOS
console.log("Banco recuperado:", bancoDemo);
console.log("Usuarios almacenados:", bancoDemo.usuarios);
console.log("Cuentas almacenadas:", bancoDemo.cuentas);
console.log("Movimientos almacenados:", bancoDemo.movimientos);


// OBTENER PRIMERA CUENTA
const cuentaPrincipal = bancoDemo.cuentas[0] || null;

//SI EXISTE MOSTRAR SALDO PERSISTIDO 
if (cuentaPrincipal) {
  console.log("Saldo persistido:", formatCurrency(cuentaPrincipal.saldo));
  console.log("¿La cuenta recuperada sigue siendo una instancia de Cuenta?", cuentaPrincipal instanceof Cuenta,);
  console.log("Tipo de depositar:", typeof cuentaPrincipal.depositar);
}
//IMPORTAR UTILIDADES
//Importamos generarId() para asignar un identificador único a cada movimiento.
import { generarId } from '../utils/helpers.js';


//MODULO DE MOVIMIENTO
//Representa una operación realizada dentro del sistema bancario.
export class Movimiento {
    constructor({
        id = generarId(),
        tipo,
        monto,
        descripcion = '',
        cuentaOrigen = null,
        cuentaDestino = null,
        saldoResultante = null,
        fecha = new Date().toISOString(),
    }) {

		//ASIGNAR PROPIEDADES 
        this.id = id;
        this.tipo = tipo;
        this.monto = Number(monto);
        this.descripcion = descripcion;
        this.cuentaOrigen = cuentaOrigen;
        this.cuentaDestino = cuentaDestino;
        this.saldoResultante = saldoResultante;
        this.fecha = fecha;
    }
}
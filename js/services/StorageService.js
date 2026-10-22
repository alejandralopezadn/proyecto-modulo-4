//CLAEVS DE ALMACENAMIENTO
// En donde se van a centralizar los nombre de todas las claves utilizadas por LocalStorage. De esta manera evitamos escribir cadenas manuales en el proyecto
export const STORAGE_KEYS = {
  USUARIOS: "usuarios",
  CUENTAS: "cuentas",
  MOVIMIENTOS: "movimientos",
  SESION: "sesion",
};

//COMUNICACIÓN CON LOCAL
class StorageService {
  //GUARDA LA INFORMACIÓN
  guardar(clave, valor) {
    const valorJSON = JSON.stringify(valor);

    // De esta manera guardamos el JSON utilizando la clave recibida.
    localStorage.setItem(clave, valorJSON);
  }

  //OBTENER LA INFORMACIÓN
  obtener(clave, valorPorDefecto = null) {
    //Aqui se devuelve el contenido almacenado como texto. Si la clave no existe devuelve null.
    const valor = localStorage.getItem(clave);

    // VALIDAR SI EXISTE INFORMACIÓN
    if (valor === null) {
      return valorPorDefecto;
    }

    // CONVERTIR JSON
    try {
      return JSON.parse(valor);
    } catch (error) {
      //Si el JSON almacenado es inválido, evitamos detener toda la aplicación.
      console.error(
        `No fue posible leer la clave "${clave}" de LocalStorage.`,
        error,
      );
      /* Si ocurre un error regresamos el valor predeterminado. */
      return valorPorDefecto;
    }
  }

  //ELIMINAR LA INFORMACIÓN
  eliminar(clave) {
    localStorage.removeItem(clave);
  }

  //LIMPIAR EL LOCAL
  limpiar (){
    localStorage.clear()
  }
}


//INSTANCIAS DEL SERVICIO
//En donde solo vamos a crear una instancia que va a poder reutilizarse desde diferentes modulos
export const storageService = new StorageService();

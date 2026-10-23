/* =========================================
   CONFIGURACIÓN DE JEST
========================================= */

export default {

    /* =====================================
       ENTORNO DE PRUEBAS
    ====================================== */

    // Utilizamos jsdom porque algunos servicios
    // dependen de APIs propias del navegador,
    // especialmente LocalStorage.
    testEnvironment:
        'jsdom',


    /* =====================================
       UBICACIÓN DE LAS PRUEBAS
    ====================================== */

    // Todas las suites se encuentran dentro
    // de la carpeta tests/.
    roots: [
        '<rootDir>/tests',
    ],


    /* =====================================
       ECMASCRIPT MODULES
    ====================================== */

    // El proyecto utiliza import/export nativo.
    // No necesitamos transformar JavaScript
    // mediante Babel.
    transform: {},


    /* =====================================
       COBERTURA
    ====================================== */

    // El reporte se concentra inicialmente en
    // la lógica del dominio, servicios y helpers.
    collectCoverageFrom: [

        'js/models/**/*.js',

        'js/services/**/*.js',

        'js/utils/**/*.js',


        // Las interfaces DOM se excluyen porque
        // todavía no cuentan con suites específicas.
        '!js/ui/**/*.js',


        // main.js coordina la página de login y
        // registro y tampoco forma parte de la
        // cobertura unitaria actual.
        '!js/main.js',
    ],

};

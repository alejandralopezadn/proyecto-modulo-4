/* =========================================
   PRUEBAS DEL MODELO USUARIO
========================================= */

import {
    Usuario,
} from '../js/models/Usuario.js';


describe(
    'Usuario',
    () => {

        /* =================================
           CREACIÓN
        ================================= */

        test(
            'debe crear un usuario con los datos recibidos',
            () => {
                const usuario =
                    new Usuario({
                        nombre:
                            'Paloma Ruiz',

                        email:
                            'paloma@correo.com',

                        telefono:
                            '987654321',

                        password:
                            'pollito',
                    });


                expect(
                    usuario.nombre,
                ).toBe(
                    'Paloma Ruiz',
                );


                expect(
                    usuario.email,
                ).toBe(
                    'paloma@correo.com',
                );


                expect(
                    usuario.telefono,
                ).toBe(
                    '987654321',
                );
            },
        );


        test(
            'debe generar un id y quedar activo',
            () => {
                const usuario =
                    new Usuario({
                        nombre:
                            'Andres Alvarez',

                        email:
                            'andy@correo.com',

                        password:
                            'perrito',
                    });


                expect(
                    usuario.id,
                ).toBeTruthy();


                expect(
                    usuario.activo,
                ).toBe(true);
            },
        );

    },
);
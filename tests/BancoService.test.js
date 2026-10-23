/* =========================================
   PRUEBAS DE BANCOSERVICE
========================================= */

import {
    bancoService,
} from '../js/services/BancoService.js';

import {
    STORAGE_KEYS,
    storageService,
} from '../js/services/StorageService.js';


describe(
    'BancoService',
    () => {

        /* =================================
           PREPARACIÓN
        ================================= */

        beforeEach(
            () => {
                // Limpiamos los datos de cualquier
                // prueba ejecutada anteriormente.
                localStorage.clear();


                // BancoService utiliza una instancia
                // interna del Banco. La reiniciamos
                // antes de cada test.
                bancoService._banco =
                    null;


                // Usuarios de prueba.
                storageService.guardar(
                    STORAGE_KEYS.USUARIOS,
                    [
                        {
                            id:
                                'u1',

                            nombre:
                                'Yatzil',

                            email:
                                'yat@correo.com',

                            password:
                                'patito',

                            activo:
                                true,
                        },

                        {
                            id:
                                'u2',

                            nombre:
                                'Luz',

                            email:
                                'luz@correo.com',

                            password:
                                'oveja',

                            activo:
                                true,
                        },
                    ],
                );


                // Cuentas de prueba.
                storageService.guardar(
                    STORAGE_KEYS.CUENTAS,
                    [
                        {
                            id:
                                'c1',

                            numeroCuenta:
                                '111111111111',

                            tipo:
                                'Ahorro',

                            saldo:
                                1000,

                            usuarioId:
                                'u1',

                            activa:
                                true,
                        },

                        {
                            id:
                                'c2',

                            numeroCuenta:
                                '222222222222',

                            tipo:
                                'Ahorro',

                            saldo:
                                500,

                            usuarioId:
                                'u2',

                            activa:
                                true,
                        },
                    ],
                );


                // Comenzamos sin movimientos.
                storageService.guardar(
                    STORAGE_KEYS.MOVIMIENTOS,
                    [],
                );
            },
        );


        /* =================================
           DEPÓSITOS
        ================================= */

        test(
            'debe realizar y persistir un deposito',
            () => {
                bancoService
                    .realizarDeposito({
                        cuentaId:
                            'c1',

                        monto:
                            500,

                        descripcion:
                            'Test',
                    });


                const cuentas =
                    storageService.obtener(
                        STORAGE_KEYS.CUENTAS,
                        [],
                    );


                const movimientos =
                    storageService.obtener(
                        STORAGE_KEYS.MOVIMIENTOS,
                        [],
                    );


                expect(
                    cuentas[0].saldo,
                ).toBe(1500);


                expect(
                    movimientos,
                ).toHaveLength(1);


                expect(
                    movimientos[0].tipo,
                ).toBe(
                    'DEPOSITO',
                );
            },
        );


        /* =================================
           TRANSFERENCIAS
        ================================= */

        test(
            'debe realizar y persistir una transferencia',
            () => {
                bancoService
                    .realizarTransferencia({
                        cuentaOrigenId:
                            'c1',

                        numeroCuentaDestino:
                            '222222222222',

                        monto:
                            300,

                        descripcion:
                            'Prueba',
                    });


                const cuentas =
                    storageService.obtener(
                        STORAGE_KEYS.CUENTAS,
                        [],
                    );


                const movimientos =
                    storageService.obtener(
                        STORAGE_KEYS.MOVIMIENTOS,
                        [],
                    );


                const origen =
                    cuentas.find(
                        (cuenta) =>
                            cuenta.id ===
                            'c1',
                    );


                const destino =
                    cuentas.find(
                        (cuenta) =>
                            cuenta.id ===
                            'c2',
                    );


                expect(
                    origen.saldo,
                ).toBe(700);


                expect(
                    destino.saldo,
                ).toBe(800);


                expect(
                    movimientos,
                ).toHaveLength(2);
            },
        );


        /* =================================
           ACTUALIZAR USUARIO
        ================================= */

        test(
            'debe actualizar los datos de un usuario',
            () => {
                const usuario =
                    bancoService
                        .actualizarUsuario(
                            'u1',
                            {
                                nombre:
                                    'Nancy Lopez',

                                email:
                                    'NANCY.LOPEZ@CORREO.COM',

                                telefono:
                                    '123456789',
                            },
                        );


                expect(
                    usuario.nombre,
                ).toBe(
                    'Nancy Lopez',
                );


                // BancoService normaliza el email.
                expect(
                    usuario.email,
                ).toBe(
                    'nancy.nuevo@correo.com',
                );
            },
        );


        /* =================================
           ELIMINAR USUARIO
        ================================= */

        test(
            'no debe eliminar un usuario que tenga saldo',
            () => {
                expect(
                    () => {
                        bancoService
                            .eliminarUsuario(
                                'u1',
                            );
                    },
                ).toThrow(
                    'No puedes eliminar tu cuenta mientras tengas saldo disponible.',
                );
            },
        );

    },
);
var SimonGame = SimonGame || {};
var juego;
function validar_ingreso() {
    var cedula, infoFormIngresoUsuario;
    cedula = $('#cedula').val();
    //console.log('success', `${cedula}`);

    infoFormIngresoUsuario = $('#info_form_ingreso_usuario');

    if (cedula == '') {
        // MostrarInfoForm(infoFormIngresoUsuario, 'Complete el campo Cédula.');
    } else if (isNaN(cedula) || cedula.length > 11) {
        // MostrarInfoForm(infoFormIngresoUsuario, 'Cédula no válida.');
    } else {
        $('#btn_form_ingreso_usuario').prop('disabled', true);

        // $.ajax({
        //     url: 'assets/php/peticiones.php',
        //     data: {
        //         query: 'validacionIngresoUsusario',
        //         cedula,
        //     },
        //     type: 'POST',
        //     success: function (datos) {
                // switch (datos['caso']) {
                //     case 0:
                //         console.log(`Error : ${datos.mensaje}`);
                //         MostrarInfoForm(infoFormIngresoUsuario, datos.mensaje);
                //         break;
                //     case 1:
                //         //console.log(`Exito : ${JSON.stringify(datos)}`);
                //         juego.global = datos;
                //         // console.log(`${validarCantidadJuegos(datos.id)}`);

                        iniciarJuego();
                //         break;
                //     default:
                //         console.log('success', datos);

                //         break;
                // }
                $('#btn_form_ingreso_usuario').prop('disabled', false);
            // },
        // });
    }
}

function iniciarJuego() {
    if (!juego) {
        $('#seccion_form').hide();
        SimonGame.game = new Phaser.Game(960, 506, Phaser.AUTO, 'game_block');

        SimonGame.game.state.add('GameState', SimonGame.GameState);
        SimonGame.game.state.add('BootState', SimonGame.BootState);
        SimonGame.game.state.add('PreloadState', SimonGame.PreloadState);
        SimonGame.game.state.start('BootState');
    }
}

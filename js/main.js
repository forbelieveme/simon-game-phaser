var SimonGame = SimonGame || {};
var juego;

function validar_ingreso() {
    var cedula, infoFormIngresoUsuario;
    cedula = $('#cedula').val();

    infoFormIngresoUsuario = $('#info_form_ingreso_usuario');

    if (cedula == '') {
        mostrarInfoFormulario(infoFormIngresoUsuario, 'Complete el campo Cédula.');
    } else if (isNaN(cedula) || cedula.length > 11) {
        mostrarInfoFormulario(infoFormIngresoUsuario, 'Cédula no válida.');
    } else {
        $('#btn_form_ingreso_usuario').prop('disabled', true);
        peticionValidacion(cedula, infoFormIngresoUsuario);
        $('#btn_form_ingreso_usuario').prop('disabled', false);
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

function mostrarInfoFormulario(infoForm, textoInfo) {
    infoForm.html(textoInfo);
    setTimeout(function () {
        infoForm.html('');
    }, 1800);
}

function peticionValidacion(cedula, infoFormIngresoUsuario) {
    $.ajax({
        url: 'php/Usuario.php',
        data: {
            query: 'validacionIngresoUsusario',
            cedula,
        },
        type: 'POST',
        success: function (datos) {
            switch (datos['caso']) {
                case 0:
                    console.log(`Error : ${datos.mensaje}`);
                    mostrarInfoFormulario(infoFormIngresoUsuario, datos.mensaje);
                    break;
                case 1:
                    iniciarJuego();
                    break;
                default:
                    console.log('success', datos);

                    break;
                }
        },
        error: function (error) {
            console.log(`error`, error);
        }
    });
}
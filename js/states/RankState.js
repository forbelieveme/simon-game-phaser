var SimonGame = SimonGame || {};

SimonGame.RankState = {
    init: function () {
        this.rankArray = []
        this.rankArray = peticionRanking()

    },
    create: function () {

        this.game.stage.backgroundColor = "#314e5b";

        this.panel = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'rankPanel'
        );
        this.panel.anchor.setTo(0.5);

        this.btnCerrar = this.add.button(
            this.game.width - 5,
            5,
            'exitBtn',
            this.clickBotonCerrar,
            this
        );
        this.btnCerrar.anchor.setTo(0.5);

        // console.log(`success`, g_ArrayRanking);
        var style = {
            font: '25pt Muro',
            fill: '#00000',
            align: 'center',
            // stroke: '#376f7c',
            // strokeThickness: 5
        };
        for (var i = 0; i < 10; i++) {
            var tmpPuesto = this.add.text(
                this.game.world.centerX - 180,
                this.game.world.centerY - 140 + i * 36,
                i + 1 + '.',
                style
            );
            tmpPuesto.anchor.setTo(0, 0.5);
            console.log(`rrr: `, this.rankArray[i]);

            // if (this.rankArray[i] != undefined) {
            if (this.rankArray[i]) {
                var tmpNombre = this.add.text(
                    this.game.world.centerX - 145,
                    this.game.world.centerY - 140 + i * 36,
                    `${this.rankArray[i]['0']}`,
                    style
                );
                tmpNombre.anchor.setTo(0, 0.5);

                var tmpPuntos = this.add.text(
                    this.game.world.centerX + 180,
                    this.game.world.centerY - 140 + i * 36,
                    `${this.rankArray[i]['1']}`,
                    style
                );
                tmpPuntos.anchor.setTo(1, 0.5);
                continue;
            }


            var tmpNombre = this.add.text(
                this.game.world.centerX - 145,
                this.game.world.centerY - 140 + i * 36,
                ``,
                style
            );
            tmpNombre.anchor.setTo(0, 0.5);

            var tmpPuntos = this.add.text(
                this.game.world.centerX + 180,
                this.game.world.centerY - 140 + i * 36,
                `0`,
                style
            );
            tmpPuntos.anchor.setTo(1, 0.5);
        }
    },
    peticionRanking: function(){

    },
    clickBotonCerrar: function () {
        this.state.start('HomeState');
    },
}

function peticionRanking() {
    var rankArray = []
    var y = $.ajax({
        url: 'php/Partida.php',
        data: {
            query: 'getRanking',
        },
        type: 'POST',
        // success: function (datos) {
        //     console.log(`datos`, datos.data);
        //     rankArray = datos.data
        // }
    })
    // .done(function (datos) {
    //     console.log(`datos`, datos.data);
    //     rankArray = datos.data
    // });
    y.done(function (datos) {
        console.log(`datos: `, datos.data);
    })

    return rankArray;

}





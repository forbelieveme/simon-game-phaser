var SimonGame = SimonGame || {};

SimonGame.RankState = {
    init: function () {
        this.rankArray = []
    },
    create: async function () {

        this.game.stage.backgroundColor = "#314e5b";

        this.panel = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY - 20,
            'rankPanel'
        );
        this.panel.anchor.setTo(0.5);

        this.btnCerrar = this.add.button(
            this.game.world.centerX,
            this.game.height - 30,
            'exitBtn',
            this.clickBotonCerrar,
            this
        );
        this.btnCerrar.anchor.setTo(0.5);

        var style = {
            font: '25pt Muro',
            fill: '#00000',
            align: 'center',
            // stroke: '#376f7c',
            // strokeThickness: 5
        };

        // peticionRanking().then((data) => {
        let data = await peticionRanking();
        this.rankArray = data.data;

        for (var i = 0; i < 10; i++) {
            var tmpPuesto = this.add.text(
                this.game.world.centerX - 180,
                this.game.world.centerY - 160 + i * 36,
                i + 1 + '.',
                style
            );
            tmpPuesto.anchor.setTo(0, 0.5);
            console.log(`rrr: `, this.rankArray[i]);

            if (this.rankArray[i]) {
                var tmpNombre = this.add.text(
                    this.game.world.centerX - 145,
                    this.game.world.centerY - 160 + i * 36,
                    `${this.rankArray[i]['0']}`,
                    style
                );
                tmpNombre.anchor.setTo(0, 0.5);

                var tmpPuntos = this.add.text(
                    this.game.world.centerX + 180,
                    this.game.world.centerY - 160 + i * 36,
                    `${this.rankArray[i]['1']}`,
                    style
                );
                tmpPuntos.anchor.setTo(1, 0.5);
                continue;
            }

            var tmpNombre = this.add.text(
                this.game.world.centerX - 145,
                this.game.world.centerY - 160 + i * 36,
                ``,
                style
            );
            tmpNombre.anchor.setTo(0, 0.5);

            var tmpPuntos = this.add.text(
                this.game.world.centerX + 180,
                this.game.world.centerY - 160 + i * 36,
                `0`,
                style
            );
            tmpPuntos.anchor.setTo(1, 0.5);
        }
        // })
    },
    clickBotonCerrar: function () {
        this.state.start('HomeState');
    },
}

async function peticionRanking() {
    let result;
    try {
        result = await $.ajax({
            url: 'php/Partida.php',
            data: {
                query: 'getRanking',
            },
            type: 'POST',
        })
        return result;
    } catch (error) {
        console.error(error);
    }
}





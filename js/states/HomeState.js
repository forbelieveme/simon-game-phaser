var SimonGame = SimonGame || {};

SimonGame.HomeState = {
    create: function () {

        this.game.stage.backgroundColor = "#314e5b";

        this.panelMenu = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'homePanel'
        );
        this.panelMenu.anchor.setTo(0.5);

        this.btnRanking = this.add.button(
            this.game.world.centerX,
            20,
            'rankingBtn',
            this.clickBotonRanking,
            this
        );
        this.btnRanking.anchor.setTo(0.5);


        this.btnJugar = this.add.button(
            this.game.world.centerX,
            this.game.height - 50,
            'playBtn',
            this.clickBotonJugar,
            this
        );
        this.btnJugar.anchor.setTo(0.5);

        this.logo = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY - 95,
            'logo'
        );
        this.logo.anchor.setTo(0.5);

        var style = {
            font: '25pt Muro',
            fill: '#00000',
            align: 'center',
            // stroke: '#376f7c',
            // strokeThickness: 5
        };
        this.txtNombre = this.add.text(
            this.game.world.centerX,
            this.game.world.centerY + 35,
            `${SimonGame.game.customParams.nombre} ${SimonGame.game.customParams.apellido}`,
            // `Nombre Apellido`,
            style
        );
        this.txtNombre.anchor.setTo(0.5);

    },
    clickBotonJugar: function () {
        this.state.start('GameState');

        //console.log("JUAGR...");
        // let date = new Date();
        // $.ajax({
        // 	url: 'assets/php/peticiones.php',
        // 	data: {
        // 		query: 'validacionCantJuegos',
        // 		idUsuario: juego.global.id,
        // 		fecha: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        // 	},
        // 	type: 'POST',
        // 	async: false,
        // 	success: function (resp) {
        // 		// console.log('validacionCantJuegos:', `${JSON.stringify(resp)}`);
        // 		var partidasDispobles;
        // 		switch (juego.global.nivel) {
        // 			case 'Oro':
        // 				partidasDispobles = 4 - resp.conteo;
        // 				break;
        // 			case 'Plata':
        // 				partidasDispobles = 3 - resp.conteo;
        // 				break;
        // 			case 'Bronce':
        // 				partidasDispobles = 2 - resp.conteo;
        // 				break;
        // 		}
        // 		juego.global['partidasDispobles'] = partidasDispobles;

        // 		// console.log(`${JSON.stringify(juego.global)}`);
        // 	},
        // 	error: function (XMLHttpRequest, textStatus, errorThrown) {
        // 		console.log(`${JSON.stringify(XMLHttpRequest)}`);
        // 		console.log(`${textStatus}`);
        // 		console.log(`${errorThrown}`);
        // 	},
        // });
        // console.log('validacionCantJuegos', JSON.stringify(juego.global));
        // if (juego.global.partidasDispobles > 0) {
        // 	juego.state.start('Nivel');
        // } else {
        // 	console.log(`No te quedan partidas por jugar.\nVuelve a jugar mañana`);
        // 	this.txtCategoria.text =
        // 		'No te quedan partidas por jugar.\nVuelve a jugar mañana.';
        // 	this.txtCategoria.fill = '#797d93';
        // }
    },
    clickBotonRanking: function () {
        this.state.start('RankState');
    },
};

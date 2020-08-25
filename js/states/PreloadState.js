var SimonGame = SimonGame || {};

SimonGame.PreloadState = {
	preload: function () {
		// this.logo = this.add.sprite(
		// 	this.game.world.centerX,
		// 	this.game.world.centerY,
		// 	'logo'
		// );
		// this.logo.anchor.setTo(0.5);

		this.preloadBar = this.add.sprite(
			this.game.world.centerX,
			this.game.world.centerY + 128,
			'preloadBar'
		);
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('base', 'assets/images/fondoNivel.png');
		this.load.image('background', 'assets/images/fondo.jpg');
		this.load.image('tablero', 'assets/images/panelInfoNivel.png');
		this.load.image('1', 'assets/images/1.png');
		this.load.image('2', 'assets/images/2.png');
		this.load.image('3', 'assets/images/3.png');
		this.load.image('juega', 'assets/images/vuelve_a_jugar.png');
		this.load.image('turno', 'assets/images/tu-turno.png');

		this.load.audio('yellowSound', [
			'assets/audio/do.ogg',
			'assets/audio/do.mp3',
		]);
		this.load.audio('blueSound', [
			'assets/audio/fa.ogg',
			'assets/audio/fa.mp3',
		]);
		this.load.audio('redSound', [
			'assets/audio/la.ogg',
			'assets/audio/la.mp3',
		]);
		this.load.audio('greenSound', [
			'assets/audio/mi.ogg',
			'assets/audio/mi.mp3',
		]);
		this.load.audio('winSound', [
			'assets/audio/win.ogg',
			'assets/audio/win.mp3',
		]);
		this.load.audio('loseSound', [
			'assets/audio/lose.ogg',
			'assets/audio/lose.mp3',
		]);


		this.load.spritesheet(
			'yellowBtn',
			'assets/images/sheetBtnAmarNota.png',
			287,
			293,
			3,
			1,
			1
		);
		this.load.spritesheet(
			'blueBtn',
			'assets/images/sheetBtnAzulNota.png',
			287,
			293,
			3,
			1,
			1
		);
		this.load.spritesheet(
			'redBtn',
			'assets/images/sheetBtnRojoNota.png',
			287,
			293,
			3,
			1,
			1
		);
		this.load.spritesheet(
			'greenBtn',
			'assets/images/sheetBtnVerdeNota.png',
			287,
			293,
			3,
			1,
			1
		);

		this.load.text('config', 'assets/data/simon.json');
	},
	create: function () {
		this.state.start('GameState');
	},
};

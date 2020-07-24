var SimonGame = SimonGame || {};

SimonGame.GameState = {
	init: function () {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		// this.stage.disableVisibilityChange = true;
	},
	preload: function () {
		// this.load.image('ground', 'assets2/images/ground.png');
		this.load.image('base', 'assets/images/fondoNivel.png');
		this.load.image('background', 'assets/images/fondo.jpg');

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
		this.config = JSON.parse(this.game.cache.getText('config'));

		this.background = this.add.sprite(0, 0, 'background');

		this.base = this.add.sprite(
			this.game.world.centerX,
			this.game.world.centerY,
			'base'
		);
		this.base.anchor.setTo(0.5);
		this.base.scale.setTo(0.5);

		this.yellowBtn = this.add.sprite(
			this.game.world.centerX + this.config.yellowSprite.x,
			this.game.world.centerY + this.config.yellowSprite.y,
			'yellowBtn',
			1
		);
		this.yellowBtn.scale.setTo(0.5);
		this.yellowBtn.anchor.setTo(1, 0);
		this.yellowBtn.inputEnabled = true;
		this.yellowBtn.input.pixelPerfectClick = true;
		this.yellowBtn.events.onInputDown.add(this.pickButton, this);
		this.yellowBtn.animations.add('animate', [1, 2, 1], 5, false);

		this.blueBtn = this.add.sprite(
			this.game.world.centerX + this.config.blueSprite.x,
			this.game.world.centerY + this.config.blueSprite.y,
			'blueBtn',
			1
		);
		this.blueBtn.scale.setTo(0.5);
		this.blueBtn.anchor.setTo(0, 0);
		this.blueBtn.inputEnabled = true;
		this.blueBtn.input.pixelPerfectClick = true;
		this.blueBtn.events.onInputDown.add(this.pickButton, this);
		this.blueBtn.animations.add('animate', [1, 2, 1], 5, false);

		this.redBtn = this.add.sprite(
			this.game.world.centerX + this.config.redSprite.x,
			this.game.world.centerY + this.config.redSprite.y,
			'redBtn',
			1
		);
		this.redBtn.scale.setTo(0.5);
		this.redBtn.anchor.setTo(0, 1);
		this.redBtn.inputEnabled = true;
		this.redBtn.input.pixelPerfectClick = true;
		this.redBtn.events.onInputDown.add(this.pickButton, this);
		this.redBtn.animations.add('animate', [1, 2, 1], 5, false);

		this.greenBtn = this.add.sprite(
			this.game.world.centerX + this.config.greenSprite.x,
			this.game.world.centerY + this.config.greenSprite.y,
			'greenBtn',
			1
		);
		this.greenBtn.scale.setTo(0.5);
		this.greenBtn.anchor.setTo(1, 1);
		this.greenBtn.inputEnabled = true;
		this.greenBtn.input.pixelPerfectClick = true;
		this.greenBtn.events.onInputDown.add(this.pickButton, this);
		this.greenBtn.animations.add('animate', [1, 2, 1], 5, false);
	},
	update: function () {},
	pickButton: function (sprite, event) {
		console.log(`activado`, sprite.key);
		sprite.play('animate')

	},
};

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
		this.load.image('tablero', 'assets/images/panelInfoNivel.png');
		this.load.image('1', 'assets/images/1.png');
		this.load.image('2', 'assets/images/2.png');
		this.load.image('3', 'assets/images/3.png');
		this.load.image('go', 'assets/images/go.png');

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
		var framePerSec = 5;
		this.config = JSON.parse(this.game.cache.getText('config'));

		this.background = this.add.sprite(0, 0, 'background');

		this.base = this.add.sprite(
			this.game.world.centerX,
			this.game.world.centerY,
			'base'
		);
		this.base.anchor.setTo(0.5);
		this.base.scale.setTo(0.5);

		this.tablero = this.add.sprite(
			this.game.world.centerX,
			40,
			'tablero'
		);
		this.tablero.anchor.setTo(0.5);
		this.tablero.scale.setTo(0.8);

		var style = {
			font: 'bold 25pt Arial',
			fill: '#000',
			align: 'center',
		};
		this.score = this.game.add.text(
			this.game.world.centerX + 145,
			42,
			'',
			style
		);
		this.score.anchor.setTo(0.5);
		this.score.visible = true;

		// this.yellowBtn = this.add.sprite(
		// 	this.game.world.centerX + this.config.yellowSprite.x,
		// 	this.game.world.centerY + this.config.yellowSprite.y,
		// 	'yellowBtn',
		// 	1
		// );
		// this.yellowBtn.scale.setTo(0.5);
		// this.yellowBtn.anchor.setTo(1, 0);
		// this.yellowBtn.inputEnabled = true;
		// this.yellowBtn.input.pixelPerfectClick = true;
		// this.yellowBtn.events.onInputDown.add(this.animateButton, this);
		// this.yellowAnim = this.yellowBtn.animations.add(
		// 	'animate',
		// 	[2, 1],
		// 	framePerSec,
		// 	false
		// );

		// this.blueBtn = this.add.sprite(
		// 	this.game.world.centerX + this.config.blueSprite.x,
		// 	this.game.world.centerY + this.config.blueSprite.y,
		// 	'blueBtn',
		// 	1
		// );
		// this.blueBtn.scale.setTo(0.5);
		// this.blueBtn.anchor.setTo(0, 0);
		// this.blueBtn.inputEnabled = true;
		// this.blueBtn.input.pixelPerfectClick = true;
		// this.blueBtn.events.onInputDown.add(this.animateButton, this);
		// this.blueAnim = this.blueBtn.animations.add(
		// 	'animate',
		// 	[2, 1],
		// 	framePerSec,
		// 	false
		// );

		// this.redBtn = this.add.sprite(
		// 	this.game.world.centerX + this.config.redSprite.x,
		// 	this.game.world.centerY + this.config.redSprite.y,
		// 	'redBtn',
		// 	1
		// );
		// this.redBtn.scale.setTo(0.5);
		// this.redBtn.anchor.setTo(0, 1);
		// this.redBtn.inputEnabled = true;
		// this.redBtn.input.pixelPerfectClick = true;
		// this.redBtn.events.onInputDown.add(this.animateButton, this);
		// this.redAnim = this.redBtn.animations.add(
		// 	'animate',
		// 	[2, 1],
		// 	framePerSec,
		// 	false
		// );

		// this.greenBtn = this.add.sprite(
		// 	this.game.world.centerX + this.config.greenSprite.x,
		// 	this.game.world.centerY + this.config.greenSprite.y,
		// 	'greenBtn',
		// 	1
		// );
		// this.greenBtn.scale.setTo(0.5);
		// this.greenBtn.anchor.setTo(1, 1);
		// this.greenBtn.inputEnabled = true;
		// this.greenBtn.input.pixelPerfectClick = true;
		// this.greenBtn.events.onInputDown.add(this.animateButton, this);
		// this.greenAnim = this.greenBtn.animations.add(
		// 	'animate',
		// 	[2, 1],
		// 	framePerSec,
		// 	false
		// );

		this.buttons = this.game.add.group();
		var button;
		this.anims = [];
		this.buttonArr = []

		this.config.buttonData.forEach((element) => {
			button = this.buttons.create(
				this.game.world.centerX + element.x,
				this.game.world.centerY + element.y,
				element.key,
				1
			);

			button.customParams = {
				sound: this.game.add.audio(element.audio),
			};
			button.anchor.setTo(element.anchorX, element.anchorY);
			button.scale.setTo(0.5);

			button.inputEnabled = true;
			button.input.pixelPerfectClick = true;
			button.events.onInputDown.add(this.animateButton, this);

			this.anims.push(button.animations.add('animate', [2, 1], framePerSec, false));
			this.buttonArr.push(button);
		}, this);

		// this.anims = [this.yellowAnim, this.blueAnim, this.redAnim, this.greenAnim];
		// this.buttons = [this.yellowBtn, this.blueBtn, this.redBtn, this.greenBtn];

		this.uiBlocked = false;
		this.playerTurn = false;
		this.sequenceGame = [];
		this.sequencePlayer = [];
		this.posicion = 0;
		this.conteoInicial()
	},
	update: function () { },
	animateButton: function (sprite, event) {
		if (!this.uiBlocked) {
			this.uiBlocked = true;
			if (this.playerTurn) {
				this.checkArrays(sprite.key)
			}

			sprite.play('animate');

			this.anims.forEach((element) => {
				element.onComplete.add(() => {
					this.uiBlocked = false;
				}, this);
			}, this);

		}
	},
	createSequence: function () {
		console.log(`buttons: `, this.buttonArr);
		
		this.sequenceGame.push(
			this.buttonArr[this.game.rnd.integerInRange(0, 3)].key
		);
		this.playSequence(0)
	},
	playSequence: function (i) {

		if (i < this.sequenceGame.length) {
			this.game.time.events.add(
				Phaser.Timer.SECOND * 1,
				this.auxiliar,
				this,
				i
			);
		} else {
			this.game.time.events.add(
				Phaser.Timer.SECOND * 1,
				this.turnoJugador,
				this
			)
		}

		this.gameTurn = false;
	},
	auxiliar: function (i) {
		switch (this.sequenceGame[i]) {
			case 'yellowBtn':
				this.animateButton(this.buttonArr[0]);
				break;
			case 'blueBtn':
				this.animateButton(this.buttonArr[1]);
				break;
			case 'redBtn':
				this.animateButton(this.buttonArr[2]);
				break;
			case 'greenBtn':
				this.animateButton(this.buttonArr[3]);
				break;
		}
		this.playSequence(i + 1)
	},
	turnoJugador: function () {
		this.playerTurn = true;
		console.log(`Turno del jugador`);

	},
	checkArrays: function (button) {
		console.log(`Revisa jugada`);
		this.sequencePlayer.push(button);

		var playerS = JSON.stringify(this.sequencePlayer[this.posicion])
		var gameS = JSON.stringify(this.sequenceGame[this.posicion])


		if (playerS === gameS && this.posicion + 1 == this.sequenceGame.length) {
			console.log(`Win`, this.sequenceGame.length);
			this.score.setText(this.sequenceGame.length);

			this.playerTurn = false;
			this.sequencePlayer = []
			this.posicion = 0;
			this.createSequence()
		} else if (playerS != gameS) {
			this.game.state.start('GameState');
		} else {
			this.posicion++;
		}

	},
	conteoInicial: function () {
		var num1 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, '1')
		var num2 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, '2')
		var num3 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, '3')
		var go = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'go')
		num1.alpha = 0
		num2.alpha = 0
		go.alpha = 0
		num1.anchor.setTo(0.5)
		num2.anchor.setTo(0.5)
		num3.anchor.setTo(0.5)
		go.anchor.setTo(0.5)

		var movimiento3 = this.game.add.tween(num3.scale)
		var movimiento2 = this.game.add.tween(num2.scale)
		var movimiento1 = this.game.add.tween(num1.scale)
		var movimientoGo = this.game.add.tween(go.scale)
		movimiento3.to({ x: 4, y: 4 }, 450)
		movimiento3.to({ x: 1, y: 1 }, 450)
		movimiento2.to({ x: 4, y: 4 }, 450)
		movimiento2.to({ x: 1, y: 1 }, 450)
		movimiento1.to({ x: 4, y: 4 }, 450)
		movimiento1.to({ x: 1, y: 1 }, 450)
		movimientoGo.to({ x: 4, y: 4 }, 450)
		movimientoGo.to({ x: 1, y: 1 }, 450)
		movimiento3.onComplete.add(() => {
			num3.destroy()
			num2.alpha = 1
			movimiento2.start()
		})
		movimiento2.onComplete.add(() => {
			num2.destroy()
			num1.alpha = 1
			movimiento1.start()
		})
		movimiento1.onComplete.add(() => {
			num1.destroy()
			go.alpha = 1
			movimientoGo.start()
		})
		movimientoGo.onComplete.add(() => {
			go.destroy()
			this.createSequence()
		})
		movimiento3.start()

	}
};

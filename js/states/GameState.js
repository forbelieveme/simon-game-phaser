var SimonGame = SimonGame || {};

SimonGame.GameState = {
	init: function (highScore) {
		this.highScore = highScore || 0
	},
	create: function () {
		var framePerSec = 5;
		this.config = JSON.parse(this.game.cache.getText('config'));

		this.game.stage.backgroundColor = "#314e5b";

		this.base = this.add.sprite(
			this.game.world.centerX,
			this.game.world.centerY,
			'base'
		);
		this.base.anchor.setTo(0.5);
		this.base.scale.setTo(0.5);

		this.maxPuntaje = this.add.sprite(
			this.game.world.centerX + 100,
			50,
			'maxPuntaje'
		);
		this.maxPuntaje.anchor.setTo(0.5);
		this.maxPuntaje.scale.setTo(0.8);

		this.puntaje = this.add.sprite(
			this.game.world.centerX - 100,
			50,
			'puntaje'
		);
		this.puntaje.anchor.setTo(0.5);
		this.puntaje.scale.setTo(0.8);


		// #376f7c
		var style = {
			font: '25pt Muro',
			fill: '#00000',
			align: 'center',
			// stroke: '#376f7c',
			// strokeThickness: 5
		};
		this.scoreText = this.game.add.text(
			this.game.world.centerX - 100,
			70,
			'0',
			style
		);
		this.scoreText.anchor.setTo(0.5);
		this.scoreText.visible = true;

		this.highScoreText = this.game.add.text(
			this.game.world.centerX + 100,
			70,
			this.highScore,
			style
		);
		this.highScoreText.anchor.setTo(0.5);
		this.highScoreText.visible = true;

		this.turno = this.add.sprite(
			this.game.world.centerX,
			this.game.world.centerY - 6,
			'turno'
		);
		this.turno.anchor.setTo(0.5);
		this.turno.scale.setTo(0.5);
		this.turno.alpha = 0;

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

			// button.inputEnabled = true;
			// button.input.pixelPerfectClick = true;
			button.events.onInputDown.add(this.animateButton, this);

			this.anims.push(button.animations.add('animate', [2, 1], framePerSec, false));
			button.animations.add('animate2', [2, 1], 3, false);
			this.buttonArr.push(button);
		}, this);

		this.winSound = this.game.add.audio('winSound')
		this.loseSound = this.game.add.audio('loseSound')

		this.uiBlocked = false;
		this.playerTurn = false;
		this.sequenceGame = [];
		this.sequencePlayer = [];
		this.posicion = 0;
		this.conteoInicial()
	},
	update: function () { },
	animateButton: function (sprite, event) {
		console.log(`Blocked:`, !this.uiBlocked);

		if (!this.uiBlocked) {
			this.uiBlocked = true;
			if (this.playerTurn) {
				this.checkArrays(sprite.key)
			}
			this.anims.forEach((element) => {
				element.onComplete.add(() => {
					this.uiBlocked = false;
				}, this);
			}, this);

			sprite.play('animate');
			sprite.customParams.sound.play();
		}
	},
	createSequence: function () {
		this.sequenceGame.push(
			this.buttonArr[this.game.rnd.integerInRange(0, 3)].key
		);
		this.buttons.setAll('inputEnabled', false)
		this.playSequence(0)
	},
	playSequence: function (i) {
		// this.buttons.setAll('input.pixelPerfectClick', false)
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
		this.turno.alpha = 1
		this.buttons.setAll('inputEnabled', true)
		this.buttons.setAll('input.pixelPerfectClick', true)
		// button.inputEnabled = true;
		// button.input.pixelPerfectClick = true;

	},
	checkArrays: function (button) {
		console.log(`Revisa jugada`);
		this.sequencePlayer.push(button);

		var playerS = JSON.stringify(this.sequencePlayer[this.posicion])
		var gameS = JSON.stringify(this.sequenceGame[this.posicion])

		if (playerS === gameS && this.posicion + 1 == this.sequenceGame.length) {
			this.game.time.events.add(
				Phaser.Timer.SECOND * 0.65,
				this.win,
				this
			)
		} else if (playerS != gameS) {
			// this.uiBlocked = true
			this.game.time.events.add(
				Phaser.Timer.SECOND * 0.65,
				this.lose,
				this
			)
		} else {
			this.posicion++;
		}

	},
	conteoInicial: function () {
		var num1 = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 10, 'contador')
		num1.frame = 2
		var num2 = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 10, 'contador')
		num2.frame = 1
		var num3 = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 10, 'contador')
		num3.frame = 0
		num1.alpha = 0
		num2.alpha = 0
		num1.anchor.setTo(0.5)
		num2.anchor.setTo(0.5)
		num3.anchor.setTo(0.5)
		num1.scale.setTo(0.4)
		num2.scale.setTo(0.4)
		num3.scale.setTo(0.4)

		var movimiento3 = this.game.add.tween(num3.scale)
		var movimiento2 = this.game.add.tween(num2.scale)
		var movimiento1 = this.game.add.tween(num1.scale)
		var escalaConteo = 0.8
		var escalaInicial = 0.4
		movimiento3.to({ x: escalaConteo, y: escalaConteo }, 450)
		movimiento3.to({ x: escalaInicial, y: escalaInicial }, 450)
		movimiento2.to({ x: escalaConteo, y: escalaConteo }, 450)
		movimiento2.to({ x: escalaInicial, y: escalaInicial }, 450)
		movimiento1.to({ x: escalaConteo, y: escalaConteo }, 450)
		movimiento1.to({ x: escalaInicial, y: escalaInicial }, 450)
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
			this.createSequence()
		})
		movimiento3.start()

	},
	win: function () {
		console.log(`Win`, this.sequenceGame.length);
		this.turno.alpha = 0;
		this.winSound.play()
		this.scoreText.setText(this.sequenceGame.length);

		this.playerTurn = false;
		this.sequencePlayer = []
		this.posicion = 0;
		this.createSequence()
	},
	lose: async function () {
		this.loseSound.play()
		this.uiBlocked = true
		this.juega = this.add.sprite(
			this.game.world.centerX,
			this.game.world.height - 80,
			'juega'
		);
		this.juega.anchor.setTo(0.5);
		this.juega.scale.setTo(0.5);
		this.juega.inputEnabled = true;
		await envioPuntaje(SimonGame.game.customParams.cedula, this.sequenceGame.length - 1)
		this.juega.events.onInputDown.add(this.restart, this);
	},
	restart: function () {
		var max;
		(this.highScore > this.sequenceGame.length - 1)
			? max = this.highScore : max = this.sequenceGame.length - 1;
		this.game.state.start('GameState', true, false, max);
	}
};

async function envioPuntaje(cedula, puntaje) {
	let result;
	try {
		result = await $.ajax({
			url: 'php/Partida.php',
			data: {
				query: 'guardarPuntaje',
				cedula,
				puntaje,
			},
			type: 'POST',
		})
		return result;
	} catch (error) {
		console.error(error);
	}
}
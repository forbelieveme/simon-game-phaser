var SimonGame = SimonGame || {};

SimonGame.BootState = {
	init: function () {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	},
	preload: function () {
		this.load.image('preloadBar', 'assets/images/bar.png');
	},
	create: function () {
		this.game.stage.backgroundColor = '#fff';
		this.game.add.text(0, 0, "hack", {font:"1px Muro", fill:"#FFFFFF"});

		this.state.start('PreloadState');
	},
};

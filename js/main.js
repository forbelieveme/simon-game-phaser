var SimonGame = SimonGame || {};

SimonGame.game = new Phaser.Game(960, 506, Phaser.AUTO);

SimonGame.game.state.add('GameState', SimonGame.GameState);
SimonGame.game.state.start('GameState');

var SimonGame = SimonGame || {};

SimonGame.game = new Phaser.Game(960, 506, Phaser.AUTO, 'game_block');

SimonGame.game.state.add('GameState', SimonGame.GameState);
SimonGame.game.state.add('BootState', SimonGame.BootState);
SimonGame.game.state.add('PreloadState', SimonGame.PreloadState);
SimonGame.game.state.start('BootState');

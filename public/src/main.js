import {
    Game,
    GameStageManager,
    InputManager,
    AssetsManager,
    MusicPlayer
} from './ezLib.js';

import {IntroStage} from './intro_stage.js';

const canvas = document.getElementById('game_screen');
export const gMusicPlayer = new MusicPlayer();
export const gameStageManager = new GameStageManager();
export const gInputManager = new InputManager();
export const gAssetsManager = new AssetsManager();

const game = new Game(canvas, gameStageManager, gInputManager);

async function chargeAssets() {
    console.log('charge assets');

    gAssetsManager.putImage(
        'jungle',
        await game.loadImage('./assets/images/jungle.png')
    );

    gAssetsManager.putImage(
        'bullet',
        await game.loadImage('./assets/images/bullet.png')
    );

    gAssetsManager.putImage(
        'eagle',
        await game.loadImage('./assets/images/eagle.png')
    );

    gAssetsManager.putImage(
        'explosion',
        await game.loadImage('./assets/images/explosion.png')
    );

    gAssetsManager.putImage(
        'gameOver',
        await game.loadImage('./assets/images/gameOver.png')
    );
    
    gAssetsManager.putImage(
        'heart',
        await game.loadImage('./assets/images/heart.png')
    );
    
    gAssetsManager.putImage(
        'missile',
        await game.loadImage('./assets/images/missile.png')
    );

    gAssetsManager.putImage(
        'nuage',
        await game.loadImage('./assets/images/nuage.png')
    );

    gAssetsManager.putImage(
        'nuage1',
        await game.loadImage('./assets/images/nuage1.png')
    );

    gAssetsManager.putImage(
        'particle',
        await game.loadImage('./assets/images/particle.png')
    );

    gAssetsManager.putImage(
        'ship',
        await game.loadImage('./assets/images/ship.png')
    );

    gAssetsManager.putImage(
        'shield',
        await game.loadImage('./assets/images/shield.png')
    );
    
    gAssetsManager.putSound(
		'boom',
		await game.loadSound('./assets/sounds/boom.wav', false)
	);

    gAssetsManager.putSound(
		'catch',
		await game.loadSound('./assets/sounds/catch.wav', false)
    );
    
    gAssetsManager.putSound(
		'laser',
		await game.loadSound('./assets/sounds/laser.wav', false)
    );
    
    gameStageManager.pushStage(new IntroStage(canvas.width, canvas.height));  

    game.start();
}

chargeAssets();
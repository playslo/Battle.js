import { gameStageManager, gAssetsManager, gInputManager, gMusicPlayer } from './main.js';
import { Stage,  ScoreManager} from './ezLib.js';
import { Ship } from './ship.js';
import { Flotte } from './eagle.js';
import { ConcluStage } from './conclu_stage.js';
import { Heart } from './heart.js';
import { Bullet } from './bullet.js';
import { Scrolling } from './scrolling.js';
import { Nuage1, Nuage2 } from './nuages.js';
import { Shield } from './shiled.js';

export class GameStage extends Stage {
	//
	constructor(screenWidth, screenHeight) {
		super(screenWidth, screenHeight);
        this.score = new ScoreManager(this.screenWidth, this.screenHeight);
		this.ship = new Ship(this.screenWidth, this.screenHeight, this.score);
		this.heart = new Heart(screenWidth, this.ship, this.score);		
		this.scrolling = new Scrolling(this.screenHeight);	
		this.bullet = new Bullet(this.ship.getCenterX(), this.ship.getTop(), 
									this.screenWidth, this.screenHeight,
									this.ship, this.score, 1);
		this.bullet2 = new Bullet(this.ship.getCenterX() -10, this.ship.getTop(), 
									this.screenWidth, this.screenHeight,
									this.ship, this.score, -1);
		this.flotte = new Flotte(this.screenWidth, this.screenHeight, this.ship, this.bullet, this.bullet2, this.score)
		this.nuage1 = new Nuage1(this.screenWidth, this.screenHeight);
		this.nuage2 = new Nuage2(this.screenWidth, this.screenHeight);
		this.shield = new Shield(this.screenWidth, this.ship, this.score);
		
	}

	//
	onEnter(params = undefined) {
		if (params) {
			console.log(params.name);
			this.score.setName(params.name);
		}
		//
		gMusicPlayer.play('./assets/musics/nightcall.ogg', 0.5, true);
	}

	//
	onExit() {
		gMusicPlayer.stop();
	}

	//
	update(dt) {
		//input
		//
		if (this.ship.state == 'LIVE') {
				
			if (gInputManager.isKeyPressed('ArrowLeft')) {
				this.ship.moveLeft();
			}
			//
			else if (gInputManager.isKeyPressed('ArrowRight')) {
				this.ship.moveRight();
			}
			if (gInputManager.isKeyPressed('ArrowUp')) {
				this.ship.moveUp();
			}
			//
			else if (gInputManager.isKeyPressed('ArrowDown')) {
				this.ship.moveDown();
			}
			//
			if (gInputManager.isKeyReleased('ArrowLeft')) {
				this.ship.stopx();
			}
			//
			else if (gInputManager.isKeyReleased('ArrowRight')) {
				this.ship.stopx();
			}
			if (gInputManager.isKeyReleased('ArrowUp')) {
				this.ship.stopy();
			}
			//
			else if (gInputManager.isKeyReleased('ArrowDown')) {
				this.ship.stopy();
			}
			
			if(gInputManager.isKeyPressed('Space') && this.bullet.ableshot == 1 
			&& this.bullet2.ableshot == 1) {
				this.bullet.tir();
				this.bullet2.tir();
			}
		}

		this.nuage1.update(dt);
		this.nuage2.update(dt);
        
		this.ship.update(dt);
		this.scrolling.update(dt);
		this.flotte.update(dt);

		this.bullet.update(dt);
		this.bullet.range();
		
		
		this.bullet2.update(dt);
		this.bullet2.range();

		if(this.heart) {
			this.heart.update(dt);
			this.heart.collideShip(this.ship);
		}

		this.shield.update(dt);
		this.shield.collideShip(this.ship);

		if(this.heart.state === 'UNVISIBLE' && Math.random() < 0.01) {
			if(Math.random() < 0.1) {
					this.heart = new Heart(this.screenWidth, this.ship, this.score);
			}
		}
		//Methode pour faire apparaitre aleatoirement des cosurs = 1 toute les minutes en moyenne
		if(this.shield.state === 'UNVISIBLE' && Math.random() < 0.01) {
			if(Math.random() < 0.1) {
				this.shield = new Shield(this.screenWidth, this.ship, this.score);
			}
		}

		if (this.score.isGameOver()) {
			//
			const datas = {
				name: this.score.getName(),
				points: this.score.getPoints(),
			};

			//
			gameStageManager.changeStage(
				new ConcluStage(this.screenWidth, this.screenHeight),
				datas
			);
		}

		
	}

	//
	render(ctx) {
		this.scrolling.render(ctx);
		this.nuage1.render(ctx);
		this.nuage2.render(ctx);
		this.score.render(ctx);
		if(this.heart) {
			this.heart.render(ctx);
		}
		this.bullet.render(ctx);
		this.bullet2.render(ctx);
		this.flotte.render(ctx);
		this.shield.render(ctx);
		this.ship.render(ctx);
    }
	//end stage
}
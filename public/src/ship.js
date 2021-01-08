import { Entity, Animation, ParticulesGenerator } from './ezLIb.js';
import { gAssetsManager } from './main.js';

//
export class Ship extends Entity {
	//
	constructor(screenWidth, screenHeight, score) {
		//
		super(screenWidth / 2 , screenHeight - 200, gAssetsManager.getImage('ship'));

		this.score = score;
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;

		this.velocity.x = 0;
        this.velocity.y = 0;
        this.speedModule = 200;
        this.shield = 0;
        this.xd = this.screenWidth - 100;
       
        this.explosion = new Animation(
			gAssetsManager.getImage('explosion'),
			102,
			102,
			0.02,
			false
        );        
        this.state = 'LIVE';

        this.gaz = new ParticulesGenerator(screenWidth / 2 +25, screenHeight - 200 + 50, 5, 100, 2, 1);
		this.gaz.start();
    }

    edges() {
		//left
		if (this.position.x < 0) {
			this.position.x = 0;
        }
        
        if (this.position.y < 0) {
			this.position.y = 0;
        }

        if (this.getBottom() >= this.screenHeight) {
			this.setBottom(this.screenHeight);
		}

		//right
		if (this.getRight() >= this.screenWidth) {
			this.setRight(this.screenWidth);
		}
    }
    
    stopx() {
        this.velocity.x = 0;
    }

    stopy() {
        this.velocity.y = 0;
    }

    moveRight() {
        this.velocity.x = this.speedModule;
    }
     
    moveLeft() {
        this.velocity.x = -this.speedModule;
    }
    moveUp() {
        this.velocity.y = -this.speedModule;
    }
    moveDown(){
        this.velocity.y = this.speedModule;
    }
    touched() {
        this.state = 'TOUCHED';
        this.explosion.play();
        if(this.shield == 0) {
            this.score.decrementsLives();
        }
        else if (this.shield > 0) {
            this.shield--;
        }
    }

    touchedshield() {
        if(this.shield < 3) {
            this.shield++;
        }
    }
	
	update(dt) {
        super.update(dt);
        this.explosion.update(dt);
        this.edges();
        if(this.explosion.isPlaying() == false) {
            this.state = 'LIVE';
        }
        this.gaz.move(this.position.x +25, this.position.y + 50);
        this.gaz.update(dt);
        
        if(this.state === 'TOUCHED') {
            this.stopx();
            this.stopy();
        }
	}
	//
	render(ctx) {
        if(this.state === 'TOUCHED') {
            this.explosion.render(ctx, this.position.x, this.position.y);
        }
        else {
            this.gaz.render(ctx);
            super.render(ctx);
           // super.renderDebug(ctx);
        }
        ctx.fillStyle = 'rgb(30,144,255)';
        
        if (this.shield > 0) {
			for (let i = 0; i < this.shield; i++) {
				ctx.beginPath();
				ctx.arc(this.xd + 25 * i, 45, 10, 0, Math.PI * 2);
                ctx.fill();
                
			}
		}
	}
}
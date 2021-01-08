import { Entity, Animation, ParticulesGenerator } from './ezLIb.js';
import { gAssetsManager } from './main.js';
import { Missile } from './missile.js';

export class Eagle extends Entity {
	//
	constructor(screenWidth, screenHeight, ship, score) {
		//
		super(Math.random() * screenWidth, -100, gAssetsManager.getImage('eagle'));

        this.score = score;
        this.ship = ship;
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;

		this.velocity.x = 0;
        this.velocity.y = 0;
        this.speedModule = 100;
        this.speedModuleX = 60;

        this.shots = 1;
        this.cmp = 1;

        this.explosion = new Animation(
         	gAssetsManager.getImage('explosion'),
           	102,
           	102,
           	0.02,
           	false
        ); 

        this.state = 'VISIBLE';
        this.inflate(5,5);
        this.gaz = new ParticulesGenerator(this.position.x + 25, this.position.y ,5, 20, 6.6, 1.5);
		this.gaz.start();
    }

    edges() {
		if (this.position.x < 0) {
            this.position.x = 0;
            this.speedModuleX *= -1;
        }

        if (this.getTop() >= this.screenHeight + 200) {
			this.state = 'UNVISIBLE';
		}

		if (this.getRight() >= this.screenWidth) {
            this.setRight(this.screenWidth);
            this.speedModuleX *= -1;
		}
    }

    touched() {
        this.state = 'TOUCHED';
        this.explosion.play();
    }
    
    shot() {
        if (this.position.y > 20 && this.position.y < 300 && this.shots > 0 && this.state === 'VISIBLE') {
            if(Math.random() < 0.01) {
                this.missile = new Missile(this.position.x, this.position.y, this.ship, this.score);
                this.shots--;
                gAssetsManager.getSound('laser').load();
			    gAssetsManager.getSound('laser').play();
                return;
            } 
        }
        else if(this.position.y > 300 && this.shots != 0 && this.state === 'VISIBLE') {
            this.missile = new Missile(this.position.x, this.position.y, this.ship, this.score);
            this.shots--;
            gAssetsManager.getSound('laser').load();
			gAssetsManager.getSound('laser').play();    
        }
    }

    reset() {
        this.position.x = Math.random() * this.screenWidth;
        this.position.y = -100;
        this.shots = 1;
        this.state = 'VISIBLE'
    }
    
    stopx() {
        this.velocity.x = 0;
    }
    stopy() {
        this.velocity.y = 0;
    }
    moves() {
        this.velocity.x = this.speedModuleX;
        this.velocity.y = this.speedModule;
    }

    reverseX(dt) {
        if(dt % 200 == 0) {
            this.speedModuleX *= -1;
        }
    }

    update(dt) {
        super.update(dt);
        this.edges();
        this.explosion.update(dt);
        if (this.state === 'VISIBLE') {
            this.reverseX(this.cmp);
            this.cmp++;
            this.moves();
        }
       
        if(this.position.y >= this.screenHeight +200) {
            this.reset();
        }

        if(this.state === 'TOUCHED' && this.explosion.isPlaying() == false) {
            this.state = 'UNVISIBLE';
            this.moves();
        }

        this.gaz.move(this.position.x +25, this.position.y);
        this.gaz.update(dt);
        
        if(this.state === 'TOUCHED') {
            this.stopx();
            this.stopy();
        }
    }
    
	render(ctx) {
            if(this.state === 'TOUCHED') {
                this.explosion.render(ctx, this.position.x, this.position.y);
            }
            else if(this.state === 'VISIBLE') {
                if(this.position.y < this.screenHeight) {
                    this.gaz.render(ctx);
                }
                super.render(ctx);
            }
        }
}

export class Flotte {
    constructor(screenWidth, screenHeight, ship, bullet1, bullet2, score){
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
        this.ship = ship;
        this.bullet1 = bullet1;
        this.bullet2 = bullet2;
        this.score = score;
        this.eagles = new Array(20);
        this.NewEalge = 0;
        this.n = 1;
        this.eagles[0] = new Eagle(this.screenWidth, this.screenHeight, this.ship, this.score);
    }

    collideTout() {
        //bullets
        for(let i = 0; i<this.n; i++) {
            let item = this.eagles[i];
            if (this.bullet1.collides(item) && item.state === 'VISIBLE' && this.bullet1.state === 'VISIBLE') {
                item.state = 'UNVISIBLE';
                this.score.incrementsPoints(10);
                item.stopx();
                item.stopy();
                this.bullet1.state = 'UNVISIBLE';
                gAssetsManager.getSound('boom').load();
                gAssetsManager.getSound('boom').play();
                item.touched();
            }
            if (this.bullet2.collides(item) && item.state === 'VISIBLE' && this.bullet1.state === 'VISIBLE') {
                item.state = 'UNVISIBLE';
                this.score.incrementsPoints(10);
                item.stopx();
                item.stopy();
                this.bullet1.state = 'UNVISIBLE';
                gAssetsManager.getSound('boom').load();
                gAssetsManager.getSound('boom').play();
                item.touched();
            }
            //ship
            if (item.collides(this.ship) && item.state == 'VISIBLE') {
                item.state = 'UNVISIBLE';
                gAssetsManager.getSound('boom').load();
                gAssetsManager.getSound('boom').play();
                this.ship.touched();
                item.touched();
            }
        }
    }

    createEagle(X) { 
		if(X % 900 == 0 && this.n < 20) {
            this.eagles[this.n] = new Eagle(this.screenWidth, this.screenHeight, this.ship, this.score);
            this.n++;
		}
    }

    update(dt) {
	    for(let i = 0; i<this.n; i++) {
			this.eagles[i].update(dt);
            this.eagles[i].shot();
            if(this.eagles[i].missile) {
                this.eagles[i].missile.update(dt);
            }
        }
        this.NewEalge++;
        this.createEagle(this.NewEalge);
        this.collideTout(this.bullet1, this.bullet2, this.ship);
    }

    render(ctx) {
        for(let i = 0; i < this.n; i++) {
            this.eagles[i].render(ctx);
			if(this.eagles[i].missile) {
				this.eagles[i].missile.render(ctx);
			}
		}
    }
}
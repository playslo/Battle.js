import { Entity } from './ezLIb.js';
import { gAssetsManager } from './main.js';

export class Missile extends Entity {
    constructor(posXeagle, posYeagle, ship, score) {
        super(posXeagle, posYeagle, gAssetsManager.getImage('missile'));
        this.velocity.y = 0;
        this.ship = ship;
        this.score = score;
        this.speedModule = 200;
        this.state = 'VISIBLE';
    }

    edges() {
        if (this.getTop() >= this.screenHeight) {
            this.state = 'UNVISIBLE';
            console.log('yes');
        }
    }

    move() {
        this.velocity.y = this.speedModule;
    }

    collideShip() {
       if(this.state === 'VISIBLE' && this.ship.state === 'LIVE') {
            if (this.collides(this.ship)) {
                this.stop();
                this.state = 'UNVISIBLE';
                this.ship.touched();
            }
        }
    }

    stop() {
        this.velocity.y = 0;
    }

    update(dt) {
        super.update(dt);
        this.move();
        this.collideShip(this.ship);
        this.edges();
    }

    render(ctx) {
        if(this.state === 'VISIBLE') {
            super.render(ctx);
        }
    }
}


export class Missiles {
    constructor(screenWidth, screenHeight, ship, score) {
        this.row = 100;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.missiles = new Array(this.row);
        this.score = score;
        this.ship = ship;
    }

    createMissiles() {
        this.missiles[0] = new Missile(this.screenWidth);
        this.missiles[0].state = 'UNVISIBLE';
        if(Math.random() > 0.9) {
			for(let i = 0; i < 100; i++) {
				if(this.missiles[i].state) {
                    if(this.missiles[i].state != 'VISIBLE') {
                        this.missiles[i] = new Missile(this.screenWidth);
                        return;
                    }
                }
			}
		} 
    }

    collideShip() {
        for(let i = 0; i < 100; i++) {
            let item = this.missiles[i];        
            if(item && item.state === 'VISIBLE') {
                if (this.ship.collides(item)) {
                    this.ship.touched();
                    item.stop();
                    item.state = 'UNVISIBLE';
                }
            }
        }
    }

    move() {
        this.missiles[0] = new Missile(this.screenWidth);
        this.missiles[0].state = 'UNVISIBLE';
		for(let i = 0; i < 100; i++) {
			if(this.missiles[i].state) {
                if(this.missiles[i].state === 'VISIBLE') {
                    this.missiles[i].move();
                }
                else {
                    this.missiles[i].stop();
                }
            }
        }
    }       
    render(ctx) {
        for(let i = 0; i < 100; i++) {
            let item = this.missiles[i];
            if(item) {
                if(this.missiles[i].state === 'VISIBLE') {
                    this.missiles[i].render(ctx);
                }
            }
        }
    }
}
import { Entity } from './ezLIb.js';
import { gAssetsManager } from './main.js';

export class Bullet extends Entity {
    constructor (posXship, posYship, screenWidth, screenHeight, ship,    score, remove) {
        super(posXship, posYship, gAssetsManager.getImage('bullet'));
        this.ship = ship;
        this.score = score;
        this.remove = remove;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight; 
        this.portee = 200;
        this.posXship = posXship;
        this.posYship = posYship;
        this.state = 'UNVISIBLE';
        this.velocity.x = 0;
        this.velocity.y = 0;
        if(this.remove == 1) { 
            this.speedModuleX = 100; 
        }
        else { 
            this.speedModuleX = -50; 
        }
        this.speedModuleY = -300;
        this.ableshot = 1;
    }
    
    getpos() {
        this.posXship = this.ship.position.x;
        this.posYship = this.ship.position.y;
    }

    tir() {
        if(this.ableshot == 1) {
            this.ableshot = 0;
            this.getpos();
            this.state = 'VISIBLE';
            this.position.x = this.ship.getCenterX() -5;
            this.position.y = this.ship.position.y;
            this.velocity.x = this.speedModuleX;
            this.velocity.y = this.speedModuleY;
        }
    }


    range() {
        if(this.position.y < this.posYship - this.portee) {
            this.state = 'UNVISIBLE';
        }
    }

    stop() {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    edges() {
        if (this.position.x < 0 || this.position.y < 0 || 
            this.getBottom() >= this.screenHeight ||  
            this.getRight() >= this.screenWidth) {
			this.state = 'UNVISIBLE';
        }
    }

    update(dt) {
        if(this.state === 'VISIBLE') {
            super.update(dt);
            this.edges();
            this.ableshot = 0;
        }
        else {
            this.ableshot = 1;
        }
    }

    render(ctx) {
        if(this.state === 'VISIBLE') {
            super.render(ctx);
            //super.renderDebug(ctx);
        }
    }
}
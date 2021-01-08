import { Entity } from './ezLIb.js';
import { gAssetsManager } from './main.js';

export class Shield extends Entity {
    constructor(screenWidth, ship, score) {
        super(Math.random() * screenWidth, 0, gAssetsManager.getImage('shield'));
        this.velocity.y = 0;
        this.velocity.x = 0;
        this.ship = ship;
        this.score = score;
        this.speedModuleY = 100;
        this.speedModuleX = 20;
        this.state = 'VISIBLE';
    }

    move() {
        this.velocity.y = this.speedModuleY;
        this.velocity.x = this.speedModuleX
    }

    stop() {
        this.velocity.y = 0;
        this.velocity.x = 0;
    }

    reset() {
        this.state = 'VISIBLE';
        this.setCenterY(-20);
        this.setCenterX(Math.random() * this.screenWidth);
    }

    update(dt) {
        super.update(dt);
        if(this.state === 'VISIBLE') {
            this.move();
        }
    }

    collideShip() {
        if (this.collides(this.ship) && this.state == 'VISIBLE') {
            this.state = 'UNVISIBLE';
            this.ship.touchedshield();
            gAssetsManager.getSound('catch').load();
            gAssetsManager.getSound('catch').play();
        }
    }

    render(ctx) {
        if(this.state === 'VISIBLE') {
            super.render(ctx);
            //super.renderDebug(ctx);
        }
    }
}

//Ship creer une reserve de shield On peut en avoir 3 au max et prendre une image de rond bleu sur internet place en dessous de la barre de vie
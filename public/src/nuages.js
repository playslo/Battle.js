import { Entity } from './ezLIb.js';
import { gAssetsManager } from './main.js';

export class Nuage1 extends Entity {
    constructor(screenWidth, screenHeight) {
        super(Math.random() * screenWidth,-100, gAssetsManager.getImage('nuage'));
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.speedModule = 60;
        this.speedModuleX = 60;
        this.cmp = 1;
    }

    edges() {
		if (this.position.x < 0) {
            this.position.x = 0;
            this.speedModuleX *= -1;
        }

		if (this.getRight() >= this.screenWidth) {
            this.setRight(this.screenWidth);
            this.speedModuleX *= -1;
		}
    }

    reset() {
        this.position.x = Math.random() * this.screenWidth;
        this.position.y = -100;
        this.shots = 1;
    }

    moves() {
        this.velocity.x = this.speedModuleX;
        this.velocity.y = this.speedModule;
    }
    reverseX(dt) {
        if(dt % 400 == 0) {
            this.speedModuleX *= -1;
        }
    }

    update(dt) {
        this.moves();
        super.update(dt);
        this.edges();
        this.reverseX(this.cmp);
        this.cmp++;

        if(this.position.y >= this.screenHeight) {
            this.reset();
        }
    }

    render(ctx) {
        super.render(ctx);
            //super.renderDebug(ctx);
    }
}

export class Nuage2 extends Entity {
    constructor(screenWidth, screenHeight) {
        super(Math.random() * screenWidth,-100, gAssetsManager.getImage('nuage1'));
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.speedModule = 100;
        this.speedModuleX = 60;
        this.cmp = 1;
    }

    edges() {
		if (this.position.x < 0) {
            this.position.x = 0;
            this.speedModuleX *= -1;
        }
		if (this.getRight() >= this.screenWidth) {
            this.setRight(this.screenWidth);
            this.speedModuleX *= -1;
		}
    }

    reset() {
        this.position.x = Math.random() * this.screenWidth;
        this.position.y = -100;
        this.shots = 1;
    }

    moves() {
        this.velocity.x = this.speedModuleX;
        this.velocity.y = this.speedModule;
    }
    reverseX(dt) {
        if(dt % 400 == 0) {
            this.speedModuleX *= -1;
        }
    }

    update(dt) {
        this.moves();
        super.update(dt);
        this.edges();
        this.reverseX(this.cmp);
        this.cmp++;
        if(this.position.y >= this.screenHeight) {
            this.reset();
        }
    }

    render(ctx) {
        super.render(ctx);
            //super.renderDebug(ctx);
    }
}
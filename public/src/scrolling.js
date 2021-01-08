import { Entity } from './ezLIb.js';
import { gAssetsManager } from './main.js';

export class Scrolling extends Entity { 
    constructor(screenHeight) {
        super(0,0, gAssetsManager.getImage('jungle'));
        this.screenHeight = screenHeight;
        this.position = {x:0, y:0};
        this.velocity = 2;
        this.img = gAssetsManager.getImage('jungle');
    }

    update(dt) {
        this.position.y += this.velocity;
        if(this.getTop() >= 0) {
            this.setBottom(this.screenHeight); 
        }
    }

    render(ctx) {
        ctx.drawImage(this.img, this.position.x, this.position.y);
    }
}
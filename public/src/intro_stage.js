//
import {
	gAssetsManager,
	gameStageManager,
	gInputManager,
	gMusicPlayer
} from './main.js';

import { Stage, Label, MoveLabel } from './ezLib.js';

import { GameStage } from './game_stage.js';

//
export class IntroStage extends Stage {
	//
	constructor(screenWidth, screenHeight) {
		super(screenWidth, screenHeight);

		this.title = new MoveLabel('Battle.js', 200, -50, 60);
		this.title.setSpeeds(0, 300);
		this.title.setFinals(200, 80);

		this.com = new MoveLabel(
			'Press Space to Start',
			-100,
			this.screenHeight - 50,
			30
		);

		this.com.setSpeeds(400, 0);
		this.com.setFinals(200, this.screenHeight - 50);

		this.nameLabel = new Label('AAA', 70);

		this.tab = [65, 65, 65];
		this.indice = 0;
		this.timer = 0;
		this.toggle = true;

		this.name = '---';
	}

	//
	onEnter(params) {
		//console.log('onEnter');
		gMusicPlayer.play('./assets/musics/walking.ogg', 0.5, true);
	}

	//
	onExit() {
		gMusicPlayer.stop();
	}

	//
	update(dt) {
		this.timer += dt;
		//
		this.title.update(dt);
		this.com.update(dt);
		//
		if (this.timer > 0.4) {
			this.timer = 0;
			this.toggle = !this.toggle;
		}
		//
		if (gInputManager.isKeyPressed('ArrowLeft') && this.indice > 0) {
			this.indice = this.indice - 1;
		}
		//
		if (gInputManager.isKeyPressed('ArrowRight') && this.indice < 2) {
			this.indice = this.indice + 1;
		}
		//
		if (gInputManager.isKeyPressed('ArrowUp')) {
			this.tab[this.indice] = this.tab[this.indice] + 1;
			if (this.tab[this.indice] > 90) {
				this.tab[this.indice] = 65;
			}
		}
		//
		if (gInputManager.isKeyPressed('ArrowDown')) {
			this.tab[this.indice] = this.tab[this.indice] - 1;
			if (this.tab[this.indice] < 65) {
				this.tab[this.indice] = 90;
			}
		}
		//enter -> game stage
		if (gInputManager.isKeyPressed('Space')) {
			//
			const datas = {
				name: (this.name = String.fromCharCode(
					this.tab[0],
					this.tab[1],
					this.tab[2]
				))
			};
			setTimeout(() => {
				gameStageManager.changeStage(
					new GameStage(this.screenWidth, this.screenHeight),
					datas
				);
			}, 200);
		}

		//
	}
	//
	fromChar(val) {
		return String.fromCharCode(val);
	}
	//
	afficheName(ctx) {
		//
		if (this.indice == 0) {
			if (this.toggle) {
				this.name = String.fromCharCode(32, 32, this.tab[1], this.tab[2]);
			} else {
				this.name = String.fromCharCode(this.tab[0], this.tab[1], this.tab[2]);
			}
		}
		//
		else if (this.indice == 1) {
			if (this.toggle) {
				this.name = String.fromCharCode(this.tab[0], 32, 32, this.tab[2]);
			} else {
				this.name = String.fromCharCode(this.tab[0], this.tab[1], this.tab[2]);
			}
		}
		//
		else if (this.indice == 2) {
			if (this.toggle) {
				this.name = String.fromCharCode(this.tab[0], this.tab[1], 32, 32);
			} else {
				this.name = String.fromCharCode(this.tab[0], this.tab[1], this.tab[2]);
			}
		}

		//
		this.nameLabel.setText(this.name);

		this.nameLabel.render(ctx, 300, this.screenHeight * 0.4);
	}
	//
	render(ctx) {
		ctx.drawImage(gAssetsManager.getImage('jungle'), 0, 0);

		//title
		this.title.render(ctx);
		//
		this.afficheName(ctx);
		//
		this.com.render(ctx);
	}
	//end
}
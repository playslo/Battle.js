import { Stage, Label } from './ezLib.js';

import {
	gameStageManager,
	gInputManager,
	gAssetsManager,
	gMusicPlayer,
} from './main.js';

import { IntroStage } from './intro_stage.js';

//
export class ConcluStage extends Stage {
	//
	constructor(screenWidth, screenHeight) {
		super(screenWidth, screenHeight);

		this.title = new Label('Game Over', 40);

		this.score = new Label('Score', 30);

		this.com_play = new Label('Press Enter to Play', 30);

		this.name = '???';
		this.points = 0;
	}

	//
	onEnter(datas) {
		if (datas) {
			this.name = datas.name;
			this.points = datas.points;
		}
		//
		gMusicPlayer.play('./assets/musics/underground.ogg', 0.5, true);
	}

	//
	onExit() {
		gMusicPlayer.stop();
	}

	//
	update(dt) {
		if (gInputManager.isKeyPressed('Enter')) {
			//
			gameStageManager.changeStage(
				new IntroStage(this.screenWidth, this.screenHeight),
				null
			);
		}
		//
	}
	//
	render(ctx) {
		//
		ctx.drawImage(gAssetsManager.getImage('jungle'), 0, 0);

		this.title.setText('Game Over ' + this.name);
		this.title.render(ctx, 200, 100);

		this.score.setText('Score = ' + this.points);
		this.score.render(ctx, 250, 200);

		this.com_play.render(ctx, 200, 350);
	}
}

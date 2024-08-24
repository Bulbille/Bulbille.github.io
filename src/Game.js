class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0,0);
        this.stateStatus = null;
        this._time_left = time;
		this._turns_left = 10;
		
		this._gamePaused = false;
		this._runOnce = false;
		
        this.cameras.main.fadeIn(250);
        this.stateStatus = 'playing';

		// this.player = this.physics.add.sprite(EPT.world.width/2,EPT.world.height/2, 'imp');

		
        this.initUI();
		// Play the animations
		this.anims.create({
			key: 'pose-ouvrier',
			frames: this.anims.generateFrameNumbers('emplacement', { start: 4, end: 0 }),
			frameRate: 0,
			repeat: -1 // Repeat once for frames 0 to 6
		});				
		
		this.emplacementsAnimations.forEach(function(sprite,i) {
			sprite.play({key:'pose-ouvrier',startFrame:i}); 
		});

		this.displayTurnsLeft();

		this.currentTimer = this.time.addEvent({
            delay: 1000,
            callback: function(){
                this._time_left--;
				if(this._time_left == 0) {
					this._time_left = time;
					this.emplacementsAnimations.forEach(function(sprite,i) {
						sprite.anims.nextFrame(); 
					});
					this.removeTurn();
				}
				this.timeBar.scaleY = this._time_left/time;
                if(this._turns_left < 0) {
                    this._runOnce = false;
                    this.stateStatus = 'gameover';
                }
            },
            callbackScope: this,
            loop: true
        });

		this.players = this.physics.add.group({
			key:'imp',
			repeat : 1,
			setXY: { x: EPT.world.width/2, y: EPT.world.height/4, stepY: EPT.world.height/2 }
		})
		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNumbers('imp', { start: 1, end: 4 }),
			frameRate: 10,
			repeat: -1
		});

		this.players.children.iterate(function(player) {
			player.setScale(0.6);
			player.setBounce(1);
			player.setCollideWorldBounds(true);
			player.body.onWorldBounds = true;
			player.anims.play('walk',true);
			player.setVelocity(Phaser.Math.Between(-100, 100),Phaser.Math.Between(-100, 100));
		});
		this.physics.add.collider(this.players);

	}
	update() {
		switch(this.stateStatus) {
			case 'paused': {
				if(!this._runOnce) {
					this.statePaused();
					this._runOnce = true;
				}
				break;
			}
			case 'gameover': {
				if(!this._runOnce) {
					this.stateGameover();
					this._runOnce = true;
				}
				break;
			}
			case 'playing': {
				this.statePlaying();
			}
			default: {
			}
		}
	}
    managePause() {
        this._gamePaused =! this._gamePaused;
        this.currentTimer.paused =! this.currentTimer.paused;
		EPT.Sfx.play('click');
		if(this._gamePaused) {
			EPT.fadeOutIn(function(self){
				self.buttonPause.input.enabled = false;
				self.stateStatus = 'paused';
				self._runOnce = false;
			}, this);
			this.screenPausedBack.x = -this.screenPausedBack.width-20;
			this.tweens.add({targets: this.screenPausedBack, x: 100, duration: 500, delay: 250, ease: 'Back'});
			this.screenPausedContinue.x = EPT.world.width+this.screenPausedContinue.width+20;
			this.tweens.add({targets: this.screenPausedContinue, x: EPT.world.width-100, duration: 500, delay: 250, ease: 'Back'});
			
			this.emplacementsAnimations.forEach(function(sprite,i) {sprite.anims.pause(); });
		}
		else {
			EPT.fadeOutIn(function(self){
				self.buttonPause.input.enabled = true;
				self._stateStatus = 'playing';
				self._runOnce = false;
			}, this);
			this.screenPausedBack.x = 100;
			this.tweens.add({targets: this.screenPausedBack, x: -this.screenPausedBack.width-20, duration: 500, ease: 'Back'});
			this.screenPausedContinue.x = EPT.world.width-100;
			this.tweens.add({targets: this.screenPausedContinue, x: EPT.world.width+this.screenPausedContinue.width+20, duration: 500, ease: 'Back'});

			this.emplacementsAnimations.forEach(function(sprite,i) {sprite.anims.resume(); });
        }
    }
	statePlaying() {
        if(this._turns_left < 0) {
            this._runOnce = false;
            this.stateStatus = 'gameover';
        }
	}
	statePaused() {
        this.screenPausedGroup.toggleVisible();
	}
	stateGameover() {
		this.currentTimer.paused =! this.currentTimer.paused;
		EPT.fadeOutIn(function(self){
			self.screenGameoverGroup.toggleVisible();			
			self.buttonPause.input.enabled = false;
		}, this);
		this.screenGameoverBack.x = -this.screenGameoverBack.width-20;
		this.tweens.add({targets: this.screenGameoverBack, x: 100, duration: 500, delay: 250, ease: 'Back'});
		this.screenGameoverRestart.x = EPT.world.width+this.screenGameoverRestart.width+20;
		this.tweens.add({targets: this.screenGameoverRestart, x: EPT.world.width-100, duration: 500, delay: 250, ease: 'Back'});
	}
    initUI() {
		let emplacementsPlace = [[EPT.world.width/4+40,EPT.world.height/6+30],
							[EPT.world.width/4+40,EPT.world.height*2/6+30],
							[EPT.world.width/4+40,EPT.world.height*3/6+30],
							[EPT.world.width/4+40,EPT.world.height*4/6+30],
							[EPT.world.width/4+40,EPT.world.height*5/6+30],
						]					
		this.emplacementsAnimations = []
		for (let whereOf6 of emplacementsPlace){
			this.emplacementsAnimations.push(
				this.add.sprite(whereOf6[0], whereOf6[1], "emplacement").setScale(0.3));
		}

		// Barre de temps
		var backgroundTime = this.add.graphics();
        backgroundTime.fillStyle(0x982615, 1);
        backgroundTime.fillRect(0,0,30,800);
        backgroundTime.x = 550;
        backgroundTime.y = 30;

		this.timeBar = this.add.graphics();
        this.timeBar.fillStyle(0xffba00, 1);
        this.timeBar.fillRect(0,0,30,800);
        this.timeBar.x = 550;
        this.timeBar.y = 30;
		var border = this.add.graphics();
		border.lineStyle(10, 0x000000, 1);
		border.strokeRect(550,30,30,800);
		
		this.buttonNextTurn = new Button(570, 900, 'button-continue', this.nextTurn, this).setScale(0.4).setAngle(90);

		this.buttonMoreTurn = new Button(EPT.world.width*3/4, 150, 'button-turns-plus', this.addTurn, this);
		this.buttonLessTurn = new Button(EPT.world.width*3/4, EPT.world.height-50, 'button-turns-moins', this.removeTurn, this);
		this.buttonMoreTurn.setScale(0.2);
		this.buttonLessTurn.setScale(0.2);	

		this.buttonPause = new Button(20, 20, 'button-pause', this.managePause, this);
		this.buttonPause.setOrigin(0,0);

		this.buttonPause.y = -this.buttonPause.height-20;
        this.tweens.add({targets: this.buttonPause, y: 20, duration: 500, ease: 'Back'});

		var fontTitle = { font: '48px '+EPT.text['FONT'], fill: '#000', stroke: '#ffde00', strokeThickness: 10 };

		

		this.screenPausedGroup = this.add.group();
        this.screenPausedBg = this.add.sprite(0, 0, 'overlay');
        this.screenPausedBg.setAlpha(0.95);
        this.screenPausedBg.setOrigin(0, 0);
		this.screenPausedText = this.add.text(EPT.world.centerX, 100, EPT.text['gameplay-paused'], fontTitle);
		this.screenPausedText.setOrigin(0.5,0);
		this.screenPausedBack = new Button(100, EPT.world.height-100, 'button-mainmenu', this.stateBack, this);
		this.screenPausedBack.setOrigin(0,1);
		this.screenPausedContinue = new Button(EPT.world.width-100, EPT.world.height-100, 'button-continue', this.managePause, this);
		this.screenPausedContinue.setOrigin(1,1);
		this.screenPausedGroup.add(this.screenPausedBg);
		this.screenPausedGroup.add(this.screenPausedText);
		this.screenPausedGroup.add(this.screenPausedBack);
		this.screenPausedGroup.add(this.screenPausedContinue);

		this.screenGameoverGroup = this.add.group();
        this.screenGameoverBg = this.add.sprite(0, 0, 'overlay');
        this.screenGameoverBg.setAlpha(0.95);
        this.screenGameoverBg.setOrigin(0, 0);
		this.screenGameoverText = this.add.text(EPT.world.centerX, 100, EPT.text['gameplay-gameover'], fontTitle);
		this.screenGameoverText.setOrigin(0.5,0);
		this.screenGameoverBack = new Button(100, EPT.world.height-100, 'button-mainmenu', this.stateBack, this);
		this.screenGameoverBack.setOrigin(0,1);
		this.screenGameoverRestart = new Button(EPT.world.width-100, EPT.world.height-100, 'button-restart', this.stateRestart, this);
		this.screenGameoverRestart.setOrigin(1,1);
		this.screenGameoverGroup.add(this.screenGameoverBg);
		this.screenGameoverGroup.add(this.screenGameoverText);
		this.screenGameoverGroup.add(this.screenGameoverBack);
		this.screenGameoverGroup.add(this.screenGameoverRestart);
		this.screenGameoverGroup.toggleVisible();

		// Plus ou moins de temps
		this.lessTimeButton = new Button(EPT.world.width/8, EPT.world.height/2, 'button-back', this.clickLessTime, this);
		this.moreTimeButton = new Button(EPT.world.width*7/8, EPT.world.height/2, 'button-continue', this.clickMoreTime, this);
		this.lessTimeButton.setScale(0.5*36/14); //rapport entre les deux boutons
		this.moreTimeButton.setScale(0.5);
		var fontTime = { font: '200px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 20, align: 'center' };
		if(time > 120 )
			this.timeText = this.add.text(EPT.world.width/2,EPT.world.height/2, "∞", fontTime).setOrigin(0.5);
		else 
			this.timeText = this.add.text(EPT.world.width/2,EPT.world.height/2, time, fontTime).setOrigin(0.5);


		this.screenPausedGroup.add(this.lessTimeButton);
		this.screenPausedGroup.add(this.moreTimeButton);
		this.screenPausedGroup.add(this.timeText);

        this.screenPausedGroup.toggleVisible();

    }

	stateRestart() {
		EPT.Sfx.play('click');
        EPT.fadeOutScene('Game', this);
	}
	stateBack() {
		EPT.Sfx.play('click');
		EPT.fadeOutScene('MainMenu', this);
	}
	clickMoreTime(){
		if(time >= 120) {
			time=600;
			this.timeText.setText("∞");
		}
		else{
			time+=10;
			this.timeText.setText(time);
		}
		this._time_left = time;
	}
	clickLessTime(){
		if(time == 600)
			time=120;
		else if (time > 40)
			time -= 10;
		this.timeText.setText(time);
		this._time_left = time;
	}

	displayTurnsLeft() {
		let imagesToRemove = this.children.getAll().filter(child => child.texture && child.texture.key === 'engrenage');
    	imagesToRemove.forEach(image => {
	        image.destroy();
	    });
		for (let i = 0; i < this._turns_left; i++) {
			let image = this.add.image(EPT.world.width*3/4, i * 70 + 230 , 'engrenage').setScale(2).setAngle(90);
			this.children.moveTo(image,10);
		}
	}
	// Method to add one more repetition of the image
	addTurn() {
		this._turns_left += 1;
		this.displayTurnsLeft();
	}
	// Method to remove one repetition of the image
	removeTurn() {
		this._turns_left -= 1;
		this.displayTurnsLeft();
	}
	nextTurn(){
		this._turns_left -= 1
		this.displayTurnsLeft();
		this._time_left = time;
		this.emplacementsAnimations.forEach(function(sprite,i) {
			sprite.anims.nextFrame(); 
		});
	}
};
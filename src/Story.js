class Story extends Phaser.Scene {
    constructor() {
        super('Story');
    }
    create() {
		this.add.sprite(0, 0, 'background').setOrigin(0,0);
		this.coucou = 0;
		var fontStory = { font: '48px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 7, align: 'center' };
		var textStory = this.add.text(EPT.world.centerX, 200, EPT.text['parametres'], fontStory);
		textStory.setOrigin(0.5,0);

		// var time = 90;
		// var possibleTimes = [-1,70,90,120];
		var lessTimeButton = new Button(EPT.world.width/8, EPT.world.height/2, 'button-back', this.clickLessTime, this);
		var moreTimeButton = new Button(EPT.world.width*7/8, EPT.world.height/2, 'button-continue', this.clickMoreTime, this);
		lessTimeButton.setScale(0.5*36/14); //rapport entre les deux boutons
		moreTimeButton.setScale(0.5);
		var fontTime = { font: '200px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 20, align: 'center' };
		
		if(time > 120 )
			this.timeText = this.add.text(EPT.world.width/2,EPT.world.height/2, "∞", fontTime).setOrigin(0.5);
		else 
			this.timeText = this.add.text(EPT.world.width/2,EPT.world.height/2, time, fontTime).setOrigin(0.5);

		var buttonContinue = new Button(EPT.world.width-20, EPT.world.height-20, 'button-continue', this.clickContinue, this);
		buttonContinue.setOrigin(1,1);

		buttonContinue.x = EPT.world.width+buttonContinue.width+20;
		this.tweens.add({targets: buttonContinue, x: EPT.world.width-20, duration: 500, ease: 'Back'});

		this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.keyEnter.on('down', function(key, event) { this.clickContinue(); }, this);

		this.cameras.main.fadeIn(250, 0, 0, 0);
	}
	clickContinue() {
		EPT.Sfx.play('click');
		EPT.fadeOutScene('Game', this);
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
	}
	clickLessTime(){
		if(time == 600)
			time=120;
		else if (time > 40)
			time -= 10;
		this.timeText.setText(time);
	}
};

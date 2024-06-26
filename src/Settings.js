class Settings extends Phaser.Scene {
    constructor() {
        super('Settings');
    }
    create() {
		this.add.sprite(0, 0, 'background').setOrigin(0, 0);
		this.screenName = 'settings';
		this.input.keyboard.on('keydown', this.handleKey, this);

		this.buttonBack = new Button(20, 20, 'button-back', this.clickBack, this);
		this.buttonBack.setOrigin(0, 0);
		this.buttonBack.y = -this.buttonBack.height-20;
		this.tweens.add({targets: this.buttonBack, y: 20, duration: 500, ease: 'Back'});

		var fontTitle = { font: '46px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 7, align: 'center' };
		var fontSubtitle = { font: '38px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5, align: 'center' };
		var fontSmall = { font: '28px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 4, align: 'center' };
		var titleSettings = this.add.text(EPT.world.centerX, 60, EPT.text['settings'], fontTitle);
		titleSettings.setOrigin(0.5, 0.5);
		var offsetLeft = 130;
		
		this.buttonSound = new Button(offsetLeft+40, 250, 'button-sound-on', this.clickSound, this);
		this.buttonSound.setOrigin(0.5, 0.5);
		this.textSound = this.add.text(offsetLeft+30+this.buttonSound.width, 250, EPT.text['sound-on'], fontSubtitle);
		this.textSound.setOrigin(0, 0.5);
		this.buttonMusic = new Button(offsetLeft+40, 375, 'button-music-on', this.clickMusic, this);
		this.buttonMusic.setOrigin(0.5, 0.5);
		this.textMusic = this.add.text(offsetLeft+30+this.buttonMusic.width, 375, EPT.text['music-on'], fontSubtitle);
		this.textMusic.setOrigin(0, 0.5);


		EPT.Sfx.update('sound', this.buttonSound, this.textSound);
		EPT.Sfx.update('music', this.buttonMusic, this.textMusic);

		this.buttonSound.setScale(0.5);
		this.tweens.add({targets: this.buttonSound, scaleX: 1, scaleY: 1, duration: 500, delay: 0, ease: 'Cubic.easeOut' });
		this.textSound.setScale(0.5);
		this.tweens.add({targets: this.textSound, scaleX: 1, scaleY: 1, duration: 500, delay: 0, ease: 'Cubic.easeOut' });
		this.buttonMusic.setScale(0.5);
		this.tweens.add({targets: this.buttonMusic, scaleX: 1, scaleY: 1, duration: 500, delay: 250, ease: 'Cubic.easeOut' });
		this.textMusic.setScale(0.5);
		this.tweens.add({targets: this.textMusic, scaleX: 1, scaleY: 1, duration: 500, delay: 250, ease: 'Cubic.easeOut' });

		if(this.sys.game.device.os.desktop) {
			this.helpText = this.add.text(EPT.world.centerX, EPT.world.height-250, EPT.text['keyboard-info'], fontSmall);
			this.helpText.setOrigin(0.5,1);
			this.helpText.setScale(0.5);
			this.tweens.add({targets: this.helpText, scaleX: 1, scaleY: 1, duration: 500, delay: 750, ease: 'Cubic.easeOut' });
		}

		this.containerKeyboard = this.add.container();
		this.containerKeyboard.y = EPT.world.height;
		
		var offsetTopKeyboard = 20;
		var keyboardBg = this.add.sprite(0, 0, 'background');
		keyboardBg.setOrigin(0,0);
		var titleKeyboard = this.add.text(EPT.world.centerX, offsetTopKeyboard+40, EPT.text['key-title'], fontTitle);
		titleKeyboard.setOrigin(0.5);
		var titleKeySettingsTitle = this.add.text(EPT.world.centerX, offsetTopKeyboard+90, EPT.text['key-settings-title'], fontSubtitle);
		titleKeySettingsTitle.setOrigin(0.5,0);
		var titleKeySettings = this.add.text(EPT.world.centerX, offsetTopKeyboard+140, EPT.text['key-settings-onoff'], fontSmall);
		titleKeySettings.setOrigin(0.5,0);
		var titleKeyAudio = this.add.text(EPT.world.centerX, offsetTopKeyboard+180, EPT.text['key-audio'], fontSmall);
		titleKeyAudio.setOrigin(0.5,0);
		var titleKeyMusic = this.add.text(EPT.world.centerX, offsetTopKeyboard+220, EPT.text['key-music'], fontSmall);
		titleKeyMusic.setOrigin(0.5,0);
		var titleKeyKeyboard = this.add.text(EPT.world.centerX, offsetTopKeyboard+300, EPT.text['key-shortcuts'], fontSmall);
		titleKeyKeyboard.setOrigin(0.5,0);

		var titleKeyMenuTitle = this.add.text(EPT.world.centerX, offsetTopKeyboard+350, EPT.text['key-menu'], fontSubtitle);
		titleKeyMenuTitle.setOrigin(0.5,0);
		var titleKeySettings2 = this.add.text(EPT.world.centerX, offsetTopKeyboard+400, EPT.text['key-settings-onoff'], fontSmall);
		titleKeySettings2.setOrigin(0.5,0);
		var titleKeyStart = this.add.text(EPT.world.centerX, offsetTopKeyboard+440, EPT.text['key-start'], fontSmall);
		titleKeyStart.setOrigin(0.5,0);

		var titleKeyGameTitle = this.add.text(EPT.world.centerX, offsetTopKeyboard+490, EPT.text['key-gameplay'], fontSubtitle);
		titleKeyGameTitle.setOrigin(0.5,0);
		var titleKeyButton = this.add.text(EPT.world.centerX, offsetTopKeyboard+540, EPT.text['key-button'], fontSmall);
		titleKeyButton.setOrigin(0.5,0);
		var titleKeyPause = this.add.text(EPT.world.centerX, offsetTopKeyboard+580, EPT.text['key-pause'], fontSmall);
		titleKeyPause.setOrigin(0.5,0);

		var titleKeyPauseTitle = this.add.text(EPT.world.centerX, offsetTopKeyboard+630, EPT.text['key-pause-title'], fontSubtitle);
		titleKeyPauseTitle.setOrigin(0.5,0);
		var titleKeyBack = this.add.text(EPT.world.centerX, offsetTopKeyboard+680, EPT.text['key-back'], fontSmall);
		titleKeyBack.setOrigin(0.5,0);
		var titleKeyRestart = this.add.text(EPT.world.centerX, offsetTopKeyboard+720, EPT.text['key-return'], fontSmall);
		titleKeyRestart.setOrigin(0.5,0);

		var titleKeyOverTitle = this.add.text(EPT.world.centerX, offsetTopKeyboard+770, EPT.text['key-gameover'], fontSubtitle);
		titleKeyOverTitle.setOrigin(0.5,0);
		var titleKeyBack2 = this.add.text(EPT.world.centerX, offsetTopKeyboard+820, EPT.text['key-back'], fontSmall);
		titleKeyBack2.setOrigin(0.5,0);
		var titleKeyRestart2 = this.add.text(EPT.world.centerX, offsetTopKeyboard+860, EPT.text['key-try'], fontSmall);
		titleKeyRestart2.setOrigin(0.5,0);

		this.containerKeyboard.add([keyboardBg,titleKeyboard,titleKeySettingsTitle,titleKeySettings]);
		this.containerKeyboard.add([titleKeyAudio,titleKeyMusic,titleKeyKeyboard]);
		this.containerKeyboard.add([titleKeyMenuTitle,titleKeySettings2,titleKeyStart,titleKeyGameTitle]);
		this.containerKeyboard.add([titleKeyButton,titleKeyPause,titleKeyPauseTitle,titleKeyBack]);
		this.containerKeyboard.add([titleKeyRestart,titleKeyOverTitle,titleKeyBack2,titleKeyRestart2]);

		this.cameras.main.fadeIn(250);
	}
    handleKey(e) {
        switch(e.code) {
			case 'KeyA': {
				this.clickSound();
				break;
			}
			case 'KeyM': {
				this.clickMusic();
				break;
			}
            case 'KeyS': {
                this.clickBack();
				break;
			}
            case 'KeyK': {
				if(this.screenName == 'settings') {
					this.clickKeyboard();
				}
				else { // this.screenName == 'keyboard'
					this.clickBack('keyboard');
				}
				break;
			}
			default: {}
        }
    }
	clickSound() {
		EPT.Sfx.play('click');
		EPT.Sfx.manage('sound', 'switch', this, this.buttonSound, this.textSound);
	}
	clickMusic() {
		EPT.Sfx.play('click');
		EPT.Sfx.manage('music', 'switch', this, this.buttonMusic, this.textMusic);
	}

	clickKeyboard() {
		EPT.Sfx.play('click');
		this.tweens.add({targets: this.containerKeyboard, y: 0, duration: 750, ease: 'Cubic.easeOut' });

		this.buttonBack.input.enabled = false;
		this.buttonSound.input.enabled = false;
		this.buttonMusic.input.enabled = false;
		this.screenName = 'keyboard';
	}
	clickBack(name) {
		EPT.Sfx.play('click');
		if(name) {
			this.buttonBack.input.enabled = true;
			this.buttonSound.input.enabled = true;
			this.buttonMusic.input.enabled = true;
			if(name == 'keyboard') {
				this.tweens.add({targets: this.containerKeyboard, y: EPT.world.height, duration: 750, ease: 'Cubic.easeIn' });
			}
			this.screenName = 'settings';
		}
		else {
			EPT.fadeOutScene('MainMenu', this);
		}
	}
};
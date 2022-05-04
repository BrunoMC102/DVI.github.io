/**
 * Menu cuando se parael juego. Cuando el personaje le de al boton de parar(ESC) 
 */
export default class PauseMenu {
  /**
   * Constructor de la escena
   */


  constructor(player, scene) {
    this.player = player;
    this.otherText = "Controller";
    // this.container = scene.add.container(640,480);
    this.line = scene.add.line(640, 335, 0, 0, 450, 0, 0xffffff).setScrollFactor(0).setDepth(7);
    this.panel = scene.add.image(640, 480, 'redPanel').setScrollFactor(0).setDepth(6);
    this.selectPanel = scene.add.image(640, 300, 'redRectangle').setScrollFactor(0).setDepth(6);
    this.controlText = scene.add.bitmapText(555, 280, 'atari', 'Keyboard', 16)
      .setFontSize(35).setScrollFactor(0)
      .setDepth(6);
    this.choosePanelLeft = scene.add.image(522, 300, 'redButton').setScrollFactor(0).setDepth(6);
    this.choosePanelLeft.setInteractive();
    this.choosePanelLeft.on('pointerup', () => {
      this.changeText = this.controlText.text;
      this.controlText.setText(this.otherText);
      this.showMenuPanel();
      this.otherText = this.changeText;

    })
    this.choosePanelRight = scene.add.image(756, 300, 'redButton').setScrollFactor(0).setDepth(6);
    this.choosePanelRight.setInteractive();
    this.choosePanelRight.on('pointerup', () => {
      this.changeText = this.controlText.text;
      this.controlText.setText(this.otherText);
      this.showMenuPanel();
      this.otherText = this.changeText;
    })

    this.chooseImageLeft = scene.add.image(522, 300, 'arrowLeft').setScrollFactor(0).setDepth(6);
    this.chooseImageRight = scene.add.image(756, 300, 'arrowRight').setScrollFactor(0).setDepth(6);

    this.panelExit = scene.add.image(885, 235, 'redButton').setScrollFactor(0).setDepth(6);
    this.crossImage = scene.add.image(885, 232, 'cross').setScrollFactor(0).setDepth(7);
    this.panelExit.setInteractive();
    this.panelExit.on('pointerup', () => {
      player.hideMenu();
    })

    this.panelMusic = scene.add.image(830, 235, 'redButton').setScrollFactor(0).setDepth(6);
    this.panelMusicOnButton = scene.add.image(830, 232, 'musicOn').setScrollFactor(0).setDepth(7);
    this.panelMusicOffButton = scene.add.image(830, 232, 'musicOff').setScrollFactor(0).setDepth(5);
    this.panelMusic.setInteractive();
    this.panelMusic.on('pointerup', () => {
      const depth = this.panelMusicOnButton._depth;
      this.panelMusicOnButton.setDepth(this.panelMusicOffButton._depth);
      this.panelMusicOffButton.setDepth(depth);
      player.playerData.isSoundMuted = !player.playerData.isSoundMuted;
      scene.sound.mute = player.playerData.isSoundMuted;


    })

    this.panelScreen = scene.add.image(885, 285, 'redButton').setScrollFactor(0).setDepth(6);
    this.panelFullscreenOnButton = scene.add.image(884, 282, 'larger').setScrollFactor(0).setDepth(7);
    this.panelFullscreenOffButton = scene.add.image(884, 282, 'smaller').setScrollFactor(0).setDepth(5);
    this.panelScreen.setInteractive();
    this.panelScreen.on('pointerup', () => {
      const depth = this.panelFullscreenOnButton._depth;
      this.panelFullscreenOnButton.setDepth(this.panelFullscreenOffButton._depth);
      this.panelFullscreenOffButton.setDepth(depth);
      scene.scale.toggleFullscreen();
      


    })

    this.panelGuideArrow = scene.add.image(830, 285, 'redButton').setScrollFactor(0).setDepth(6);
    this.panelGuideArrowButton = scene.add.image(830, 282, 'question').setScrollFactor(0).setDepth(7);
    this.lineQuestion = scene.add.line(830, 285,30,30, 0, 0, 0xffffff).setScrollFactor(0).setDepth(7);
    this.lineQuestion.setLineWidth(2);
    this.panelGuideArrow.setInteractive();
    this.panelGuideArrow.on('pointerup', () => {
       this.lineQuestion.visible = !this.lineQuestion.visible;
      player.playerData.arrowHelp = !player.playerData.arrowHelp;
    })



    this.upText = scene.add.bitmapText(750, 540, 'atari', 'Move up', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);

    this.downText = scene.add.bitmapText(700, 680, 'atari', 'Move down', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);

    this.leftText = scene.add.bitmapText(630, 650, 'atari', 'Move left', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);

    this.rightText = scene.add.bitmapText(790, 650, 'atari', 'Move right', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);


    this.spaceText = scene.add.bitmapText(490, 650, 'atari', 'Attack/Jump', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);


    this.xText = scene.add.bitmapText(380, 595, 'atari', 'Throw/Freeze box', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);


    this.cText = scene.add.bitmapText(550, 595, 'atari', 'Dash', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);

    this.fText = scene.add.bitmapText(450, 545, 'atari', 'Use Health', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);

    this.gText = scene.add.bitmapText(560, 545, 'atari', 'Mana Potion', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);

    this.eText = scene.add.bitmapText(470, 495, 'atari', 'Interact', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);
    this.oneText = scene.add.bitmapText(410, 405, 'atari', 'Sword', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);
    this.twoText = scene.add.bitmapText(470, 405, 'atari', 'Bow', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);
    this.threeText = scene.add.bitmapText(510, 405, 'atari', 'Staff', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);
    this.escText = scene.add.bitmapText(380, 360, 'atari', 'Pause/Resume Game', 16)
      .setFontSize(20).setScrollFactor(0)
      .setDepth(6);

    this.upImage = scene.add.image(750, 580, 'tileUp').setScrollFactor(0).setDepth(6);
    this.downImage = scene.add.image(750, 630, 'tileDown').setScrollFactor(0).setDepth(6);
    this.leftImage = scene.add.image(710, 630, 'tileLeft').setScrollFactor(0).setDepth(6);
    this.rightImage = scene.add.image(790, 630, 'tileRight').setScrollFactor(0).setDepth(6);
    this.eImage = scene.add.image(500, 480, 'tileE').setScrollFactor(0).setDepth(6);
    this.fImage = scene.add.image(550, 530, 'tileF').setScrollFactor(0).setDepth(6);
    this.gImage = scene.add.image(590, 530, 'tileG').setScrollFactor(0).setDepth(6);
    this.cImage = scene.add.image(520, 580, 'tileC').setScrollFactor(0).setDepth(6);
    this.xImage = scene.add.image(480, 580, 'tileX').setScrollFactor(0).setDepth(6);
    this.spaceLImage = scene.add.image(520, 630, 'tileSpaceL').setScrollFactor(0).setDepth(6);
    this.spaceMImage = scene.add.image(550, 630, 'tileSpaceM').setScrollFactor(0).setDepth(6);
    this.spaceRImage = scene.add.image(580, 630, 'tileSpaceR').setScrollFactor(0).setDepth(6);
    this.escImage = scene.add.image(400, 400, 'tileEsc').setScrollFactor(0).setDepth(6);
    this.oneImage = scene.add.image(450, 440, 'tile1').setScrollFactor(0).setDepth(6);
    this.twoImage = scene.add.image(490, 440, 'tile2').setScrollFactor(0).setDepth(6);
    this.threeImage = scene.add.image(530, 440, 'tile3').setScrollFactor(0).setDepth(6);
    this.ps4 = scene.add.image(630, 525, 'ps4').setScrollFactor(0).setDepth(6);

    //this.container.add(this.panel)
    //this.container._visible = false;
    this.hideMenuPanel();

  }

  showMenuPanel() {
    this.panel.visible = true;
    this.panelMusic.visible = true;
    this.panelMusicOnButton.visible = true;
    this.panelMusicOffButton.visible = true;
    this.panelExit.visible = true;
    this.crossImage.visible = true;
    this.panelScreen.visible = true;
    this.panelFullscreenOnButton.visible = true;
    this.panelFullscreenOffButton.visible = true;
    this.panelGuideArrow.visible = true;
    this.panelGuideArrowButton.visible = true;
    this.controlText.visible = true;
    this.selectPanel.visible = true;
    this.choosePanelLeft.visible = true;
    this.choosePanelRight.visible = true;
    this.chooseImageLeft.visible = true;
    this.chooseImageRight.visible = true;
    this.line.visible = true;
    if(!this.player.playerData.arrowHelp) this.lineQuestion.visible = true; 
    if (this.controlText.text === "Controller") {
      this.showControllerMenuPanel();
      this.hideKeyboardMenuPanel();
    }
    else {
      this.showKeyboardMenuPanel();
      this.hideControllerMenuPanel();
    }
  }

  hideMenuPanel() {
    this.panel.visible = false;
    this.panelMusic.visible = false;
    this.panelMusicOnButton.visible = false;
    this.panelMusicOffButton.visible = false;
    this.panelExit.visible = false;
    this.crossImage.visible = false;
    this.panelScreen.visible = false;
    this.panelFullscreenOnButton.visible = false;
    this.panelFullscreenOffButton.visible = false;
    this.panelGuideArrow.visible = false;
    this.panelGuideArrowButton.visible = false;
    this.controlText.visible = false;
    this.selectPanel.visible = false;
    this.choosePanelLeft.visible = false;
    this.choosePanelRight.visible = false;
    this.chooseImageLeft.visible = false;
    this.chooseImageRight.visible = false;
    this.line.visible = false;
    this.lineQuestion.visible = false;

    this.hideKeyboardMenuPanel();
    this.hideControllerMenuPanel();
  }



  showKeyboardMenuPanel() {
    this.upImage.visible = true;
    this.downImage.visible = true;
    this.leftImage.visible = true;
    this.rightImage.visible = true;
    this.eImage.visible = true;
    this.fImage.visible = true;
    this.gImage.visible = true;
    this.cImage.visible = true;
    this.xImage.visible = true;
    this.spaceLImage.visible = true;
    this.spaceMImage.visible = true;
    this.spaceRImage.visible = true;
    this.escImage.visible = true;
    this.oneImage.visible = true;
    this.twoImage.visible = true;
    this.threeImage.visible = true;

    //Text

    this.upText.visible = true;

    this.downText.visible = true;

    this.leftText.visible = true;

    this.rightText.visible = true;


    this.spaceText.visible = true;


    this.xText.visible = true;


    this.cText.visible = true;

    this.fText.visible = true;

    this.gText.visible = true;

    this.eText.visible = true;
    this.oneText.visible = true;
    this.twoText.visible = true;
    this.threeText.visible = true;
    this.escText.visible = true;

    //  this.container._visible = true;
    /*this.scene.tweens.add({
        targets: this.panel,
        y: this.scene.cameras.cameras[0].centerY - 1000,
        duration: 300,
        ease: Phaser.Math.Easing.Sine.InOut
    })*/
  }

  hideKeyboardMenuPanel() {
    this.upImage.visible = false;
    this.downImage.visible = false;
    this.leftImage.visible = false;
    this.rightImage.visible = false;
    this.eImage.visible = false;
    this.fImage.visible = false;
    this.gImage.visible = false;
    this.cImage.visible = false;
    this.xImage.visible = false;
    this.spaceLImage.visible = false;
    this.spaceMImage.visible = false;
    this.spaceRImage.visible = false;
    this.escImage.visible = false;
    this.oneImage.visible = false;
    this.twoImage.visible = false;
    this.threeImage.visible = false;

    //Text
    this.upText.visible = false;

    this.downText.visible = false;

    this.leftText.visible = false;

    this.rightText.visible = false;


    this.spaceText.visible = false;


    this.xText.visible = false;


    this.cText.visible = false;

    this.fText.visible = false;

    this.gText.visible = false;

    this.eText.visible = false;
    this.oneText.visible = false;
    this.twoText.visible = false;
    this.threeText.visible = false;
    this.escText.visible = false;
    // this.container._visible = false;
    /*
    this.scene.tweens.add({
        targets: this.panel,
        x: width +1000,
        duration: 300,
        ease: Phaser.Math.Easing.Sine.InOut
    })*/
  }

  hideControllerMenuPanel() {
    this.ps4.visible = false;
  }
  showControllerMenuPanel() {
    this.ps4.visible = true;
  }


}
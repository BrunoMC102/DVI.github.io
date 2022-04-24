/**
 * Menu cuando se parael juego. Cuando el personaje le de al boton de parar(ESC) 
 */
  export default class PauseMenu {
     /**
      * Constructor de la escena
      */


     constructor(player,scene) {
       let otherText = 'Controller'; 
       // this.container = scene.add.container(640,480);
       this.line = scene.add.line(640, 335, 0, 0, 450, 0, 0xffffff).setScrollFactor(0).setDepth(7);
       this.panel = scene.add.image(640,480,'redPanel').setScrollFactor(0).setDepth(6);
       this.selectPanel= scene.add.image(640,300,'redRectangle').setScrollFactor(0).setDepth(6);
       this.controlText = scene.add.bitmapText(555,280,'atari', 'Keyboard',16)
       .setFontSize(35).setScrollFactor(0) 
        .setDepth(6); 
       this.choosePanelLeft = scene.add.image(522,300,'redButton').setScrollFactor(0).setDepth(6);
       this.choosePanelLeft.setInteractive();
        this.choosePanelLeft.on('pointerup', ()=>{
          const changeText = this.controlText.text; 
          this.controlText.setText(otherText);
          otherText = changeText;

        })
       this.choosePanelRight = scene.add.image(756,300,'redButton').setScrollFactor(0).setDepth(6);
       this.choosePanelRight.setInteractive();
        this.choosePanelRight.on('pointerup', ()=>{
          let changeText = this.controlText.text; 
          this.controlText.setText(otherText);
          otherText = changeText;
        })
       
       this.chooseImageLeft = scene.add.image(522,300,'arrowLeft').setScrollFactor(0).setDepth(6);
       this.chooseImageRight = scene.add.image(756,300,'arrowRight').setScrollFactor(0).setDepth(6);
       
       this.panelExit = scene.add.image(885,235,'redButton').setScrollFactor(0).setDepth(6);
        this.crossImage =  scene.add.image(885,232,'cross').setScrollFactor(0).setDepth(7);
        this.panelExit.setInteractive();
        this.panelExit.on('pointerup', ()=>{
          player.hideMenu();
        })
        
        this.panelMusic = scene.add.image(830,235,'redButton').setScrollFactor(0).setDepth(6);
        this.panelMusicOnButton = scene.add.image(830,232,'musicOn').setScrollFactor(0).setDepth(7);
        this.panelMusicOffButton = scene.add.image(830,232,'musicOff').setScrollFactor(0).setDepth(5);
        this.panelMusic.setInteractive();
        this.panelMusic.on('pointerup', ()=>{
            const depth = this.panelMusicOnButton._depth;
            this.panelMusicOnButton.setDepth(this.panelMusicOffButton._depth);
            this.panelMusicOffButton.setDepth(depth);
            player.playerData.isSoundMuted = !player.playerData.isSoundMuted;
            scene.sound.mute = player.playerData.isSoundMuted;
            
        })
        
       this.upImage = scene.add.image(750,580, 'tileUp').setScrollFactor(0).setDepth(6);
       this.downImage = scene.add.image(750,630, 'tileDown').setScrollFactor(0).setDepth(6);
       this.leftImage = scene.add.image(710,630, 'tileLeft').setScrollFactor(0).setDepth(6);
       this.rightImage = scene.add.image(790,630, 'tileRight').setScrollFactor(0).setDepth(6);
       this.eImage = scene.add.image(500,480, 'tileE').setScrollFactor(0).setDepth(6);
       this.fImage = scene.add.image(550,530, 'tileF').setScrollFactor(0).setDepth(6);
       this.gImage = scene.add.image(590,530, 'tileG').setScrollFactor(0).setDepth(6);
       this.cImage = scene.add.image(520,580, 'tileC').setScrollFactor(0).setDepth(6);
       this.xImage = scene.add.image(480,580, 'tileX').setScrollFactor(0).setDepth(6);
       this.spaceLImage = scene.add.image(520,630, 'tileSpaceL').setScrollFactor(0).setDepth(6);
       this.spaceMImage = scene.add.image(550,630, 'tileSpaceM').setScrollFactor(0).setDepth(6);
       this.spaceRImage = scene.add.image(580,630, 'tileSpaceR').setScrollFactor(0).setDepth(6);
       this.escImage = scene.add.image(400,420, 'tileEsc').setScrollFactor(0).setDepth(6);
       this.oneImage = scene.add.image(450,440, 'tile1').setScrollFactor(0).setDepth(6);
       this.twoImage = scene.add.image(490,440, 'tile2').setScrollFactor(0).setDepth(6);
       this.threeImage = scene.add.image(530,440, 'tile3').setScrollFactor(0).setDepth(6);
       
       
        //this.container.add(this.panel)
        //this.container._visible = false;
       this.hideMenuPanel();

     }
   
     

     showMenuPanel(){
       this.panel.visible = true;
       this.panelMusic.visible = true;
       this.panelMusicOnButton.visible = true;
       this.panelMusicOffButton.visible = true;
       this.panelExit.visible = true;
       this.crossImage.visible = true;
       this.controlText.visible = true;
       this.selectPanel.visible = true;
       this.choosePanelLeft.visible = true;
       this.choosePanelRight.visible = true;
       this.chooseImageLeft.visible = true;
       this.chooseImageRight.visible = true;
       this.line.visible = true;
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
       //  this.container._visible = true;
         /*this.scene.tweens.add({
             targets: this.panel,
             y: this.scene.cameras.cameras[0].centerY - 1000,
             duration: 300,
             ease: Phaser.Math.Easing.Sine.InOut
         })*/
     }

     hideMenuPanel(){
       this.panel.visible = false;
       this.panelMusic.visible = false;
       this.panelMusicOnButton.visible = false;
       this.panelMusicOffButton.visible = false;
       this.panelExit.visible = false;
       this.crossImage.visible = false;
       this.controlText.visible = false;
       this.selectPanel.visible = false;
       this.choosePanelLeft.visible = false;
       this.choosePanelRight.visible = false;
       this.chooseImageLeft.visible = false;
       this.chooseImageRight.visible = false;
       this.line.visible = false;
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
        // this.container._visible = false;
        /*
        this.scene.tweens.add({
            targets: this.panel,
            x: width +1000,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })*/
     }
    
   
  
 }
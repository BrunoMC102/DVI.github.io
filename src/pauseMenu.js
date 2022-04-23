/**
 * Menu cuando se parael juego. Cuando el personaje le de al boton de parar(ESC) 
 */
  export default class PauseMenu {
     /**
      * Constructor de la escena
      */
     constructor(player,scene) {
       // this.container = scene.add.container(640,480);
        this.panel = scene.add.image(640,480,'redPanel').setScrollFactor(0).setDepth(6);
        this.panelMusic = scene.add.image(885,235,'redButton').setScrollFactor(0).setDepth(6);
        this.panelMusicOnButton = scene.add.image(885,235,'musicOn').setScrollFactor(0).setDepth(7);
        this.panelMusicOffButton = scene.add.image(885,235,'musicOff').setScrollFactor(0).setDepth(5);
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
       this.leftImage = scene.add.image(700,630, 'tileLeft').setScrollFactor(0).setDepth(6);
       this.rightImage = scene.add.image(800,630, 'tileRight').setScrollFactor(0).setDepth(6);
       this.eImage = scene.add.image(500,480, 'tileE').setScrollFactor(0).setDepth(6);
       this.fImage = scene.add.image(550,530, 'tileF').setScrollFactor(0).setDepth(6);
       this.gImage = scene.add.image(600,530, 'tileG').setScrollFactor(0).setDepth(6);
       this.cImage = scene.add.image(520,580, 'tileC').setScrollFactor(0).setDepth(6);
       this.spaceLImage = scene.add.image(520,630, 'tileSpaceL').setScrollFactor(0).setDepth(6);
       this.spaceMImage = scene.add.image(550,630, 'tileSpaceM').setScrollFactor(0).setDepth(6);
       this.spaceRImage = scene.add.image(580,630, 'tileSpaceR').setScrollFactor(0).setDepth(6);
       this.escImage = scene.add.image(400,420, 'tileEsc').setScrollFactor(0).setDepth(6);
       this.oneImage = scene.add.image(450,440, 'tile1').setScrollFactor(0).setDepth(6);
       this.twoImage = scene.add.image(500,440, 'tile2').setScrollFactor(0).setDepth(6);
       this.threeImage = scene.add.image(550,440, 'tile3').setScrollFactor(0).setDepth(6);
       
       
        //this.container.add(this.panel)
        //this.container._visible = false;
       this.hideMenuPanel();

     }
   
     

     showMenuPanel(){
       this.panel.visible = true;
       this.panelMusic.visible = true;
       this.panelMusicOnButton.visible = true;
       this.panelMusicOffButton.visible = true;
       this.upImage.visible = true;
       this.downImage.visible = true; 
       this.leftImage.visible = true;
       this.rightImage.visible = true;
       this.eImage.visible = true;
       this.fImage.visible = true; 
       this.gImage.visible = true;
       this.cImage.visible = true;
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
       this.upImage.visible = false;
       this.downImage.visible = false; 
       this.leftImage.visible = false;
       this.rightImage.visible = false;
       this.eImage.visible = false;
       this.fImage.visible = false; 
       this.gImage.visible = false;
       this.cImage.visible = false;
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
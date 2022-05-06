/**
 * Escena de fin de juego. Cuando el personaje principal gane volverá al principio.
 */
export default class Win extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'win' });
  }


  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
    this.power = data.power;
  }

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   */
  create() {

    this.winSound = this.sound.add("winTheme").play();
    const { width, height } = this.sys.game.canvas;

    this.input.gamepad.on(Phaser.Input.Gamepad.Events.BUTTON_DOWN, () => {
      if (this.textCreated) {
        this.cartel.destroy();
        this.text.destroy();
        this.textCreated = false;
        return
      }
      this.sound.stopAll();
      this.scene.start('beginningVillage', { coordinates: { x: 1350, y: 1045 }, playerData: this.playerData, powerUpList: this.powerUpList })
    });

    this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.5, 'atari', 'You have beat the Knightmares\nPress any button to go back home\nand prepare another run', 16)
      .setFontSize(48).setOrigin()  // Colocamos el pivote en el centro de cuadro de texto 
      .setDepth(1);  // Centramos e texto dentro del cuadro de texto
    this.add.image(0, 0, 'menuBackground').setOrigin(0).setDepth(0);
    const timer = this.time.addEvent({
      delay: 1500,
      callback: this.onEvent,
      callbackScope: this
    });

    this.textCreated = false;

    if (this.power > 0) {
      let text;
      if (this.power == 1) {
        text = "You have unlocked double jump. \nPress jump mid air to\n jump twice"
      }
      if (this.power == 2) {
        text = "You have unlocked the dash. \nPress C or L2 to go\n further"
      }
      if (this.power == 3) {
        text = "You have unlocked the mystic\n boxes, Press X or triangle\n to go throw a new box\n or freeze an existing one"
      }
      this.createText(text);
    }

  }
  // Añadimos el listener para cuando se haya pulsado una tecla. 

  onEvent() {
    this.input.keyboard.on('keydown', function (event) {
      if (this.textCreated) {
        this.cartel.destroy();
        this.text.destroy();
        this.textCreated = false;
        return
      }
      this.sound.stopAll();
      this.scene.start('beginningVillage', { coordinates: { x: 1350, y: 1045 }, playerData: this.playerData, powerUpList: this.powerUpList });
    }, this);
  }

  createText(text) {
    this.textCreated = true;
    this.cartel = this.add.sprite(this.cameras.cameras[0].centerX + 800, this.cameras.cameras[0].centerY, 'infoCartel1').setScrollFactor(0).setDepth(3);
    this.cartel.scaleX = 4;
    this.cartel.scaleY = 2;
    this.text = this.add.bitmapText(this.cameras.cameras[0].centerX + 800, this.cameras.cameras[0].centerY, 'atari', text, 16)
    .setFontSize(50)
    .setDepth(4).setScrollFactor(0);
    
    this.tweens.add({
      targets: [this.text],
      x: this.cameras.cameras[0].centerX - 430,
      y: this.cameras.cameras[0].centerY - 50,
      duration: 300,
      ease: 'Sine.easeInOut',
      repeat: 0,
    })

    this.tweens.add({
      targets: [this.cartel],
      x: this.cameras.cameras[0].centerX,
      y: this.cameras.cameras[0].centerY,
      duration: 300,
      ease: 'Sine.easeInOut',
      repeat: 0,
    })
  }
}
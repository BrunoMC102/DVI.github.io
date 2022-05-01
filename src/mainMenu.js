/**
 * Escena de parar el juego. Cuando el personaje le de al boton de parar 
 */
import PasivePowerUpList from "./objetos_recogibles/pasivos/pasivePowerUpList.js";
import PlayerData from "./player/playerData.js";
export default class MainMenu extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'mainMenu' });
  }


  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;

  }

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   */
  create() {
    this.mainMenuTrack = this.sound.add('mainMenuTrack');
    this.mainMenuTrack.play();
    this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'atari', 'Knightmares', 16).setOrigin().setDepth(2).setFontSize(48);
    this.playButton = this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.40, 'atari', 'Play', 16).
      setOrigin().setDepth(2).setFontSize(48);
    this.optionsButton = this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.50, 'atari', 'Fullscreen', 16).
      setOrigin().setDepth(2).setFontSize(48);
    this.add.image(0, 0, 'background').setOrigin(0).setDepth(1);
    this.icono = this.add.sprite(100, 100, "icono").setDepth(3);
    this.icono.setVisible(false);
    this.playButton.setInteractive();
    this.optionsButton.setInteractive();

    this.input.gamepad.on(Phaser.Input.Gamepad.Events.BUTTON_DOWN, () => { this.sound.stopAll();
      this.scene.start(this.scene.start('beginningVillage', { coordinates: { x: 1312, y: 2708 }, playerData: new PlayerData(), powerUpList: new PasivePowerUpList() }));});


    this.playButton.on("pointerover", () => {
      this.icono.setVisible(true);
      this.icono.x = this.playButton.x - this.playButton.width;
      this.icono.y = this.playButton.y;
    })

    this.playButton.on("pointerout", () => {
      this.icono.setVisible(false);


    })
    this.playButton.on("pointerup", () => {
      this.sound.stopAll();
      this.scene.start(this.scene.start('beginningVillage', { coordinates: { x: 1312, y: 2708 }, playerData: new PlayerData(), powerUpList: new PasivePowerUpList() }));
    })

    this.optionsButton.on("pointerover", () => {
      this.icono.setVisible(true);
      this.icono.x = this.optionsButton.x - this.optionsButton.width;
      this.icono.y = this.optionsButton.y;
    })

    this.optionsButton.on("pointerout", () => {
      this.icono.setVisible(false);


    })

    this.optionsButton.on("pointerup", () => {
      //  this.scale.scaleMode = Phaser.Scale.FIT
      this.scale.toggleFullscreen()

    })





  }


}
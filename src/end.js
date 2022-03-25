/**
 * Escena de fin de juego. Cuando el personaje principal tenga 0 de vida terminara el juego y volverá al principio.
 */
import PlayerData from "./player/playerData.js";
export default class End extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'end' });
  }

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   */
  create() {
    this.add.text(500, 250, 'The Knightmares starts again')
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center');  // Centramos e texto dentro del cuadro de texto

        const timer = this.time.addEvent( {
          delay: 2000, 
          callback: this.onEvent(),
          callbackScope: this 
  });
  

  }
    // Añadimos el listener para cuando se haya pulsado una tecla. 

onEvent(){
    this.input.keyboard.on('keydown', function (event) { 
      this.scene.start('beginningVillage', {coordinates: {x: 325, y: 300}, playerData: new PlayerData()});
    }, this);
  }

}
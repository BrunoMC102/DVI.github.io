/**
 * Escena de fin de juego. Cuando el personaje principal tenga 0 de vida terminara el juego y volverá al principio.
 */
export default class End extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'end' });
  }

  
  init(data) {
    this.coordinates = data.coordinates;
    data.playerData.health = 6;
    this.playerData = data.playerData;
    
  }

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   */
  create() {
    
    this.deathSound = this.sound.add("tonedeath").play();
    const {width, height} = this.sys.game.canvas;
    this.add.text(width/2, height/2, 'The Knightmares starts again\nPress any button to fight for your glory',{
      fontSize: "48px",
    })
    
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center').setDepth(2);  // Centramos e texto dentro del cuadro de texto
        this.add.image(0,0, 'menuBackground').setOrigin(0).setDepth(1);
        const timer = this.time.addEvent( {
          delay: 1000, 
          callback: this.onEvent,
          callbackScope: this 
  });
  

  }
    // Añadimos el listener para cuando se haya pulsado una tecla. 

onEvent(){
    this.input.keyboard.on('keydown', function (event) { 
      this.sound.stopAll();
      this.scene.start('beginningVillage', {coordinates: {x: 1350, y: 1045}, playerData:this.playerData});
    }, this);
  }

}
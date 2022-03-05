
import HealthPotion from './healthPotion.js';
import healthPotion from './healthPotion.js';
import Player from './player.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class LevelScroll extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'levelScroll' });
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    const map = this.make.tilemap({ key: 'tilemapJose', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('castle_tileset_part1', 'scroll1');

 
    const wallLayer = map.createLayer('BottomLayer', tileset).setCollisionByProperty({ collides: true });
    this.player = new Player(this, 200, 500);
    this.player.setPlayerData(this.playerData);
    this.cameras.main.startFollow(this.player);
    const voidLayer = map.createLayer('TopLayer', tileset).setCollisionByProperty({ collides: true });

    

    //this.showHitbox(voidLayer);
    //this.showHitbox(wallLayer);
    this.bases = this.add.group();



    
    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, voidLayer);

  

  }

  showHitbox(layer) {
    const debugGraphics = this.add.graphics().setAlpha(0.7);

    layer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243,234,48,255),
      faceColor: new Phaser.Display.Color(40,39,37,255)
    });
  }

  
}
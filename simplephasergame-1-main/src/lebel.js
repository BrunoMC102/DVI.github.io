import Enemy from './enemy.js';
import PlayerTopDown from './playerTopDown.js';
/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Lebel extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  a = null;
  constructor() {
    super({ key: 'lebel' });
    
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create(data) {
    const map = this.make.tilemap({ key: 'tilemap', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');

    const groundLayer = map.createLayer('Ground', tileset);
    const voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    const wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });

    this.playerData = this.cache.json.get('playerData');
    this.player = new PlayerTopDown(this, data.coordinates.x, data.coordinates.y);
    this.player.setPlayerData(this.playerData);

    this.a = new Enemy(this, this.player, this.bases, 450, 200);

    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, voidLayer);
  }

  update(d,dt){
    //Si player pasa del pixel 100 (el puente para ir a la habitacion de la derecha) entocnes empieza la nueva escena y se pasan las coordenadas donde empezara player
    if (this.player.x < 100) {
      this.scene.start('levelTopDown', {coordinates: {x: 1200, y: 500}});
    }
  }
    
    
    
  

}
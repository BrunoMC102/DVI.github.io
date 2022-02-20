import Enemy from './enemy.js';
import PlayerTopDown from './playerTopDown.js';

export default class Lebel extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  a = null;
  constructor() {
    super({ key: 'lebel' });
    
  }

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

    //Hitbox que contiene fisicas para ver si solapa con el player (puede ser un array para tener varias hitbox)
    this.sceneChange = this.add.zone(30, 510, 60, 122);
    this.physics.world.enable(this.sceneChange);
    this.sceneChange.body.setAllowGravity(false);
  }

  update(d,dt){
    if (this.physics.overlap(this.player, this.sceneChange)) {
      this.scene.start('levelTopDown', {coordinates: {x: 1170, y: 500}});
    }
  }
  
}
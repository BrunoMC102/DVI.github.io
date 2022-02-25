import Enemy from './enemy.js';
import Enemy2 from './enemy2.js';
import PlayerTopDown from './playerTopDown.js';

export default class Lebel extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  a = null;
  constructor() {
    super({ key: 'lebel' });
    
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
  }

  create(data) {
    const map = this.make.tilemap({ key: 'tilemap2', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');

    const groundLayer = map.createLayer('Ground', tileset);
    const voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    const wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });

    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y);
    this.player.setPlayerData(this.playerData);

    this.a = new Enemy(this, this.player, 450, 200);
    this.b = new Enemy2(this, this.player, 600, 400);

    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, voidLayer);

    this.physics.add.collider(this.a, wallLayer,()=>this.a.isCol());
    this.physics.add.collider(this.a, voidLayer,()=>this.a.isCol());

    this.physics.add.collider(this.b, wallLayer,()=>this.b.isCol());
    this.physics.add.collider(this.b, voidLayer,()=>this.b.isCol());

    //Hitbox que contiene fisicas para ver si solapa con el player (puede ser un array para tener varias hitbox)
    this.sceneChange = this.add.zone(30, 510, 60, 122);
    this.physics.world.enable(this.sceneChange);
    this.sceneChange.body.setAllowGravity(false);
  }

  update(d,dt){
    if (this.physics.overlap(this.player, this.sceneChange)) {
      this.scene.start('levelTopDown', {coordinates: {x: 1170, y: 500}, playerData: this.player.getPlayerData()});
    }
  }
  
}
import Enemy from './enemy.js';
import Enemy2 from './enemy2.js';
import Enemy3 from './enemy3.js';
import EnemyParent from './enemyParent.js';
import PlayerTopDown from './playerTopDown.js';
import PowerUp from './objetos_recogibles/powerUp.js';
import Enemy4 from './enemy4.js';
import Enemy5 from './enemy5.js';
import Spectral from './objetos_recogibles/pasivos/spectral.js';

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

    this.a = new Enemy4(this, this.player, 450, 200);
    this.b = new Enemy5(this, this.player, 600, 400);
    this.c = new Enemy5(this, this.player, 700, 300);
    new Spectral(this, this.player, 450, 200);

    this.enemies = [this.a,this.b,this.c];
    this.layers = [wallLayer];
    
    

    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, voidLayer);

    this.physics.add.collider(this.a, wallLayer,()=>this.a.isCol());
    this.physics.add.collider(this.a, voidLayer,()=>this.a.isCol());

    this.physics.add.collider(this.b, wallLayer,()=>this.b.isCol());
    this.physics.add.collider(this.b, voidLayer,()=>this.b.isCol());

    this.physics.add.collider(this.c, wallLayer,()=>this.c.isCol());
    this.physics.add.collider(this.c, voidLayer,()=>this.c.isCol());

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
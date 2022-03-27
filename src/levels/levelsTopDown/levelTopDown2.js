import EnemyParent from '../../enemies/enemyParent.js';
import PlayerTopDown from '../../player/playerTopDown.js';
import Enemy from '../../enemies/enemy.js';
import Enemy2 from '../../enemies/enemy2.js';
import Enemy3 from '../../enemies/enemy3.js';
import Enemy4 from '../../enemies/enemy4.js';
import Enemy5 from '../../enemies/enemy5.js';
import Spectral from '../../objetos_recogibles/pasivos/spectral.js';
import Enemy7 from '../../enemies/enemy7.js';
import EnemyFire from '../../enemies/enemyFire.js';
import Mosca from '../../enemies/mosca.js';
import Inverter from '../../enemies/inverter.js';

export default class LevelTopDown2 extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  a = null;
  constructor() {
    super({ key: 'levelTopDown2' });
    
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
  }

  create(data) {
    const map = this.make.tilemap({ key: 'tilemap2', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');

    const groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });

    this.enemies = this.add.group();
    this.projectiles = this.add.group();

    //this.a = new Enemy(this, this.player, 450, 200);
    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.b = new Inverter(this, this.player, 1170, 500);
    this.a = new Mosca(this, this.player, 800, 200);
    new Spectral(this, this.player, 450, 200);
    
    
    
    this.enemies.add(this.b);
    this.enemies.add(this.a);

    //this.layers = [wallLayer];
    
    

    

    //this.physics.add.collider(this.a, wallLayer,()=>this.a.isCol());
    //this.physics.add.collider(this.a, voidLayer,()=>this.a.isCol());

    //this.physics.add.collider(this.b, this.wallLayer,()=>this.b.isCol());
    //this.physics.add.collider(this.b, this.voidLayer,()=>this.b.isCol());

    //Hitbox que contiene fisicas para ver si solapa con el player (puede ser un array para tener varias hitbox)
    this.sceneChange = [this.add.zone(1250, 510, 60, 122), this.add.zone(30, 510, 60, 122)];
    this.physics.world.enable(this.sceneChange);
    this.zoneGroup = this.add.group();
    this.zoneGroup.add(this.sceneChange[0]);
    this.zoneGroup.add(this.sceneChange[1]);
    this.physics.add.collider(this.enemies,this.zoneGroup);
    this.sceneChange[0].body.setImmovable(true);
    this.sceneChange[1].body.setImmovable(true);
    this.sceneChange[0].body.setAllowGravity(false);
    this.sceneChange[1].body.setAllowGravity(false);
  }

  finishGame(){
    this.sound.stopAll();
    this.scene.start("end", {coordinates: {x: 100, y: 500}, playerData:this.playerData});
  }

  update(d,dt){
    if (this.physics.overlap(this.player, this.sceneChange[0])) {
      this.scene.start('levelTopDown3', {coordinates: {x: 100, y: 500}, playerData: this.playerData});
    }
    if (this.physics.overlap(this.player, this.sceneChange[1])) {
      this.scene.start('levelTopDown', {coordinates: {x: 1170, y: 500}, playerData: this.playerData});
    }
  }
  
}
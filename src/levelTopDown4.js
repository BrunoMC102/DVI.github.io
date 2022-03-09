import EnemyParent from './enemyParent.js';
import PlayerTopDown from './playerTopDown.js';
import Enemy from './enemy.js';
import Enemy2 from './enemy2.js';
import Enemy3 from './enemy3.js';
import Enemy4 from './enemy4.js';
import Enemy5 from './enemy5.js';
import Enemy6 from './enemies/enemy6.js';
import Spectral from './objetos_recogibles/pasivos/spectral.js';
import Enemy6_2 from './enemies/enemy6_2.js';

export default class LevelTopDown4 extends Phaser.Scene {

  constructor() {
    super({ key: 'levelTopDown4' });
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap4', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');

    const groundLayer = map.createLayer('Ground', tileset);
    const voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    const wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });

    //this.showHitbox(voidLayer);
    //this.showHitbox(wallLayer);
    this.bases = this.add.group();

    this.layers = [wallLayer];
    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y);
    this.player.life = this.currentLife;
    this.player.setPlayerData(this.playerData);

    this.a = new Enemy6(this, this.player, 500, 300);
    this.b = new Enemy6_2(this, this.player, 700, 300);
    this.enemies = [this.a,this.b];
    this.layers = [wallLayer];

    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, voidLayer);

    this.physics.add.collider(this.a, wallLayer,()=>this.a.isCol());
    this.physics.add.collider(this.a, voidLayer,()=>this.a.isCol());

    this.physics.add.collider(this.b, wallLayer,()=>this.b.isCol());
    this.physics.add.collider(this.b, voidLayer,()=>this.b.isCol());

    //Hitbox que contiene fisicas para ver si solapa con el player (puede ser un array para tener varias hitbox)
    this.sceneChange = [this.add.zone(1250, 510, 60, 122), this.add.zone(30, 510, 60, 122)];
    this.physics.world.enable(this.sceneChange);
    this.sceneChange[0].body.setAllowGravity(false);
    this.sceneChange[1].body.setAllowGravity(false);
  }

  update() {
    //Esto es mejor porque solo revisa si se encuentra en la hitbox
    if (this.physics.overlap(this.player, this.sceneChange[0])) {
      this.scene.start('levelTopDown', {coordinates: {x: 100, y: 500}, playerData:this.player.getPlayerData()});
    }
    if (this.physics.overlap(this.player, this.sceneChange[1])) {
      this.scene.start('levelTopDown3', {coordinates: {x: 1170, y: 500}, playerData:this.player.getPlayerData()});
    }
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
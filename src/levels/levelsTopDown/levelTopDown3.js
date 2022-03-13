import EnemyParent from '../../enemies/enemyParent.js';
import PlayerTopDown from '../../player/playerTopDown.js';
import Enemy from '../../enemies/enemy.js';
import Enemy2 from '../../enemies/enemy2.js';
import Enemy3 from '../../enemies/enemy3.js';
import Enemy4 from '../../enemies/enemy4.js';
import Enemy5 from '../../enemies/enemy5.js';
import Spectral from '../../objetos_recogibles/pasivos/spectral.js';

export default class LevelTopDown3 extends Phaser.Scene {

  constructor() {
    super({ key: 'levelTopDown3' });
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap3', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');

    const groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });

    //this.showHitbox(voidLayer);
    //this.showHitbox(wallLayer);
    
    this.enemies = this.add.group();

    
    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y, this.playerData);
    
    

    this.a = new Enemy2(this, this.player, 600, 400);
    
    this.enemies.add(this.a);

    

    

    this.sceneChange = [this.add.zone(1250, 510, 60, 122), this.add.zone(30, 510, 60, 122)];
    this.physics.world.enable(this.sceneChange);
    this.sceneChange[0].body.setAllowGravity(false);
    this.sceneChange[1].body.setAllowGravity(false);
  }

  update() {
    //Esto es mejor porque solo revisa si se encuentra en la hitbox
    if (this.physics.overlap(this.player, this.sceneChange[0])) {
      this.scene.start('levelTopDown4', {coordinates: {x: 100, y: 500}, playerData:this.playerData});
    }
    if (this.physics.overlap(this.player, this.sceneChange[1])) {
      this.scene.start('levelTopDown2', {coordinates: {x: 1170, y: 500}, playerData:this.playerData});
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
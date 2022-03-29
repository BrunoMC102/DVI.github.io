import EnemyParent from '../../enemies/enemyParent.js';
import PlayerTopDown from '../../player/playerTopDown.js';
import Enemy from '../../enemies/enemy.js';
import Enemy2 from '../../enemies/enemy2.js';
import Enemy3 from '../../enemies/enemy3.js';
import Enemy4 from '../../enemies/enemy4.js';
import Enemy5 from '../../enemies/enemy5.js';
import Archer from '../../enemies/archer.js';
import Spectral from '../../objetos_recogibles/pasivos/spectral.js';
import Enemy6_2 from '../../enemies/enemy6_2.js';

export default class LevelTopDown extends Phaser.Scene {

  constructor() {
    super({ key: 'levelTopDown5' });
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap5', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');

    const groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
    
    this.enemies = this.add.group();
    this.projectiles = this.add.group();
    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y, this.playerData);

    this.enemies.add(new Archer(this, this.player, 500, 500));
    
    this.sceneChange = [this.add.zone(1250, 510, 60, 122), this.add.zone(30, 510, 60, 122)];
    this.zoneGroup = this.add.group();
    this.zoneGroup.add(this.sceneChange[0]);
    this.zoneGroup.add(this.sceneChange[1]);
    this.physics.add.collider(this.enemies,this.zoneGroup);
    this.physics.world.enable(this.sceneChange);
    this.sceneChange[0].body.setAllowGravity(false);
    this.sceneChange[1].body.setAllowGravity(false);
    this.dungeonSound = this.sound.add("dungeontheme").play();

  }

  update() {
    if (this.physics.overlap(this.player, this.sceneChange[0])) {
      this.scene.start('levelTopDown', {coordinates: {x: 100, y: 500}, playerData:this.playerData});
    }
    if (this.physics.overlap(this.player, this.sceneChange[1])) {
      this.scene.start('levelTopDown4', {coordinates: {x: 100, y: 500}, playerData:this.playerData});
    }
  }

  finishGame(){
    this.sound.stopAll();
    this.scene.start("end", {coordinates: {x: 100, y: 500}, playerData:this.playerData});
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
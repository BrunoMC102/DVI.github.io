import HealthPotion from '../../objetos_recogibles/consumibles/healthPotion.js';
import Key from '../../objetos_recogibles/pasivos/key.js';
import Player from '../../player/player.js';
import PlayerTopDown from '../../player/playerTopDown.js';

/**
 .
 * @extends Phaser.Scene
 */
export default class LevelScroll3 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scroll3' });
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
  }

  create() {
    const map = this.make.tilemap({ key: 'Scroll3', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('tileset-cave2', 'scrollTileset');
 
    const backgroundLayer = map.createLayer('BackgroundLayer', tileset).setCollisionByProperty({ collides: true })
    this.player = new Player(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.key = new Key(this, this.player, 200, 420, 'Key5');
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0,0,5120,1600);
    const wallLayer = map.createLayer('WallLayer', tileset).setCollisionByProperty({ collides: true });
    this.backgroundLayer = backgroundLayer;
    this.wallLayer = wallLayer;

    this.lava = [this.add.zone(3000,1400,4450,50)];
    this.physics.world.enable(this.lava); 
    this.lava[0].body.setAllowGravity(false);

    this.sceneChange =  [this.add.zone(40,1200,60,122)];
    this.physics.world.enable(this.sceneChange); 
    this.sceneChange[0].body.setAllowGravity(false);

    this.physics.add.collider(this.player, wallLayer);
  }

  update() {
    if (this.physics.overlap(this.player, this.sceneChange[0])) {
      this.scene.start('initialLevel', { coordinates: { x: 500, y: 500 }, playerData: this.playerData, powerUpList: this.powerUpList });
    }
    if (this.physics.overlap(this.player, this.lava[0])) {
      this.scene.start("end", { coordinates: { x: 100, y: 500 }, playerData: this.playerData });
    }
  }
}
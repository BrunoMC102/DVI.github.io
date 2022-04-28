import HealthPotion from '../../objetos_recogibles/consumibles/healthPotion.js';
import Key from '../../objetos_recogibles/pasivos/key.js';
import Player from '../../player/player.js';
import PlayerTopDown from '../../player/playerTopDown.js';

/**
 .
 * @extends Phaser.Scene
 */
export default class LevelScroll4 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scroll4' });
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
  }

  create() {
    const map = this.make.tilemap({ key: 'Scroll4', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('tileset-cave2', 'scrollTileset');

    const backgroundLayer = map.createLayer('BackgroundLayer', tileset).setCollisionByProperty({ collides: true })
    this.player = new Player(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.key = new Key(this, this.player, 2350, 400, 'Key3');
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, 5120, 6000);
    const wallLayer = map.createLayer('WallLayer', tileset).setCollisionByProperty({ collides: true });
    this.backgroundLayer = backgroundLayer;
    this.wallLayer = wallLayer;

    this.spikes = [this.add.zone(1450, 2750, 1200, 60), this.add.zone(3225, 1980, 450, 60), this.add.zone(2850, 520, 850, 60)];
    this.physics.world.enable(this.spikes);
    this.spikes[0].body.setAllowGravity(false);
    this.spikes[1].body.setAllowGravity(false);
    this.spikes[2].body.setAllowGravity(false);

    this.sceneChange = [this.add.zone(40, 650, 60, 250), this.add.zone(4500, 1000, 60, 200)];
    this.physics.world.enable(this.sceneChange);
    this.sceneChange[0].body.setAllowGravity(false);
    this.sceneChange[1].body.setAllowGravity(false);

    this.physics.add.collider(this.player, wallLayer);
  }

  update() {
    if (this.physics.overlap(this.player, this.sceneChange[0]) || this.physics.overlap(this.player, this.sceneChange[1])) {
      this.scene.start('initialLevel', { coordinates: { x: 500, y: 500 }, playerData: this.playerData, powerUpList: this.powerUpList });
    }
    if (this.physics.overlap(this.player, this.spikes[0]) || this.physics.overlap(this.player, this.spikes[1]) || this.physics.overlap(this.player, this.spikes[2])) {
      this.scene.start("end", { coordinates: { x: 100, y: 500 }, playerData: this.playerData });
    }
  }
}
import Key from '../../objetos_recogibles/pasivos/key.js';
import Player from '../../player/player.js';

/**
 .
 * @extends Phaser.Scene
 */
export default class LevelScroll4 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scroll4' });
  }

  init(data) {
    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
    this.levelList = data.levelList;
    this.coordinates = {x: 100, y: 700};
  }

  create() {
    this.events.on('wake', this.onWake, this);
    const map = this.make.tilemap({ key: 'Scroll4', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('tileset-cave2', 'scrollTileset');

    const backgroundLayer = map.createLayer('BackgroundLayer', tileset).setCollisionByProperty({ collides: true })
    this.player = new Player(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.key = new Key(this, this.player, 2350, 400, 'Key3', 'Secret Key 4', 4);
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

  onWake(sys,data){
    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
    if (data.levelList != undefined)
      this.levelList = data.levelList;
    this.direction = data.direction;
    this.coordinates = {x: 100, y: 700};

    this.player.restart(this.coordinates.x, this.coordinates.y, this.playerData);
  }

  update() {
    if (this.physics.overlap(this.player, this.sceneChange[0]) || this.physics.overlap(this.player, this.sceneChange[1])) {
      this.scene.sleep('Scroll4');
      this.scene.run('initialLevel',  { playerData: this.playerData, levelList: this.levelList, powerUpList: this.powerUpList, direction: 7 });
    }
    if (this.physics.overlap(this.player, this.spikes[0]) || this.physics.overlap(this.player, this.spikes[1]) || this.physics.overlap(this.player, this.spikes[2])) {
      this.playerData.die();
      this.scene.start("end", { coordinates: { x: 100, y: 500 }, playerData: this.playerData });
    }
  }
}
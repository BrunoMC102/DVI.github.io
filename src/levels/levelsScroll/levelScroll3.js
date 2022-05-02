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
    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
    this.levelList = data.levelList;
    this.coordinates = {x: 100, y: 1230};
  }

  create() {
    this.events.on('wake', this.onWake, this);
    const map = this.make.tilemap({ key: 'Scroll3', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('tileset-cave2', 'scrollTileset');
 
    const backgroundLayer = map.createLayer('BackgroundLayer', tileset).setCollisionByProperty({ collides: true })
    this.player = new Player(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.key = new Key(this, this.player, 200, 420, 'Key5', 'Secret Key 3');
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

  onWake(sys,data){
    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
    if (data.levelList != undefined)
      this.levelList = data.levelList;
    this.direction = data.direction;
    this.coordinates = {x: 100, y: 1230};

    this.player.restart(this.coordinates.x, this.coordinates.y, this.playerData);
  }

  update() {
    if (this.physics.overlap(this.player, this.sceneChange[0])) {
      this.scene.sleep('Scroll3');
      this.scene.run('initialLevel',  { playerData: this.playerData, levelList: this.levelList, powerUpList: this.powerUpList, direction: 6 });
    }
    if (this.physics.overlap(this.player, this.lava[0])) {
      this.playerData.die();
      this.scene.start("end", { coordinates: { x: 100, y: 500 }, playerData: this.playerData });
    }
  }
}
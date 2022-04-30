import HealthPotion from '../../objetos_recogibles/consumibles/healthPotion.js';
import Key from '../../objetos_recogibles/pasivos/key.js';
import Player from '../../player/player.js';
import PlayerTopDown from '../../player/playerTopDown.js';

/**
 .
 * @extends Phaser.Scene
 */
export default class LevelScroll1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scroll1' });
  }

  init(data) {
    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
    this.levelList = data.levelList;
    this.coordinates = {x: 100, y: 800};
  }

  create() {
    this.events.on('wake', this.onWake, this);
    const map = this.make.tilemap({ key: 'Scroll1', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('tileset-cave2', 'scrollTileset');
 
    const backgroundLayer = map.createLayer('BackgroundLayer', tileset).setCollisionByProperty({ collides: true })
    this.player = new Player(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.key = new Key(this, this.player, 400, 450, 'Key1');
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0,0,5120,1280);
    const wallLayer = map.createLayer('WallLayer', tileset).setCollisionByProperty({ collides: true });
    this.backgroundLayer = backgroundLayer;
    this.wallLayer = wallLayer;

    this.spikes = [this.add.zone(800,1150,350,50),this.add.zone(3485,1210,850,60)];
    this.spikes.forEach((o2) =>{
      this.physics.add.existing(o2,true); 
    })


    this.sceneChange =  [this.add.zone(40,880,60,122), this.add.zone(4750,825,60,225)];
    this.sceneChange.forEach((o2) =>{
      this.physics.add.existing(o2,true); 
    })

    this.physics.add.collider(this.player, wallLayer);
  }

  onWake(sys,data){
    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
    if (data.levelList != undefined)
      this.levelList = data.levelList;
    this.direction = data.direction;
    this.coordinates = {x: 100, y: 800};

    this.player.restart(this.coordinates.x, this.coordinates.y, this.playerData);
  }

  update() {
    if (this.physics.overlap(this.player, this.sceneChange[0]) || this.physics.overlap(this.player, this.sceneChange[1])) {
      this.scene.sleep('Scroll1');
      this.scene.run('initialLevel',  { playerData: this.playerData, levelList: this.levelList, powerUpList: this.powerUpList, direction: 4 });
    }
    if (this.physics.overlap(this.player, this.spikes[0]) || this.physics.overlap(this.player, this.spikes[1])) {
      this.scene.start("end", { coordinates: { x: 100, y: 500 }, playerData: this.playerData });
    }
  }
}
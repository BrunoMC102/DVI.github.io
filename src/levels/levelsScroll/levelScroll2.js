
import HealthPotion from '../../objetos_recogibles/consumibles/healthPotion.js';
import Key from '../../objetos_recogibles/pasivos/key.js';
import Player from '../../player/player.js';
import PlayerTopDown from '../../player/playerTopDown.js';

/**
 .
 * @extends Phaser.Scene
 */
export default class LevelScroll2 extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'Scroll2' });
  }

  init(data) {
    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
    this.levelList = data.levelList;
    this.coordinates = {x: 200, y: 4730};
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    this.events.on('wake', this.onWake, this);
    const map = this.make.tilemap({ key: 'Scroll2', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('tileset-cave2', 'scrollTileset');

 
    const backgroundLayer = map.createLayer('BackgroundLayer', tileset).setCollisionByProperty({ collides: true })
    this.player = new Player(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.key = new Key(this, this.player,1284.85 , 606, 'Key2');
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0,0,2560,5120);
    const wallLayer = map.createLayer('WallLayer', tileset).setCollisionByProperty({ collides: true });
    this.backgroundLayer = backgroundLayer;
    this.wallLayer = wallLayer;

    this.sceneChange =  [this.add.zone(40,4700,60,300)];
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
    this.coordinates = {x: 200, y: 4730};

    this.player.restart(this.coordinates.x, this.coordinates.y, this.playerData);
  }

  update() {
    if (this.physics.overlap(this.player, this.sceneChange[0])) {
      this.scene.sleep('Scroll2');
      this.scene.run('initialLevel',  { playerData: this.playerData, levelList: this.levelList, powerUpList: this.powerUpList, direction: 5 });
    }
  }

}
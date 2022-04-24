
import HealthPotion from '../../objetos_recogibles/consumibles/healthPotion.js';
import Player from '../../player/player.js';
import PlayerTopDown from '../../player/playerTopDown.js';

/**
 .
 * @extends Phaser.Scene
 */
export default class LevelScrollFinal extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'scroll1' });
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    const map = this.make.tilemap({ key: 'Scroll', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('tileset-cave2', 'scrollTileset');

 
    const backgroundLayer = map.createLayer('BackgroundLayer', tileset).setCollisionByProperty({ collides: true })
    this.player = new Player(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0,0,5120,1280);
    const wallLayer = map.createLayer('WallLayer', tileset).setCollisionByProperty({ collides: true });
    this.backgroundLayer = backgroundLayer;
    this.wallLayer = wallLayer;

    

    //this.showHitbox(wallLayer);
    this.sceneChange =  [this.add.zone(40,880,60,122)];
    this.physics.world.enable(this.sceneChange); 
    this.sceneChange[0].body.setAllowGravity(false);
   // this.sceneChange[1].body.setAllowGravity(false);
    //this.sceneChange[2].body.setAllowGravity(false);
    //this.sceneChange[3].body.setAllowGravity(false);

     this.physics.add.collider(this.player, wallLayer);


  }

  update() {
    //Esto es mejor porque solo revisa si se encuentra en la hitbox
    
    if (this.physics.overlap(this.player, this.sceneChange[0])) {
      //this.scene.start('initialLevel', {coordinates: {x: 100, y: 500},playerData:this.playerData,});
    }
   
    /*
    if (this.physics.overlap(this.player, this.sceneChange[2])) {
      //this.scene.start('beginningVillage', {coordinates: {x: 100, y: 500},playerData:this.playerData});
    }
    if (this.physics.overlap(this.player, this.sceneChange[3])) {
      //this.scene.start('levelTopDown4', {coordinates: {x: 100, y: 500}, playerData:this.playerData});
    }*/
  
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

import Player from '../player/player.js';
import PlayerTopDown from '../player/playerTopDown.js';

/**
 .
 * @extends Phaser.Scene
 */
export default class BeginningVillage extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'beginningVillage' });
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    const map = this.make.tilemap({ key: 'tilemapVillage', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('cottageFinal', 'cottages');
    const tileset2 = map.addTilesetImage('decorations-medieval', 'decorationMedieval');
    const tileset3 = map.addTilesetImage('fence_medieval', 'fenceMedieval');
    const tileset4 = map.addTilesetImage('terrain-v7', 'terreno');
    const tileset5 = map.addTilesetImage('trees-pale', 'trees');
    const tileset6 = map.addTilesetImage('thatched-roofFinal2', 'roofNormal');



 
    const bottomLayer = map.createLayer('BottomLayer', [tileset,tileset2,tileset3, tileset4, tileset5, tileset6]).setCollisionByProperty({ collides: true });
    
    
    const midLayer = map.createLayer('MidLayer', [tileset,tileset2,tileset3, tileset4, tileset5, tileset6]).setCollisionByProperty({ collides: true });
     this.enemies = this.add.group();
    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0,0,3840,1920);
    this.player.body.setCollideWorldBounds(false);
    const topLayer = map.createLayer('TopLayer', [tileset,tileset2,tileset3, tileset4, tileset5, tileset6]).setCollisionByProperty({ collides: true });
    const Roofs = map.createLayer('Roofs', [tileset,tileset2,tileset3, tileset4, tileset5, tileset6]).setCollisionByProperty({ collides: true });
    

    //this.showHitbox(voidLayer);
    //this.showHitbox(wallLayer);
   
    this.sceneChange =  [this.add.zone(3800,950,60,600)];
    this.physics.world.enable(this.sceneChange); 
    this.sceneChange[0].body.setAllowGravity(false);


    
    // this.physics.add.collider(this.player, wallLayer);

    this.physics.add.collider(this.player, midLayer);
    midLayer.setCollisionBetween(0,999);
    this.villageSound = this.sound.add("villagetheme");
    this.villageSound.play();

  

  }

  update() {
    //Esto es mejor porque solo revisa si se encuentra en la hitbox
    if (this.physics.overlap(this.player, this.sceneChange[0])) {
      this.sound.stopAll();
      this.scene.start('levelTopDown', {coordinates: {x: 100, y: 500},playerData:this.playerData});
    }
    /*
    if (this.physics.overlap(this.player, this.sceneChange[1])) {
      this.scene.start('levelTopDown2', {coordinates: {x: 100, y: 500},playerData:this.playerData});
    }
    if (this.physics.overlap(this.player, this.sceneChange[2])) {
      this.scene.start('levelTopDown3', {coordinates: {x: 100, y: 500},playerData:this.playerData});
    }
    if (this.physics.overlap(this.player, this.sceneChange[3])) {
      this.scene.start('levelTopDown4', {coordinates: {x: 100, y: 500}, playerData:this.playerData});
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
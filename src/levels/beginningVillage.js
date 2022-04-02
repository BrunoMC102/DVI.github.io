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
    const tileset = map.addTilesetImage('cottage', 'cottages');
    const tileset2 = map.addTilesetImage('decorations-medieval', 'decorationMedieval');
    const tileset3 = map.addTilesetImage('fence_medieval', 'fenceMedieval');
    const tileset4 = map.addTilesetImage('terrain-v7', 'terreno');
    const tileset5 = map.addTilesetImage('trees-pale', 'trees');
    const tileset6 = map.addTilesetImage('thatched-roof', 'roofNormal');
    const tileset7 = map.addTilesetImage('doors', 'doors');
    const tileset8 = map.addTilesetImage('windows', 'windows');

    const bottomLayer = map.createLayer('BottomLayer', [tileset,tileset2,tileset3, tileset4, tileset5, tileset6,tileset7,tileset8]).setCollisionByProperty({ collides: true });
    const bottomLayer2 = map.createLayer('BottomLayer2', [tileset,tileset2,tileset3, tileset4, tileset5, tileset6,tileset7,tileset8]).setCollisionByProperty({ collides: true });
    
    const midLayer = map.createLayer('MidLayer', [tileset,tileset2,tileset3, tileset4, tileset5, tileset6,tileset7,tileset8]).setCollisionByProperty({ collides: true });
    this.enemies = this.add.group();
    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0,0,5120,3840);
    this.player.body.setCollideWorldBounds(false);
    this.general = this.add.sprite(4193.94,2590.91,"npcs","general_3.png");
    this.blacksmith = this.add.sprite(3878, 1500, "npcs","herrero_3.png");
    this.npcs =this.add.group();
    this.npcs.add(this.blacksmith);
    this.npcs.add(this.general);
    this.physics.add.existing(this.general);
    
    this.general.body.allowGravity = false;
    this.general.body.immovable = true;
    
    //const npcs = map.createFromObjects('npcs');
    //for (const objeto of this.scene.map.getObjectLayer('npcs').objects) {
      //if (objeto.type === 'blacksmith') {
        //this.add.sprite(objeto.x, objeto.y,'blacksmith');
      //}
      //if (objeto.type === 'general') {
      //  this.add.sprite(objeto.x, objeto.y,'general');
    //  
      
  //}
    const topLayer = map.createLayer('TopLayer', [tileset,tileset2,tileset3, tileset4, tileset5, tileset6,tileset7,tileset8]).setCollisionByProperty({ collides: true });
    const Roofs = map.createLayer('Roofs', [tileset,tileset2,tileset3, tileset4, tileset5, tileset6,tileset7,tileset8]).setCollisionByProperty({ collides: true });
   
    this.sceneChange =  [this.add.zone(2560,1225,300,320), this.add.zone(2565, 1250, 425, 225)];
    this.physics.world.enable(this.sceneChange); 
    this.sceneChange[0].body.setAllowGravity(false);
    this.sceneChange[1].body.setAllowGravity(false);

    this.physics.add.collider(this.player, midLayer);
    this.physics.add.collider(this.player,topLayer);
    this.physics.add.collider(this.player, this.npcs, (o2) => {
      if(o2 === this.blacksmith){
        this.startDialog();
      }else this.startDialog();
    });
    this.villageSound = this.sound.add("villagetheme", {loop: true});
    this.villageSound.play();
    this.changingScene = false;
    this.cameras.main.fadeIn(1000);
  }

  update(d, dt) {
      if ((this.physics.overlap(this.player, this.sceneChange[0]) || this.physics.overlap(this.player, this.sceneChange[1])) && this.changingScene == false) {
        this.changingScene = true;
        this.sound.stopAll();
        this.cameras.main.fadeOut(1000);
        this.time.delayedCall(1450, () => {
          this.scene.start('levelTopDown', {coordinates: {x: 100, y: 500},playerData:this.playerData});
        });
      }
    }
    /*
    if (this.physics.overlap(this.player, this.sceneChange[3])) {
      this.scene.start('levelTopDown4', {coordinates: {x: 100, y: 500}, playerData:this.playerData});
    }*/
  
  

  startDialog(){
    const bg = this.add.rectangle(0,960,this.scale.width*2,600,"0x914f1d").setScrollFactor(0).setDepth(6);
    this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height * 0.5,'atari', 'HELLO THERE LITTLE KNIGHT',16)
    .setFontSize(48).setOrigin()  // Colocamos el pivote en el centro de cuadro de texto 
     .setDepth(8); 

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

import HealthPotion from '../../objetos_recogibles/consumibles/healthPotion.js';
import Player from '../../player/player.js';

/**
 .
 * @extends Phaser.Scene
 */
export default class LevelScroll extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'levelScroll' });
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    const map = this.make.tilemap({ key: 'tilemapJose', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('castle_tileset_part1', 'scroll1');
    const tileset2 = map.addTilesetImage('castle_tileset_part2', 'scroll2');
    const tileset3 = map.addTilesetImage('castle_tileset_part3', 'scroll3');

 
    const wallLayer = map.createLayer('BottomLayer', [tileset,tileset2,tileset3]).setCollisionByProperty({ collides: true }).setScrollFactor(0,0);
    this.player = new Player(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0,0,3840,960);
   
    
    const voidLayer = map.createLayer('TopLayer', [tileset,tileset2,tileset3]).setCollisionByProperty({ collides: true });

    

    //this.showHitbox(voidLayer);
    //this.showHitbox(wallLayer);
    this.bases = this.add.group();
    this.sceneChange =  [this.add.zone(50,810,60,122),this.add.zone(3800, 400, 60, 122), this.add.zone(3800,800,60,122), this.add.zone(50,200,60,122)];
    this.physics.world.enable(this.sceneChange); 
    this.sceneChange[0].body.setAllowGravity(false);
    this.sceneChange[1].body.setAllowGravity(false);
    this.sceneChange[2].body.setAllowGravity(false);
    this.sceneChange[3].body.setAllowGravity(false);

    // this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, voidLayer);


  }

  update() {
    //Esto es mejor porque solo revisa si se encuentra en la hitbox
    if (this.physics.overlap(this.player, this.sceneChange[0])) {
      this.scene.start('levelTopDown', {coordinates: {x: 100, y: 500},playerData:this.playerData});
    }
    if (this.physics.overlap(this.player, this.sceneChange[1])) {
      this.scene.start('levelTopDown2', {coordinates: {x: 100, y: 500},playerData:this.playerData});
    }
    if (this.physics.overlap(this.player, this.sceneChange[2])) {
      this.scene.start('beginningVillage', {coordinates: {x: 100, y: 500},playerData:this.playerData});
    }
    if (this.physics.overlap(this.player, this.sceneChange[3])) {
      this.scene.start('levelTopDown4', {coordinates: {x: 100, y: 500}, playerData:this.playerData});
    }
  
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
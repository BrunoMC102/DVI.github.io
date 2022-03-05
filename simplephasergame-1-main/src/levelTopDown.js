import HealthPotion from './healthPotion.js';
import PlayerTopDown from './playerTopDown.js';
import PowerUp from './powerUp.js';

export default class LevelTopDown extends Phaser.Scene {

  constructor() {
    super({ key: 'levelTopDown' });
  }


  

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap1', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');

    const groundLayer = map.createLayer('Ground', tileset);
    const voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    const wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });

    //this.showHitbox(voidLayer);
    //this.showHitbox(wallLayer);
    this.bases = this.add.group();

    this.layers = [wallLayer];
    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y);
    this.player.life = this.currentLife;
    this.player.setPlayerData(this.playerData);

    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, voidLayer);
    new PowerUp(this, this.player, 450, 200);
    new HealthPotion(this, this.player, 600, 200);


    //Hitbox que contiene fisicas para ver si solapa con el player (puede ser un array para tener varias hitbox)
    this.sceneChange = [this.add.zone(1250, 510, 60, 122), this.add.zone(993,60,60,20)];
    this.physics.world.enable(this.sceneChange);
    this.sceneChange[0].body.setAllowGravity(false);
    this.sceneChange[1].body.setAllowGravity(false);
  }

  update() {
    //Esto es mejor porque solo revisa si se encuentra en la hitbox
    if (this.physics.overlap(this.player, this.sceneChange[0])) {
      this.scene.start('lebel', {coordinates: {x: 100, y: 500}, playerData:this.player.getPlayerData()});
    }
    if (this.physics.overlap(this.player, this.sceneChange[1])) {
      this.scene.start('levelScroll', {coordinates: {x: 100, y: 500}, playerData:this.player.getPlayerData()});
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
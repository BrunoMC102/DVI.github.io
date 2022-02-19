import Platform from './platform.js';
import Player from './player.js';
import PlayerTopDown from './playerTopDown.js';

export default class LevelTopDown extends Phaser.Scene {

  constructor() {
    super({ key: 'levelTopDown' });
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');

    const groundLayer = map.createLayer('Ground', tileset);
    const voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    const wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });

    //Esta funcion hace que se vea la hitbox del vacio y de las paredes
    /* 
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    wallLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243,234,48,255),
      faceColor: new Phaser.Display.Color(40,39,37,255)
    });

    voidLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243,234,48,255),
      faceColor: new Phaser.Display.Color(40,39,37,255)
    });*/

    this.bases = this.add.group();
    this.player = new PlayerTopDown(this, 200, 300);
    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, voidLayer);
  }

}
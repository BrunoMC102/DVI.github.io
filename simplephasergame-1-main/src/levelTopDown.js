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
    map.createLayer('Backround1', tileset);
    map.createLayer('Backround2', tileset);

    this.bases = this.add.group();
    this.player = new PlayerTopDown(this, 200, 300);
  }

}
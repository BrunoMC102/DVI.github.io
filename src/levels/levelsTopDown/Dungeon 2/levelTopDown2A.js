import LevelParent from '../levelParent.js';
import Mosca from '../../../enemies/mosca.js'


export default class LevelTopDown2A extends LevelParent {

  constructor(key) {
    super(key, {
      north: true,
      south: true,
      west: true,
      east: true
    });
    this.iden = 'T1';
  }

  createEnemies(){
    return [new Mosca(this, this.player, 200, 200), new Mosca(this, this.player, 1100, 200), new Mosca(this, this.player, 1100, 800), new Mosca(this, this.player, 200, 800)];
  }
  

  setTileSet() {
    const map = this.make.tilemap({ key: 'Dungeon2A', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
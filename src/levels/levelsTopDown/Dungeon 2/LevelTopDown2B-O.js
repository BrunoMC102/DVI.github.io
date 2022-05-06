import GoblinKing from '../../../enemies/goblinKing.js';
import LevelParent from '../levelParent.js';
import Mosca from '../../../enemies/mosca.js'

export default class LevelTopDown2B_O extends LevelParent {

  constructor(key) {
    super(key, {
      north: true,
      south: true,
      west: false,
      east: true
    });
    this.iden = 'T1';
  }

  createEnemies(){
    return [new Mosca(this, this.player, 640, 200), new Mosca(this, this.player, 640, 800), new GoblinKing(this,this.player, 640, 500)];
  }
  

  setTileSet() {
    const map = this.make.tilemap({ key: 'Dungeon2B-O', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
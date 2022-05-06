import GoblinKing from '../../../enemies/goblinKing.js';
import LevelParent from '../levelParent.js';
import Mosca from '../../../enemies/mosca.js';

export default class LevelTopDown5C_EO extends LevelParent {

  constructor(key) {
    super(key, {
      north: false,
      south: false,
      west: true,
      east: true
    });
    this.iden = 'T1';
  }

  createEnemies(){
    return [new GoblinKing(this, this.player, 640, 500), new Mosca(this, this.player, 200, 200), new Mosca(this, this.player, 1100, 200)];
  }
  

  setTileSet() {
    const map = this.make.tilemap({ key: 'Dungeon5C-EO', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.innerVoidLayer = map.createLayer('InnerVoid', tileset).setCollisionByProperty({ collides: true });
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
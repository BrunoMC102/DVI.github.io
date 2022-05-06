import Enemy4 from '../../../enemies/enemy4.js';
import GoblinKing from '../../../enemies/goblinKing.js';
import LevelParent from '../levelParent.js';
import Mosca from '../../../enemies/mosca.js';

export default class LevelTopDown5D_S extends LevelParent {

  constructor(key) {
    super(key, {
      north: false,
      south: true,
      west: false,
      east: false
    });
    this.iden = 'T1';
  }

  createEnemies(){
    return [new GoblinKing(this, this.player, 640, 500), new Enemy4(this, this.player, 200, 200), new Enemy4(this, this.player, 1050, 200), new Mosca(this, this.player, 1050, 800), new Mosca(this, this.player, 200, 800)];
  }
  

  setTileSet() {
    const map = this.make.tilemap({ key: 'Dungeon5D-S', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.innerVoidLayer = map.createLayer('InnerVoid', tileset).setCollisionByProperty({ collides: true });
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
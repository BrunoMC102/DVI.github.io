import Enemy4 from '../../../enemies/enemy4.js';
import GoblinKing from '../../../enemies/goblinKing.js';
import LevelParent from '../levelParent.js';

export default class LevelTopDown5B_O extends LevelParent {

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
    return [new GoblinKing(this, this.player, 640, 500), new Enemy4(this, this.player, 200, 200), new Enemy4(this, this.player, 1050, 200)];
  }
  

  setTileSet() {
    const map = this.make.tilemap({ key: 'Dungeon5B-O', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.innerVoidLayer = map.createLayer('InnerVoid', tileset).setCollisionByProperty({ collides: true });
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
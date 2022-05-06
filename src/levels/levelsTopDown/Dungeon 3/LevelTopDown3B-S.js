import Enemy4 from '../../../enemies/enemy4.js';
import Enemy from '../../../enemies/enemy.js';
import LevelParent from '../levelParent.js';


export default class LevelTopDown3B_S extends LevelParent {

  constructor(key) {
    super(key, {
      north: true,
      south: false,
      west: true,
      east: true
    });
    this.iden = 'T1';
  }

  createEnemies(){
    return [new Enemy4(this, this.player, 1050, 200), new Enemy4(this, this.player, 200, 200), new Enemy(this, this.player, 640, 500)];
  }
  

  setTileSet() {
    const map = this.make.tilemap({ key: 'Dungeon3B-S', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.innerVoidLayer = map.createLayer('InnerVoid', tileset).setCollisionByProperty({ collides: true });
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
import Minotaur from '../../../enemies/minotaur.js';
import Enemy from '../../../enemies/enemy.js';
import LevelParent from '../levelParent.js';


export default class LevelTopDown3C_ES extends LevelParent {

  constructor(key) {
    super(key, {
      north: false,
      south: true,
      west: false,
      east: true
    });
    this.iden = 'T1';
  }

  createEnemies(){
    return [new Minotaur(this, this.player, 1100, 200), new Minotaur(this, this.player, 200, 200), new Enemy(this, this.player, 640, 500)];
  }
  

  setTileSet() {
    const map = this.make.tilemap({ key: 'Dungeon3C-ES', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.innerVoidLayer = map.createLayer('InnerVoid', tileset).setCollisionByProperty({ collides: true });
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
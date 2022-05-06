import Trabuquero from '../../../enemies/trabuquero.js';
import Archer from '../../../enemies/archer.js';
import LevelParent from '../levelParent.js';


export default class LevelTopDown4C_NE extends LevelParent {

  constructor(key) {
    super(key, {
      north: true,
      south: false,
      west: false,
      east: true
    });
    this.iden = 'T1';
  }

  createEnemies(){
    return [new Trabuquero(this, this.player, 500, 200), new Archer(this, this.player, 640, 500)];
  }
  

  setTileSet() {
    const map = this.make.tilemap({ key: 'Dungeon4C-NE', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.innerVoidLayer = map.createLayer('InnerVoid', tileset).setCollisionByProperty({ collides: true });
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
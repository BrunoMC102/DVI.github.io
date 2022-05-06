import Enemy5 from '../../../enemies/enemy5.js';
import Trabuquero from '../../../enemies/trabuquero.js';
import Archer from '../../../enemies/archer.js';
import LevelParent from '../levelParent.js';


export default class LevelTopDown4D_O extends LevelParent {

  constructor(key) {
    super(key, {
      north: false,
      south: false,
      west: true,
      east: false
    });
    this.iden = 'T1';
  }

  createEnemies(){
    return [new Trabuquero(this, this.player, 500, 200), new Archer(this, this.player, 550, 500), new Enemy5(this, this.player, 700, 500)];
  }
  

  setTileSet() {
    const map = this.make.tilemap({ key: 'Dungeon4D-O', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.innerVoidLayer = map.createLayer('InnerVoid', tileset).setCollisionByProperty({ collides: true });
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
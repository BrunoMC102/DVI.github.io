import Mole from '../../../enemies/moleVariante.js';
import Mole2 from '../../../enemies/moleVariante2.js';
import LevelParent from '../levelParent.js';


export default class LevelTopDown1B_N extends LevelParent {

  constructor(key) {
    super(key, {
      north: false,
      south: true,
      west: true,
      east: true
    });
    this.iden = 'T1';
  }

  createEnemies(){
    return [new Mole(this, this.player, 200, 200), new Mole2(this, this.player, 700, 700)];
  }
  

  setTileSet() {
    const map = this.make.tilemap({ key: 'Dungeon1B-N', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
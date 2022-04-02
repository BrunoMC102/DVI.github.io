import EnemyParent from '../../enemies/enemyParent.js';
import PlayerTopDown from '../../player/playerTopDown.js';
import Enemy from '../../enemies/enemy.js';
import Enemy2 from '../../enemies/enemy2.js';
import Enemy3 from '../../enemies/enemy3.js';
import Enemy4 from '../../enemies/enemy4.js';
import Enemy5 from '../../enemies/enemy5.js';
import Spectral from '../../objetos_recogibles/pasivos/spectral.js';
import moleVariante from '../../enemies/moleVariante.js';
import moleVariante2 from '../../enemies/moleVariante2.js';
import LevelParent from './levelParent.js';



export default class LevelTopDown3 extends LevelParent {

  constructor(key) {
    super(key, {
      north: false,
      south: false,
      west: true,
      east: true
    });
    this.iden = 'T3';
  }

 


  createEnemies(){
    return [new Enemy2(this, this.player, 800, 400),new moleVariante(this, this.player, 400, 400)];
  }
  
  setTileSet() {
    const map = this.make.tilemap({ key: 'tilemap3', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    const groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }

}


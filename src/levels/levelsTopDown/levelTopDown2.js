import EnemyParent from '../../enemies/enemyParent.js';
import PlayerTopDown from '../../player/playerTopDown.js';
import Enemy from '../../enemies/enemy.js';
import Enemy2 from '../../enemies/enemy2.js';
import Enemy3 from '../../enemies/enemy3.js';
import Enemy4 from '../../enemies/enemy4.js';
import Enemy5 from '../../enemies/enemy5.js';
import Spectral from '../../objetos_recogibles/pasivos/spectral.js';
import Enemy7 from '../../enemies/enemy7.js';
import EnemyFire from '../../enemies/enemyFire.js';
import Mosca from '../../enemies/mosca.js';
import Inverter from '../../enemies/inverter.js';
import GoblinKing from '../../enemies/goblinKing.js';
import LevelParent from './levelParent.js';



export default class LevelTopDown2 extends LevelParent {

  constructor(key) {
    super(key, {
      north: false,
      south: false,
      west: true,
      east: true
    });
    this.iden = 'T2';
  }

 


  createEnemies(){
    return [new GoblinKing(this, this.player, 600, 500),new Mosca(this, this.player, 800, 200)];
  }
  
  setTileSet() {
    const map = this.make.tilemap({ key: 'tilemap2', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }

}

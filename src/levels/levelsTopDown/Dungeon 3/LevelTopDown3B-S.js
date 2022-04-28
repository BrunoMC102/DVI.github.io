import HealthPotion from '../../../objetos_recogibles/consumibles/healthPotion.js';
import PlayerTopDown from '../../../player/playerTopDown.js';
import PowerUp from '../../../objetos_recogibles/powerUp.js';
import Coin from '../../../objetos_recogibles/consumibles/coin.js';
import Health from '../../../objetos_recogibles/consumibles/health.js';
import Arrow from '../../../objetos_recogibles/consumibles/arrow.js';
import Bouncy from '../../../objetos_recogibles/pasivos/bouncy.js';
import Minotaur from '../../../enemies/minotaur.js';
import Enemy from '../../../enemies/enemy.js';
import Trabuquero from '../../../enemies/trabuquero.js';
import GoblinKing from '../../../enemies/goblinKing.js';
import Mole from '../../../enemies/moleVariante.js';
import Mole2 from '../../../enemies/moleVariante2.js';
import Chest from '../../../objetos_recogibles/chest.js';
import Archer from '../../../enemies/archer.js';
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
    return [new Minotaur(this, this.player, 1100, 200), new Minotaur(this, this.player, 200, 200), new Enemy(this, this.player, 640, 500)];
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
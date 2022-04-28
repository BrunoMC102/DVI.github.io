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


export default class LevelTopDown1A extends LevelParent {

  constructor(key) {
    super(key, {
      north: true,
      south: true,
      west: true,
      east: true
    });
    this.iden = 'T1';
  }

 

  createOthers(){
    new Chest(this, this.player, 450, 300);
    new Coin(this, this.player, 450, 200);
    new HealthPotion(this, this.player, 600, 200);
    new Health(this, this.player, 750, 200);
    new Arrow(this, this.player, 900, 200);
  }

  createEnemies(){
    return [new Mole(this, this.player, 200, 200), new Mole2(this, this.player, 700, 700)];
  }
  

  setTileSet() {
    const map = this.make.tilemap({ key: 'Dungeon1A', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
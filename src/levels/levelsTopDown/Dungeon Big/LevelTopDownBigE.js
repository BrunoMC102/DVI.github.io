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


export default class LevelTopDownBigE extends LevelParent {

  constructor(key) {
    super(key, {
      north: false,
      south: false,
      west: false,
      east: true
    },
    {
      north: { x: 0, y: 0 },
      south: { x: 0, y: 0 },
      east: { x: 1900, y: 760 },
      west: { x: 0, y: 0 }
    });
    this.iden = 'TB';
    this.dimensions = {
      x:1920,
      y:1600
    }
  }

 

  createOthers(){
    new Chest(this, this.player, 450, 300);
    new Coin(this, this.player, 450, 200);
    new HealthPotion(this, this.player, 600, 200);
    new Health(this, this.player, 750, 200);
    new Arrow(this, this.player, 900, 200);
  }

  getPlayerCoordinates(direction) {
    if (direction == 0) return { x: 960, y: 1500 }
    else if (direction == 1) return { x: 150, y: 750 }
    else if (direction == 2) return { x: 960, y: 100 }
    else return { x: 1750, y: 750 }
  }

  setTileSet() {
    const map = this.make.tilemap({ key: 'DungeonBigE', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
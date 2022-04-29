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
import WizardBoss from '../../../enemies/wizardBoss.js';
import GhostBoss from '../../../enemies/ghostBoss.js';


export default class LevelBigNoDoors extends LevelParent {

  constructor(key) {
    super(key, {
      north: true,
      south: false,
      west: false,
      east: false
    },
    {
      north: { x: 960, y: 20 },
      south: { x: 960, y: 1600 },
      east: { x: 1900, y: 760 },
      west: { x: 20, y: 760 }
    });
    this.iden = 'FinalBoss';

    this.dimensions = {
      x:1920,
      y:1600
    }
  }

  getPlayerCoordinates(direction) {
    return { x: 960, y: 1500 }
  }

  createEnemies(){
    return [new GhostBoss(this,this.player,this.dimensions.x,this.dimensions.y,false)];
  }

  create() {
    this.events.on('wake', this.onWake, this);
    
    this.cameras.main.setBackgroundColor(0x454550);
    this.cameras.cameras[0].transparent = false;
    this.getNearLevels();
    this.setTileSet();
    this.actMinimap();

   
    
    this.enemies = this.add.group();
    this.projectiles = this.add.group();
    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.onStart();
    
    this.enemiesCreated = this.createEnemies();
    this.createOthers();
    this.enemiesCreated.forEach(e => this.enemies.add(e));
    this.sceneChange = [];
    this.createDoors();
    this.boxes = [];
    this.closeDoors();
  
    this.dungeonSound = this.sound.add("dungeontheme").play();
  }


  onWake(sys,data){
    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
    if (data.levelList != undefined)
      this.levelList = data.levelList;
    this.direction = data.direction;
    this.coordinates = this.getPlayerCoordinates(this.direction);
    this.player.restart(this.coordinates.x, this.coordinates.y, this.playerData);
    this.cameras.main.setBounds(0, 0, this.dimensions.x, this.dimensions.y);
    this.cameras.main.startFollow(this.player);
    this.onStart();
  }

  setTileSet() {
    const map = this.make.tilemap({ key: 'DungeonBigNoDoors', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.groundLayer = map.createLayer('InnerVoid', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
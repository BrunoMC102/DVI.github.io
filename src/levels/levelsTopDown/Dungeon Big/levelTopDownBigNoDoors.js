import PlayerTopDown from '../../../player/playerTopDown.js';
import GhostBoss from '../../../enemies/ghostBoss.js';
import LevelBigParent from './levelBigParent.js';


export default class LevelBigNoDoors extends LevelBigParent {

  constructor() {
    super('finalBoss', {
      north: false,
      south: false,
      west: false,
      east: false
    })
    this.iden = 'FinalBoss';

    this.dimensions = {
      x:1920,
      y:1600
    }
    this.generated = undefined;
  }

  getPlayerCoordinates(direction) {
    return { x: 800, y: 800 }
  }

  createEnemies(){
    return [new GhostBoss(this,this.player,this.dimensions.x,this.dimensions.y,false)];
  }

  create() {
    
    
    this.cameras.main.setBackgroundColor(0x454550);
    this.cameras.cameras[0].transparent = false;
    this.setTileSet();

   
    
    this.enemies = this.add.group();
    this.projectiles = this.add.group();
    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.onStart();
    
    this.enemiesCreated = this.createEnemies();
    this.createOthers();
    this.enemiesCreated.forEach(e => this.enemies.add(e));
    this.sceneChange = [];


    this.dungeonSound = this.sound.add("bossTheme", {loop: true}).play();
  }



  setTileSet() {
    const map = this.make.tilemap({ key: 'DungeonBigNoDoors', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.innerVoidLayer = map.createLayer('InnerVoid', tileset).setCollisionByProperty({ collides: true });
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }

  onBossDefeated(){
    this.spawnTrophy(this.dimensions.x/2, this.dimensions.y/2);
  }

  onStart(){
      this.cameras.main.startFollow(this.player);
      this.cameras.main.setBounds(0, 0, this.dimensions.x, this.dimensions.y);
  }

  update() {
    
  }

  actMinimap(){}
  initialSwipe(){}
  getNearLevels(){}
  createDoors(){}
  activateDoors(){}
  closeDoors(){}
}
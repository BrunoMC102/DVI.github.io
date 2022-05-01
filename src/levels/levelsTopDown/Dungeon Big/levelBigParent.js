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
import WinTrophy from '../../../objetos_recogibles/pasivos/winTrophy.js';


export default class LevelBigParent extends LevelParent {

  constructor(key, doors) {
    super(key, doors,
    {
      north: { x: 960, y: 20 },
      south: { x: 960, y: 1600 },
      east: { x: 1900, y: 760 },
      west: { x: 20, y: 760 }
    });
    this.iden = 'Boss';

    this.dimensions = {
      x:1920,
      y:1600
    }
  }

  getPlayerCoordinates(direction) {
    if (direction == 0) return { x: 960, y: 1500 }
    else if (direction == 1) return { x: 150, y: 750 }
    else if (direction == 2) return { x: 960, y: 100 }
    else return { x: 1750, y: 750 }
  }

  createEnemies(){
    return [new WizardBoss(this,this.player,this.dimensions.x/2,this.dimensions.y/2, this.dimensions.x,this.dimensions.y)];
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
    this.changingScene = false;
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

  onBossDefeated(){
    if(this.playerData.progressStory >= 3 && this.playerData.keys >= 4){
      this.createPortal();
      this.spawnTrophy(this.dimensions.x/2-250, this.dimensions.y/2);
    }
    else{
      this.spawnTrophy(this.dimensions.x/2, this.dimensions.y/2);
    }
  }

  spawnTrophy(x,y) {
    new WinTrophy(this, this.player, x, y);
  }

  createPortal(){
    const portal = this.add.zone(this.dimensions.x/2 + 250, this.dimensions.y/2, 100, 100);
    this.physics.add.existing(portal, true);
    this.portalSprite = this.add.sprite(this.dimensions.x/2 + 250, this.dimensions.y/2, 100);
    this.portalSprite.play('TeleportGate');
    
    this.physics.add.overlap(portal, this.player, () => {
      if(this.changingScene) return
      this.changingScene = true;
      this.cameras.main.fadeOut();
      this.time.delayedCall(1400, ()=>{
        this.scene.start('finalBoss', { playerData: this.playerData, levelList: this.levelList, powerUpList: this.powerUpList, direction: 0 });
      })})
  }
}
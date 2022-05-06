import PlayerTopDown from '../../../player/playerTopDown.js';
import LevelParent from '../levelParent.js';
import WizardBoss from '../../../enemies/wizardBoss.js';
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

    this.sound.stopAll();
    
    this.laughSound = this.sound.add("laugh2").play();
    this.dungeonSound = this.sound.add("bossTheme", {loop: true}).play();
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
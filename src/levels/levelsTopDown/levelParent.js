import HealthPotion from '../../objetos_recogibles/consumibles/healthPotion.js';
import PlayerTopDown from '../../player/playerTopDown.js';
import PowerUp from '../../objetos_recogibles/powerUp.js';
import Coin from '../../objetos_recogibles/consumibles/coin.js';
import Health from '../../objetos_recogibles/consumibles/health.js';
import Arrow from '../../objetos_recogibles/consumibles/arrow.js';
import Bouncy from '../../objetos_recogibles/pasivos/bouncy.js';
import Minotaur from '../../enemies/minotaur.js';
import Enemy from '../../enemies/enemy.js';
import Trabuquero from '../../enemies/trabuquero.js';
import GoblinKing from '../../enemies/goblinKing.js';
import Mole from '../../enemies/moleVariante.js';
import Mole2 from '../../enemies/moleVariante2.js';
import Chest from '../../objetos_recogibles/chest.js';
import Archer from '../../enemies/archer.js';


export default class LevelParent extends Phaser.Scene {

  constructor(levelKey, doors, doorCoordinates) {
    super({ key: levelKey });
    this.levelkey = levelKey;
    this.changeSceneManager = {
      north: "",
      south: "",
      west: "",
      east: ""
    }
    this.doors = doors;
    this.doorCoordinates = doorCoordinates
    if (doorCoordinates == undefined) {
      this.doorCoordinates = this.getDefaultCoordinates();
    }
    this.doorNumbers = 0;
    if (this.doors.north) this.doorNumbers++;
    if (this.doors.south) this.doorNumbers++;
    if (this.doors.west) this.doorNumbers++;
    if (this.doors.east) this.doorNumbers++;
    
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
  }

  

  create() {
    this.changingScene = false;
    //this.showHitbox(voidLayer);
    //this.showHitbox(wallLayer);

    this.setTileSet();
    this.enemies = this.add.group();
    this.projectiles = this.add.group();
    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y, this.playerData);

    this.cameras.main.fadeIn(800);

    const enemiesCreated = this.createEnemies();
    enemiesCreated.forEach(e => this.enemies.add(e));
    this.sceneChange = []
    if (this.doors.north) {
      this.northdoorGroup = this.add.group();
      this.physics.add.overlap(this.northdoorGroup, this.player, () => {
        if (!this.changingScene) {
          this.cameras.main.fadeOut(800);
          this.changingScene = true;
          this.time.delayedCall(1200, () => {
            this.scene.start(this.changeSceneManager.north, { coordinates: { x: 100, y: 500 }, playerData: this.playerData });
          });
        }
      })
      this.northDoor = this.add.zone(this.doorCoordinates.north.x, this.doorCoordinates.north.y, 130, 60);
      this.physics.add.existing(this.northDoor, true);
      this.sceneChange.push(this.northDoor);
    }

    if (this.doors.south) {
      this.southdoorGroup = this.add.group();
      this.physics.add.overlap(this.southdoorGroup, this.player, () => {
        if (!this.changingScene) {
          this.cameras.main.fadeOut(800);
          this.changingScene = true;
          this.time.delayedCall(1200, () => {
            this.scene.start(this.changeSceneManager.south, { coordinates: { x: 100, y: 500 }, playerData: this.playerData });
          });
        }
      })
      this.southDoor = this.add.zone(this.doorCoordinates.south.x, this.doorCoordinates.south.y, 132, 60);
      this.physics.add.existing(this.southDoor, true);
      this.sceneChange.push(this.southDoor);
    }

    if (this.doors.east) {
      this.eastdoorGroup = this.add.group();
      this.physics.add.overlap(this.eastdoorGroup, this.player, () => {
        if (!this.changingScene) { 
          this.cameras.main.fadeOut(800);
          this.changingScene = true;
          this.time.delayedCall(1200, () => {
            this.scene.start(this.changeSceneManager.east, { coordinates: { x: 120, y: 500 }, playerData: this.playerData });
          });
        }
      })
      this.eastDoor = this.add.zone(this.doorCoordinates.east.x, this.doorCoordinates.east.y, 60, 122)
      this.physics.add.existing(this.eastDoor, true);
      this.sceneChange.push(this.eastDoor);
    }

    if (this.doors.west) {
      this.westdoorGroup = this.add.group();
      this.physics.add.overlap(this.westdoorGroup, this.player, () => {
        if (!this.changingScene) { 
          this.cameras.main.fadeOut(800);
          this.changingScene = true;
          this.time.delayedCall(1200, () => {
            this.scene.start(this.changeSceneManager.west, { coordinates: { x: 1170, y: 500 }, playerData: this.playerData });
          });
        }
      })
      this.westDoor = this.add.zone(this.doorCoordinates.west.x, this.doorCoordinates.west.y, 60, 122)
      this.physics.add.existing(this.westDoor, true);
      this.sceneChange.push(this.westDoor);

      
    }


    this.zoneGroup = this.add.group();
    this.physics.add.collider(this.enemies, this.zoneGroup);
    //this.physics.world.enable(this.sceneChange);

    this.sceneChange.forEach(e => {
      this.zoneGroup.add(e);
    })

    this.activateDoors();

    this.dungeonSound = this.sound.add("dungeontheme").play();

  }

  update() {
    
  }

  finishGame() {
    this.sound.stopAll();
    this.scene.start("end", { coordinates: { x: 100, y: 500 }, playerData: this.playerData });
  }

  showHitbox(layer) {
    const debugGraphics = this.add.graphics().setAlpha(0.7);

    layer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    });
  }

  setTileSet() {
    const map = this.make.tilemap({ key: 'tilemap1', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }

  getDefaultCoordinates() {
    return {
      north: { x: 575, y: 0 },
      south: { x: 573, y: 898 },
      east: { x: 1250, y: 510 },
      west: { x: 30, y: 510 }
    }
  }

  createEnemies(){
    return [];
  }

  createOthers() { }

  activateDoors() {
    if (this.doors.north)
      this.northdoorGroup.add(this.northDoor)

    if (this.doors.south)
      this.southdoorGroup.add(this.southDoor)

    if (this.doors.east)
      this.eastdoorGroup.add(this.eastDoor)

    if (this.doors.west)
      this.westdoorGroup.add(this.westDoor)
  }

}
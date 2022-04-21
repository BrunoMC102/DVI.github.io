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
import Minimap from '../../managers/minimap.js';


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
    this.generated = true;
    this.cleared = false;
    this.open = false;
    this.halfWidth = 600;
    this.halfHeigh = 405;
    this.swipeTime = 120;
    this.dimensions = {
      x: 1280,
      y: 960
    };
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
    if (data.levelList != undefined)
      this.levelList = data.levelList;
    this.direction = data.direction;
  }



  create() {
    this.changingScene = false;
    //this.showHitbox(voidLayer);
    //this.showHitbox(wallLayer);
    this.cameras.main.setBackgroundColor(0x454550);
    this.cameras.cameras[0].transparent = false;
    this.setTileSet();

    this.actMinimap();

    this.initialSwipe();
    this.started = false;

    this.started = true;
    this.enemies = this.add.group();
    this.projectiles = this.add.group();
    this.m = new Minimap(this, 1010, 20, this.levelList, this.grid, this.playerData.minimapUnlock);
    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y, this.playerData);

    this.time.delayedCall(this.swipeTime, () => {
      this.cameras.main.startFollow(this.player);
      this.cameras.main.setBounds(0, 0, this.dimensions.x, this.dimensions.y)
    });


    const enemiesCreated = this.createEnemies();
    this.createOthers();
    enemiesCreated.forEach(e => this.enemies.add(e));
    this.sceneChange = [];
    if (this.doors.north) {
      this.northdoorGroup = this.add.group();
      this.physics.add.overlap(this.northdoorGroup, this.player, () => {
        if (!this.changingScene) {
          this.swipeY(-this.halfHeigh);
          this.changingScene = true;
          this.time.delayedCall(this.swipeTime, () => {
            this.scene.start(this.changeSceneManager.north, { coordinates: { x: 640, y: 830 }, playerData: this.playerData, levelList: this.levelList, powerUpList: this.powerUpList, direction: 0 });
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
          this.swipeY(this.halfHeigh);
          this.changingScene = true;
          this.time.delayedCall(this.swipeTime, () => {
            this.scene.start(this.changeSceneManager.south, { coordinates: { x: 640, y: 70 }, playerData: this.playerData, levelList: this.levelList, powerUpList: this.powerUpList, direction: 2 });
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
          this.swipeX(this.halfWidth);
          this.changingScene = true;
          this.time.delayedCall(this.swipeTime, () => {
            this.scene.start(this.changeSceneManager.east, { coordinates: { x: 120, y: 500 }, playerData: this.playerData, levelList: this.levelList, powerUpList: this.powerUpList, direction: 1 });
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
          this.swipeX(-this.halfWidth);
          this.changingScene = true;
          this.time.delayedCall(this.swipeTime, () => {
            this.scene.start(this.changeSceneManager.west, { coordinates: { x: 1170, y: 500 }, playerData: this.playerData, levelList: this.levelList, powerUpList: this.powerUpList, direction: 3 });
          });
        }
      })
      this.westDoor = this.add.zone(this.doorCoordinates.west.x, this.doorCoordinates.west.y, 60, 122)
      this.physics.add.existing(this.westDoor, true);
      this.sceneChange.push(this.westDoor);


    }


    this.zoneGroup = this.add.group();
    this.physics.add.collider(this.enemies, this.zoneGroup);

    this.sceneChange.forEach(e => {
      this.zoneGroup.add(e);
    })


    this.dungeonSound = this.sound.add("dungeontheme").play();
  }

  update() {
    if (!this.started) return;
    if (!this.cleared) {
      if (this.enemies.getLength() === 0) {
        this.cleared = true;
        let a = this.levelList.find((e) => { return (e.grid.x == this.grid.x && e.grid.y == this.grid.y) });
        a.cleared = true;
      }
    }
    if (!this.open) {
      if (this.cleared) {
        this.activateDoors();
      }
    }
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
    this.innnerVoidLayer = map.createLayer('InnerVoid', tileset).setCollisionByProperty({ collides: true });
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }

  getDefaultCoordinates() {
    return {
      north: { x: 640, y: 0 },
      south: { x: 640, y: 930 },
      east: { x: 1250, y: 510 },
      west: { x: 30, y: 510 }
    }
  }

  createEnemies() {
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



  actMinimap() {
    if (!this.cleared) {
      let a = this.levelList.find((e) => { return (e.grid.x == this.grid.x && e.grid.y == this.grid.y) });
      a.reached = true;
      if (this.doors.north) {
        this.levelList.find((e) => { return (e.grid.x == this.grid.x && e.grid.y == this.grid.y - 1) }).reached = true;
      }
      if (this.doors.south) {
        this.levelList.find((e) => { return (e.grid.x == this.grid.x && e.grid.y == this.grid.y + 1) }).reached = true;
      }
      if (this.doors.east) {
        this.levelList.find((e) => { return (e.grid.x == this.grid.x + 1 && e.grid.y == this.grid.y) }).reached = true;
      }
      if (this.doors.west) {
        this.levelList.find((e) => { return (e.grid.x == this.grid.x - 1 && e.grid.y == this.grid.y) }).reached = true;
      }
    }
  }


  initialSwipe() {
    if (this.direction != undefined) {
      let scroll = this.cameras.cameras[0].scrollX;
      if (this.direction == 0) {
        this.cameras.cameras[0].scrollY += this.halfHeigh;
        this.swipeY(-this.halfHeigh);
      }
      else if (this.direction == 1) {
        this.cameras.cameras[0].scrollX -= this.halfWidth;
        this.swipeX(this.halfWidth);
      }
      else if (this.direction == 2) {
        this.cameras.cameras[0].scrollY -= this.halfHeigh;
        this.swipeY(this.halfHeigh);
      }
      else {
        this.cameras.cameras[0].scrollX += this.halfWidth;
        this.swipeX(-this.halfWidth);
      }
    }
  }

  swipeX(desfase) {
    this.cameras.main.stopFollow();
    this.cameras.main.removeBounds();
    let mainCamera = this.cameras.cameras[0];
    this.tweens.add({
      targets: [mainCamera],
      scrollX: this.cameras.cameras[0].scrollX + desfase,
      duration: this.swipeTime,
      ease: 'Phaser.Math.Easing.Linear',
      repeat: 0,
    })
  }
  swipeY(desfase) {
    this.cameras.main.stopFollow();
    this.cameras.main.removeBounds();
    let mainCamera = this.cameras.cameras[0];
    this.tweens.add({
      targets: [mainCamera],
      scrollY: this.cameras.cameras[0].scrollY + desfase,
      duration: this.swipeTime,
      ease: 'Phaser.Math.Easing.Linear',
      repeat: 0,
    })
  }
}
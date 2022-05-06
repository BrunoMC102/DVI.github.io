import PlayerTopDown from '../../player/playerTopDown.js';
import Minimap from '../../managers/minimap.js';
import Box from '../../decoracion/box.js';


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

    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
    if (data.levelList != undefined)
      this.levelList = data.levelList;
    this.direction = data.direction;
    this.coordinates = this.getPlayerCoordinates(this.direction);
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
    this.m = new Minimap(this, 1010, 20, this.levelList, this.grid, this.playerData.minimapUnlock);
    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.onStart();
    
    this.enemiesCreated = this.createEnemies();
    this.createOthers();
    this.enemiesCreated.forEach(e => this.enemies.add(e));
    this.sceneChange = [];
    this.createDoors();
    this.boxes = [];
    this.closeDoors();
  
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

    
    this.m.restart(this.levelList, this.grid, this.playerData.minimapUnlock);
  }

  onStart(){
    this.changingScene = false;
    this.initialSwipe();
   
    this.time.delayedCall(this.swipeTime, () => {
      this.cameras.main.startFollow(this.player);
      this.cameras.main.setBounds(0, 0, this.dimensions.x, this.dimensions.y);
    });

  }

  changeLevel(levelKey, direction) {
    if(this.changingScene) return;
    this.changingScene = true;
    this.time.delayedCall(this.swipeTime, () => {
      
      this.scene.sleep(this.levelkey);
      this.scene.run(levelKey, { playerData: this.playerData, levelList: this.levelList, powerUpList: this.powerUpList, direction: direction })

    });
  }

  update() {
    if (!this.cleared) {
      if (this.enemies.getLength() === 0) {
        this.cleared = true;
        this.nearLevelsInfo.actual.cleared = true;
      }
    }
    if (!this.open) {
      if (this.cleared) {
        this.activateDoors();
        this.open = true;
      }
    }
  }

  finishGame() {
    this.playerData.die();
    this.sound.stopAll();
    this.scene.start("end", {playerData: this.playerData });
  }
  winGame() {
    const power = this.playerData.win();
    this.sound.stopAll();
    this.scene.start("win", {playerData: this.playerData, powerUpList:this.powerUpList, power:power});
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
      north: { x: 640, y: 20 },
      south: { x: 640, y: 935 },
      east: { x: 1250, y: 510 },
      west: { x: 30, y: 510 }
    }
  }

  createEnemies() {
    return [];
  }

  createOthers() { }


  createDoors(){

    if (this.doors.north) {
      this.northdoorGroup = this.add.group();
      this.physics.add.overlap(this.northdoorGroup, this.player, () => {
        if (!this.changingScene) {
          this.swipeY(-this.halfHeigh);
          this.changeLevel(this.changeSceneManager.north, 0);
        }
      })
      this.northDoor = this.add.zone(this.doorCoordinates.north.x, this.doorCoordinates.north.y, 130, 90);
      this.physics.add.existing(this.northDoor, true);
      this.sceneChange.push(this.northDoor);
    }

    if (this.doors.south) {
      this.southdoorGroup = this.add.group();
      this.physics.add.overlap(this.southdoorGroup, this.player, () => {
        if (!this.changingScene) {
          this.swipeY(this.halfHeigh);
          this.changeLevel(this.changeSceneManager.south, 2);
        }
      })
      this.southDoor = this.add.zone(this.doorCoordinates.south.x, this.doorCoordinates.south.y, 132, 75);
      this.physics.add.existing(this.southDoor, true);
      this.sceneChange.push(this.southDoor);
    }

    if (this.doors.east) {
      this.eastdoorGroup = this.add.group();
      this.physics.add.overlap(this.eastdoorGroup, this.player, () => {
        if (!this.changingScene) {
          this.swipeX(this.halfWidth);
          this.changeLevel(this.changeSceneManager.east, 1);
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
          this.changeLevel(this.changeSceneManager.west, 3);
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

  }


  closeDoors(){
    if (this.doors.north){
      this.northdoorGroup.remove(this.northDoor)
      this.boxes.push(new Box(this,this.doorCoordinates.north.x, this.doorCoordinates.north.y-20, 0));
    }

    if (this.doors.south){
      this.southdoorGroup.remove(this.southDoor)
      this.boxes.push(new Box(this,this.doorCoordinates.south.x, this.doorCoordinates.south.y+10, 2));
    }

    if (this.doors.east){
      this.eastdoorGroup.remove(this.eastDoor)
      this.boxes.push(new Box(this,this.doorCoordinates.east.x+14, this.doorCoordinates.east.y-20, 1));
    }

    if (this.doors.west){
      this.westdoorGroup.remove(this.westDoor)
      this.boxes.push(new Box(this,this.doorCoordinates.west.x-20, this.doorCoordinates.west.y-1, 3));
    }
    this.zoneCollider = this.physics.add.collider(this.player, this.zoneGroup);
    this.open = false;
    this.cleared = false;
    if(this.m != undefined) this.m.setVisibility(false);
  }

  activateDoors() {
    if (this.doors.north)
      this.northdoorGroup.add(this.northDoor)

    if (this.doors.south)
      this.southdoorGroup.add(this.southDoor)

    if (this.doors.east)
      this.eastdoorGroup.add(this.eastDoor)

    if (this.doors.west)
      this.westdoorGroup.add(this.westDoor)

    this.boxes.forEach(e=>e.break());
    if(this.zoneCollider != undefined){
      this.physics.world.removeCollider(this.zoneCollider);
    }
    if(this.m != undefined) this.m.setVisibility(true);
  }



  actMinimap() {
    if (!this.cleared) {
      this.nearLevelsInfo.actual.reached = true;
      if (this.doors.north) {
        this.nearLevelsInfo.north.reached = true;
      }
      if (this.doors.south) {
        this.nearLevelsInfo.south.reached = true;
      }
      if (this.doors.east) {
        this.nearLevelsInfo.east.reached = true;
      }
      if (this.doors.west) {
        this.nearLevelsInfo.west.reached = true;
      }
    }
  }

  getPlayerCoordinates(direction) {
    if (direction == 0) return { x: 640, y: 830 }
    else if (direction == 1) return { x: 120, y: 500 }
    else if (direction == 2) return { x: 640, y: 100 }
    else return { x: 1170, y: 500 }
  }

  getNearLevels() {
    this.nearLevelsInfo = {
      actual: this.levelList.find((e) => { return (e.grid.x == this.grid.x && e.grid.y == this.grid.y) }),
      north: this.levelList.find((e) => { return (e.grid.x == this.grid.x && e.grid.y == this.grid.y - 1) }),
      south: this.levelList.find((e) => { return (e.grid.x == this.grid.x && e.grid.y == this.grid.y + 1) }),
      east: this.levelList.find((e) => { return (e.grid.x == this.grid.x + 1 && e.grid.y == this.grid.y) }),
      west: this.levelList.find((e) => { return (e.grid.x == this.grid.x - 1 && e.grid.y == this.grid.y) })
    }
  }

  initialSwipe() {
    if (this.direction != undefined) {
      this.cameras.main.stopFollow();
      this.cameras.main.removeBounds();
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
      else if(this.direction == 3){
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
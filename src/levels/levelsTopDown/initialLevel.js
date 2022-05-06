import LevelParent from "./levelParent.js";


export default class InitialLevel extends LevelParent {
    constructor() {
        super('initialLevel', {
            north: true,
            south: true,
            west: true,
            east: true
        });
       
    }

    createEnemies() {
        return [];
    }

    createOthers() {
        this.dungeonSound = this.sound.add("dungeontheme",{loop: true}).play();
    }

    init(data) {
        super.init(data);
        const m = this.scene.manager.getScenes(false);
        const mapInfo = m.filter(s => { return (s.generated != undefined) })
        if (this.levelList == undefined)
            this.levelList = mapInfo.map(e => { return { grid: e.grid, doors: e.doors, iden: e.iden, reached: false, cleared: false } });
    }

    setTileSet() {
        const map = this.make.tilemap({ key: 'Dungeon1A', tileWidth: 64, tileHeight: 64 });
        const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
        this.groundLayer = map.createLayer('Ground', tileset);
        this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
        this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });

    }

    

    createScrollDoors() {
        this.sceneScrollChange = [this.add.zone(220, 60, 60, 20), this.add.zone(419, 60, 60, 20), this.add.zone(860, 60, 60, 20), this.add.zone(1055, 60, 60, 20)];
        this.sceneScrollChange.forEach((o1) => {
            this.physics.add.existing(o1, true);
        })

        this.physics.add.overlap(this.player, this.sceneScrollChange[0], () => {
            this.changeLevel('Scroll1', 0);
        });
        this.physics.add.overlap(this.player, this.sceneScrollChange[1], () => {
            this.changeLevel('Scroll2', 0);
        });
        this.physics.add.overlap(this.player, this.sceneScrollChange[2], () => {
            this.changeLevel('Scroll3', 0);
        })
        this.physics.add.overlap(this.player, this.sceneScrollChange[3], () => {
            this.changeLevel('Scroll4', 0);
        })
    }


    getPlayerCoordinates(direction) {
        if (direction == 0) return { x: 640, y: 830 }
        else if (direction == 1) return { x: 120, y: 500 }
        else if (direction == 2) return { x: 640, y: 100 }
        else if (direction == 3) return { x: 1170, y: 500 }
        else if (direction == 4) return {x: 220, y:130};
        else if (direction == 5) return {x:420, y:130}
        else if (direction == 6) return {x:860, y:130}
        else if (direction == 7) return {x:1060, y:130}
        else return {x:this.dimensions.x/2, y:this.dimensions.y/2};
      }

    createDoors() {
        super.createDoors();
        this.createScrollDoors();
    }


    update(t, dt) {
        super.update(t, dt);
    }
}
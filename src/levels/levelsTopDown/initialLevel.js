import GhostBoss from "../../enemies/ghostBoss.js";
import Minotaur from "../../enemies/minotaur.js";
import WizardBoss from "../../enemies/wizardBoss.js";
import Minimap from "../../managers/minimap.js";
import Enemy from "../../enemies/inverter.js";
import LevelParent from "./levelParent.js";
import wizardProjectile from "../../proyectile/wizardProjectile.js";
import GhostArrow from "../../proyectile/ghostArrow.js";
import Chest from "../../objetos_recogibles/chest.js";
import Enemy4 from "../../enemies/enemy4.js";
import Enemy5 from "../../enemies/enemy5.js";
import Enemy7 from "../../enemies/enemy7.js";
import PlayerData from "../../player/playerData.js";
import GhostArrow_2 from "../../proyectile/ghostArrow_2.js";


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
        this.pr = new GhostArrow_2(this, 600, 500, 0, 0, 100, 0, 1);
        new Chest(this, this.player, 1100, 200);
        new Chest(this, this.player, 1100, 800);
        new Chest(this, this.player, 720, 490);
        new Chest(this, this.player, 760, 490);
        new Chest(this, this.player, 800, 490);
        new Chest(this, this.player, 480, 490);
        new Chest(this, this.player, 440, 490);
        new Chest(this, this.player, 400, 490);
        new Chest(this, this.player, 360, 490);
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
        this.pr.rotation += dt / 200;

    }
}
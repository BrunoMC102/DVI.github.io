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


export default class InitialLevel extends LevelParent {
    constructor(){
        super('initialLevel',{
            north:true,
            south:true,
            west:true,
            east:true
        });
    }

    createEnemies(){

        return [];

    }

    createOthers(){
        this.pr = new GhostArrow(this,600,500,0,0,100,0,1);
        new Chest(this,this.player, 200, 200);
        new Chest(this,this.player, 200, 800);
        new Chest(this,this.player, 1100, 200);
        new Chest(this,this.player, 1100, 800);
        new Chest(this,this.player, 720, 490);
        new Chest(this,this.player, 760, 490);
        new Chest(this,this.player, 800, 490);
        new Chest(this,this.player, 480, 490);
        new Chest(this,this.player, 440, 490);
        new Chest(this,this.player, 400, 490);
        new Chest(this,this.player, 360, 490);

    }
   
    init(data){
        super.init(data);
        const m = this.scene.manager.getScenes(false);
        const mapInfo = m.filter(s => {return (s.generated != undefined)})
        if(this.levelList == undefined)
            this.levelList = mapInfo.map(e => {return {grid:e.grid, doors: e.doors, iden: e.iden, reached: false, cleared:false}});
    }

    setTileSet() {
        const map = this.make.tilemap({ key: 'Dungeon1A', tileWidth: 64, tileHeight: 64 });
        const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
        this.groundLayer = map.createLayer('Ground', tileset);
        this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
        this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
    }

    update(t,dt){
        super.update(t,dt);
        this.pr.rotation += dt/200; 
    }
}
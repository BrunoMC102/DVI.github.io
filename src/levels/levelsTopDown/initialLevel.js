import Minotaur from "../../enemies/minotaur.js";
import WizardBoss from "../../enemies/wizardBoss.js";
import Minimap from "../../managers/minimap.js";
import LevelParent from "./levelParent.js";


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
        return [new WizardBoss(this, this.player, 500, 500)];
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
}
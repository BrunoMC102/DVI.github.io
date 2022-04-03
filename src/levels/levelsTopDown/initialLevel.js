import Minotaur from "../../enemies/minotaur.js";
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
    create(){
        super.create();
        let m = new Minimap(this, 800, 500, this.levels);
        
    }
    setLevels(par){
        this.levels = par;
    }
    setTileSet() {
        const map = this.make.tilemap({ key: 'tilemap1-4_Doors', tileWidth: 64, tileHeight: 64 });
        const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
        this.groundLayer = map.createLayer('Ground', tileset);
        this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
        this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
      }
}
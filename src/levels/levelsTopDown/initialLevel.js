import Minotaur from "../../enemies/minotaur.js";
import Minimap from "../../managers/minimap.js";
import LevelParent from "./levelParent.js";


export default class InitialLevel extends LevelParent {
    constructor(){
        super('initialLevel',{
            north:false,
            south:false,
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
}
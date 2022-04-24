
import ChestLevelParent from "./chestLevelParent.js";



export default class ChestRoomE extends ChestLevelParent {
    constructor(key, isReal){
        super(key,{
            north:false,
            south:false,
            west:false,
            east:true
        }, isReal);
    }
    
    setTileSet() {
        const map = this.make.tilemap({ key: 'Dungeon1A', tileWidth: 64, tileHeight: 64 });
        const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
        this.groundLayer = map.createLayer('Ground', tileset);
        this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
        this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
    }

    
    
}
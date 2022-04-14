import Chest from "../../objetos_recogibles/chest.js";
import LevelParent from "./levelParent.js";
import MimicChest from "../../enemies/mimicChest.js";


export default class ChestRoomW extends LevelParent {
    constructor(key, isReal){
        super(key,{
            north:false,
            south:false,
            west:true,
            east:false
        });
        this.iden = 'Chest';
        this.isReal = isReal;
    }
    createOthers(){
        if(this.isReal)
            return [new Chest(this,this.player, 640, 490)];
    }
    createEnemies(){
        if(!this.isReal)
            return [new MimicChest(this, this.player, 640, 490)];
        return []
    }
    setTileSet() {
        const map = this.make.tilemap({ key: 'Dungeon1A', tileWidth: 64, tileHeight: 64 });
        const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
        this.groundLayer = map.createLayer('Ground', tileset);
        this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
        this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
      }
}
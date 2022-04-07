import Chest from "../../objetos_recogibles/chest.js";
import LevelParent from "./levelParent.js";


export default class ChestRoomN extends LevelParent {
    constructor(key){
        super(key,{
            north:true,
            south:false,
            west:false,
            east:false
        });
        this.iden = 'Chest';
    }
    createOthers(){
        new Chest(this, this.player, 450, 300);
        return [new Chest(this,this.player, 600, 400)];
    }
    setTileSet() {
        const map = this.make.tilemap({ key: 'tilemap1-4_Doors', tileWidth: 64, tileHeight: 64 });
        const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
        this.groundLayer = map.createLayer('Ground', tileset);
        this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
        this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
      }
}
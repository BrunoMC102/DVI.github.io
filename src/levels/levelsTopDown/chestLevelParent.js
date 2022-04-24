import MimicChest from "../../enemies/mimicChest.js";
import Chest from "../../objetos_recogibles/chest.js";
import LevelParent from "./levelParent.js";


export default class ChestLevelParent extends LevelParent {
    constructor(key, doors, isReal){
        super(key,doors);
        this.iden = 'Chest';
        this.isReal = isReal;
        this.active = false;
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

    create() {
        super.create();
        this.open = false;
    }

    update() {
        if(!this.isReal){
            if(!this.active){
                this.enemiesCreated.forEach(e => {if(e.active) this.active = true})
                if(this.active){
                    this.closeDoors();
                }
            }
        }
        
        if (!this.cleared) {
          if (this.enemies.getLength() === 0 || !this.active) {
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
}
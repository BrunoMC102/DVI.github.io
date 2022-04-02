import Minotaur from "../../enemies/minotaur.js";
import LevelParent from "./levelParent.js";

export default class LevelPrueba1 extends LevelParent {
    constructor(key){
        super(key, {
            north:false,
            south:false,
            west:true,
            east:true
        });
        this.iden = 'P1';
    }
    createEnemies(){
        return [new Minotaur(this, this.player, 500, 500)];
    }
}
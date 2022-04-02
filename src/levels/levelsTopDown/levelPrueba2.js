import Enemy from "../../enemies/enemy.js";
import Minotaur from "../../enemies/minotaur.js";
import LevelParent from "./levelParent.js";


export default class LevelPrueba2 extends LevelParent {
    constructor(key){
        super(key, {
            north:false,
            south:false,
            west:true,
            east:true
        });
        this.iden = 'P2';
    }
    createEnemies(){
        return [new Enemy(this, this.player, 500, 500)];
    }
}
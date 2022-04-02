import Minotaur from "../../enemies/minotaur.js";
import LevelParent from "./levelParent.js";


export default class LevelEnd2 extends LevelParent {
    constructor(key){
        super(key,{
            north:false,
            south:false,
            west:true,
            east:false
        });
        this.iden = 'E3';
    }
   
}
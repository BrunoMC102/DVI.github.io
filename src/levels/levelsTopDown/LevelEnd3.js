import Minotaur from "../../enemies/minotaur.js";
import LevelParent from "./levelParent.js";


export default class LevelEnd3 extends LevelParent {
    constructor(key){
        super(key,{
            north:false,
            south:false,
            west:false,
            east:true
        });
        this.iden = 'E4';
    }
   
}
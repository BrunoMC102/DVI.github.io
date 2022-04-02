import Minotaur from "../../enemies/minotaur.js";
import LevelParent from "./levelParent.js";


export default class LevelEnd extends LevelParent {
    constructor(key){
        super(key,{
            north:true,
            south:false,
            west:false,
            east:false
        });
        this.iden = 'E1';
    }
   
}
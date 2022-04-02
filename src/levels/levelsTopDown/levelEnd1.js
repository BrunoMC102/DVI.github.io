import Minotaur from "../../enemies/minotaur.js";
import LevelParent from "./levelParent.js";
import HorizontalLevelParent from "./levelParent.js";

export default class LevelEnd1 extends LevelParent {
    constructor(key){
        super(key,{
            north:false,
            south:true,
            west:false,
            east:false
        });
        this.iden = 'E2';
    }
}
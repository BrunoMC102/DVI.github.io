import Pasivo from "./pasivo.js";

export default class Key extends Pasivo{

    constructor(scene,player,x,y,image,keyString, number){
        super(scene,player,x,y,image);
        this.title = keyString;
        this.number = number
    }
    
    givePower(){
        super.givePower();
        this.player.progressObject(this.number);
    }
}
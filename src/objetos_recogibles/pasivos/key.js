import Pasivo from "./pasivo.js";

export default class Key extends Pasivo{

    constructor(scene,player,x,y,image,keyString){
        super(scene,player,x,y,image);
        this.title = keyString;
    }
    
    givePower(){
        super.givePower();
        this.player.progressObject();
    }
}
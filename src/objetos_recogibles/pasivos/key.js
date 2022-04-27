import Pasivo from "./pasivo.js";

export default class Key extends Pasivo{

    constructor(scene,player,x,y,image){
        super(scene,player,x,y,image);
        this.title = 'Secret Key 1';
    }
    
    givePower(){
        super.givePower();
    }
}
import Pasivo from "./pasivo.js";

export default class ProgressObject extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'flecha');
        this.title = 'Health Up';
    }
    
    givePower(){
        super.givePower();
        this.player.progressObject();
    }
}
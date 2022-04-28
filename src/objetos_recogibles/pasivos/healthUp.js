import Pasivo from "./pasivo.js";

export default class HealthUp extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'HealthUp');
        this.title = 'Ring of the Sages';
    }
    
    givePower(){
        super.givePower();
        this.player.healthUp();
    }
}
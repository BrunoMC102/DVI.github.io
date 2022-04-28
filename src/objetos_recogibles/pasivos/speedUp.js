import Pasivo from "./pasivo.js";

export default class SpeedUp extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'SpeedUp');
        this.title = 'Lightweight Badge';
    }
    
    givePower(){
        super.givePower();
        this.player.speedUp(200);
    }
}
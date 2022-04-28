import Pasivo from "./pasivo.js";

export default class DashCoolDownUp extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'DashCoolDown');
        this.title = 'Buffoon hat';
    }
    
    givePower(){
        super.givePower();
        this.player.dashCoolDownUp(0.5);
    }
}
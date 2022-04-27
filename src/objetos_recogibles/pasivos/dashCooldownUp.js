import Pasivo from "./pasivo.js";

export default class DashCoolDownUp extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'flecha');
        this.title = 'Dash Cooldown reduced';
    }
    
    givePower(){
        super.givePower();
        this.player.dashCoolDownUp(0.5);
    }
}
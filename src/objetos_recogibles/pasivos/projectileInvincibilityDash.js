import Pasivo from "./pasivo.js";

export default class ProjectileInvincibilityDash extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'flecha');
        this.title = 'Spectral Dash';
    }
    
    givePower(){
        super.givePower()
        this.player.playerData.dashInvincibilityPower = true;
    }
}
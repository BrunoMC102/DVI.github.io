import Pasivo from "./pasivo.js";

export default class ProjectileInvincibilityDash extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'Invincibility');
        this.title = 'Cloak of Agility';
    }
    
    givePower(){
        super.givePower()
        this.player.playerData.dashInvincibilityPower = true;
    }
}
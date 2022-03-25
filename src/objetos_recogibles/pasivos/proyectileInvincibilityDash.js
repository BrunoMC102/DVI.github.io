import Pasivo from "./pasivo.js";

export default class Bouncy extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'flecha');
    }
    
    givePower(){
        givePower.super()
        this.player.playerData.dashInvincibilityPower = true;
    }
}
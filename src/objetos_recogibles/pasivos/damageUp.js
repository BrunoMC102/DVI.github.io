import Pasivo from "./pasivo.js";

export default class DamageUp extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'DamageUp');
        this.title = 'Demonic Totem';
    }
    
    givePower(){
        super.givePower();
        this.player.damageUp(5);
    }
}
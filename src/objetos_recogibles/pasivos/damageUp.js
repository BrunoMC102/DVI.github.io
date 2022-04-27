import Pasivo from "./pasivo.js";

export default class DamageUp extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'flecha');
        this.title = 'Damage Up';
    }
    
    givePower(){
        super.givePower();
        this.player.damageUp(5);
    }
}
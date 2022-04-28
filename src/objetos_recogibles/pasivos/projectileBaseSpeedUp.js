import Pasivo from "./pasivo.js";

export default class ProjectileBaseSpeedUp extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'ProjectileSpeed');
        this.title = 'Gloves of Power';
    }
    
    givePower(){
        super.givePower();
        this.player.projectileBaseSpeedUp(100);
    }
}
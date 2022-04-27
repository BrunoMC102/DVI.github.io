import Pasivo from "./pasivo.js";

export default class ProjectileBaseSpeedUp extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'flecha');
        this.title = 'Projectile BaseSpeed Up';
    }
    
    givePower(){
        super.givePower();
        this.player.projectileBaseSpeedUp(100);
    }
}
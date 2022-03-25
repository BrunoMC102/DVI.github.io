import PowerUp from "../powerUp.js";
import Pasivo from "./pasivo.js";

export default class Bouncy extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'flecha');
        this.title = 'Bouncy Projectiles';
    }
    
    givePower(){
        super.givePower();
        this.player.setBouncy();
    }
}
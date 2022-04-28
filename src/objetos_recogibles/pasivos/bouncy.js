
import Pasivo from "./pasivo.js";

export default class Bouncy extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'BouncyArrows');
        this.title = 'Crimson Mirror';
    }
    
    givePower(){
        super.givePower();
        this.player.setBouncy();
    }
}
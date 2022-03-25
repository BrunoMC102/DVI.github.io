import Pasivo from "./pasivo.js";

export default class Bouncy extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'flecha');
    }
    
    givePower(){
        super.givePower();
        this.player.playerData.projectileEffects.push((enemy) => {
            if(Math.random() < 0.25) 
            enemy.freeze()});
    }
}
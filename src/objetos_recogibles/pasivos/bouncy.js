import PowerUp from "../powerUp.js";

export default class Bouncy extends PowerUp{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'flecha');
    }
    
    givePower(){
        this.player.setBouncy();
    }
}
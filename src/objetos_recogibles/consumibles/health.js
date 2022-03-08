import PowerUp from "../powerUp.js";

export default class Health extends PowerUp{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'');
    }
    
    givePower(){
        this.player.health++;
    }
}
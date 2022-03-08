import PowerUp from "../powerUp.js";

export default class Health extends PowerUp{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'vida');
    }
    
    givePower(){
        this.player.health++;
    }
}
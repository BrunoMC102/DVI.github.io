import PowerUp from "../powerUp.js";

export default class Health extends PowerUp{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'vida');
    }
    
    givePower(){
        if(this.player.playerData.health < this.player.playerData.maxhealth) // Comentar lo de los black hearts o shield heart
        this.player.playerData.health++;
    }
}
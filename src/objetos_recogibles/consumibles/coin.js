import PowerUp from "../powerUp.js";

export default class Coin extends PowerUp{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'monedas');
    }
    
    givePower(){
        this.player.playerData.money++;
    }
   
}
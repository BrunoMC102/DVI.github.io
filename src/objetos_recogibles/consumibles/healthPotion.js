import PowerUp from "../powerUp.js";

export default class HealthPotion extends PowerUp{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'pocionVida');
    }

    givePower(){
        this.player.playerData.healthPotions++;
    }
   
}
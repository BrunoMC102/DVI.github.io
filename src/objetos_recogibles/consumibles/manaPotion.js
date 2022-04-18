import PowerUp from "../powerUp.js";


export default class ManaPotion extends PowerUp{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'pocionMana');
    }

    givePower(){
        this.player.playerData.manaPotions++;
    }
   

}
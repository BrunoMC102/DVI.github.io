import PowerUp from "../powerUp.js";


export default class ManaPotion extends PowerUp{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'pocionMana');
        
        this.takePotionAudio = this.scene.sound.add("takePotion");
    }

    givePower(){
        this.takePotionAudio.play()
        this.player.playerData.manaPotions++;
    }
   

}
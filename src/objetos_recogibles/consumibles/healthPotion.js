import PowerUp from "../powerUp.js";

export default class HealthPotion extends PowerUp{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'pocionVida');
        this.takePotionAudio = this.scene.sound.add("takePotion");
    }

    givePower(){
        this.takePotionAudio.play()
        this.player.playerData.healthPotions++;

    }
   
}
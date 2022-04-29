import PowerUp from "../powerUp.js";

export default class Coin extends PowerUp{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'monedas');
        this.takeCoinsAudio = this.scene.sound.add("takeCoins");
    }
    
    givePower(){
        
        this.takeCoinsAudio.play()
        this.player.playerData.money++;
    }
   
}
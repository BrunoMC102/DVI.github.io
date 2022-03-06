import PowerUp from "../powerUp.js";

export default class Spectral extends PowerUp{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'');
    }
    
    givePower(){
        this.player.setSpectral();
    }
}
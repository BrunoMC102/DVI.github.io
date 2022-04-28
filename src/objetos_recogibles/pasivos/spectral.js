import PowerUp from "../powerUp.js";
import Pasivo from "./pasivo.js";

export default class Spectral extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'SpectralArrows');
        this.title = 'Necklace of the Skies';
    }
    
    givePower(){
        super.givePower();
        this.player.setSpectral();
    }
}
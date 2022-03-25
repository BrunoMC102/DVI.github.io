import PowerUp from "../powerUp.js";
import Pasivo from "./pasivo.js";

export default class Spectral extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'flecha');
    }
    
    givePower(){
        super.givePower();
        this.player.setSpectral();
    }
}
import Pasivo from "./pasivo.js";

export default class WinTrophy extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'flecha');
        this.title = 'Win Trophy';
    }
    
    givePower(){
        super.givePower();
        this.scene.win();
    }
}
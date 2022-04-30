import Pasivo from "./pasivo.js";

export default class WinTrophy extends Pasivo{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'Crown');
        this.title = 'Ending Crown';
    }
    
    givePower(){
        super.givePower();
        this.player.win();
    }
}
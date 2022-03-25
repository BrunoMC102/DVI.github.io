import PowerUp from "../powerUp.js";

export default class Pasivo extends PowerUp{

    constructor(scene,player,x,y,texture){
        super(scene,player,x,y,texture);
        this.texture = texture;
        this.scene.tweens.add({
            targets: [this],
            y:this.y-20,
            duration: 800,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            delay: 0
        })
        this.title = 'PowerUp'
        
    }
    
    givePower(){
        this.player.givePasivoPowerUp(this.texture, this.title)
    }
    
}
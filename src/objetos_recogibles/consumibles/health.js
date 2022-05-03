import PowerUp from "../powerUp.js";

export default class Health extends PowerUp{

    constructor(scene,player,x,y){
        super(scene,player,x,y,'vida');
        this.getHealthAudio = this.scene.sound.add("getHealth");
        this.body.useDamping = true;
    }
    
    givePower(){
        this.getHealthAudio.play();
        this.player.playerData.health++;
    }
    createCollider(){
        this.scene.physics.add.collider(this, this.player, () => {
            if(this.player.playerData.health < this.player.playerData.maxhealth){ // Comentar lo de los black hearts o shield heart
            this.givePower();
            this.destroy()
            }else this.body.setDrag(0.0001);
        });
    }
}
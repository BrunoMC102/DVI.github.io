export default class HealthPotion extends Phaser.GameObjects.Image{

    constructor(scene,player,x,y){
        super(scene,x,y,'pocionVida');
        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);
        this.body.allowGravity = false;
        this.scene.physics.add.collider(this, this.player, () => {this.givePotion();this.destroy()});
        
    }

    givePotion(){
        this.player.playerData.healthPotions++;
    }
}
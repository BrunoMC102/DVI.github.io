export default class HealthPotion extends Phaser.GameObjects.Image{

    constructor(scene,player,x,y){
        super(scene,x,y,'');
        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);
        this.body.allowGravity = false;
        this.scene.physics.add.collider(this, this.player, () => {this.givePotion();this.destroy()});
        this.healthValue = 10;
    }

    givePotion(){
        this.player.healthPotions++;
    }

    usePotion(){
        this.player.healthPotions--;
        this.player.health += this.healthValue;
    }
}
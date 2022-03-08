export default class ManaPotion extends Phaser.GameObjects.Image{

    constructor(scene,player,x,y){
        super(scene,x,y,'');
        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);
        this.body.allowGravity = false;
        this.scene.physics.add.collider(this, this.player, () => {this.givePotion();this.destroy()});
        this.manaValue = 10;
    }

    givePotion(){
        this.player.manaPotions++;
    }

    usePotion(){
        this.player.manaPotions--;
        this.player.mana+= this.manaValue;
    }
}
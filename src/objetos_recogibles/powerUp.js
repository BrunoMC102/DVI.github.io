export default class PowerUp extends Phaser.GameObjects.Image{

    constructor(scene,player,x,y,texture){
        super(scene,x,y,texture);
        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);
        this.body.allowGravity = false;
        this.scene.physics.add.collider(this, this.player, () => {this.givePower();this.destroy()});
        
    }

    givePower(){
        this.player.projectileBaseSpeed *= 10;
        this.player.projectileMaxSpeed *= 10;
        this.player.projectileSpeed = this.player.projectileBaseSpeed;
    }
}
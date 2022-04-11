export default class FireBall extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y, damage){
        super(scene,x,y,'');
        
        this.rotation = -Math.PI/2;
        
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.body.setAllowGravity(false);
        this.scene.physics.add.overlap(this, this.scene.player, ()=>{
            this.scene.player.hurt(damage);
        })
        
    }

    preUpdate(t,dt){
        super.preUpdate(t,dt);
        this.play('fireBallAnimation', true);
    }
}
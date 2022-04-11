export default class FireBall extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y, damage){
        super(scene,0,0,'');
        this.rotation = Math.PI/2;
        this.targetX = x;
        this.targetY = y;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.scene.physics.add.overlap(this, this.scene.player, ()=>{
            this.scene.player.hurt(damage);
        })
        this.play('fireBallAnimation');
        this.body.setVelocity(x/6, y/6);
    }

    preUpdate(t,dt){
        super.preUpdate(t,dt);
        if(Math.abs(this.x) >= Math.abs(this.targetX) && Math.abs(this.y) >= Math.abs(this.targetY)){
            this.body.setVelocity(0,0);
        }
    }
}
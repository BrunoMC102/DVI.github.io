export default class PlayerPlatform extends Phaser.GameObjects.Image{
    constructor(scene,x,y, direction, player){
        super(scene,x,y,'boxImg');
        //this.setScale(1/3);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        const initialVelocity = new Phaser.Math.Vector2(0,-1);
        const speed = 500;
        initialVelocity.rotate(Math.PI/4*direction).scale(speed);
        this.body.setVelocity(initialVelocity.x, initialVelocity.y);
        this.lifeTime = 10;
        //this.scene.time.delayedCall(this.lifeTime*1000, ()=>{if(this != undefined) this.destroy()});
        this.scene.physics.add.collider(this, this.scene.player);
        this.scene.physics.add.collider(this, this.scene.wallLayer, ()=>{
            if(this.body.onFloor()){
                this.stop()
                player.boxCreated = false;
            }
                
        });
    }

    stop(){
        this.body.setVelocity(0,0);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }
}
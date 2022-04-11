export default class Meteor extends Phaser.GameObjects.Sprite{
    constructor(scene,x, targetY, velocity, damage,scale){
        super(scene,x,-10);
        this.targetY = targetY;
        this.velocity = velocity;
        this.damage = damage;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false; 
        this.body.setVelocity(0, velocity);
        this.shadow = this.scene.add.image(x,targetY, 'shadow');
        this.scene.physics.add.existing(this.shadow, true);
        this.playerColl = this.scene.add.group();
        this.scale = scale*1.5;
        this.shadow.setSize(this.shadow.width*scale, this.shadow.height*scale);
        this.shadow.setScale(scale, scale);
        this.shadow.getCenter(this.shadow.body.center);
        this.setDepth(targetY);
        this.shadow.depth = 0;
        this.scene.physics.add.overlap(this.playerColl, this.scene.player, (o1,o2)=>{
            o2.hurt(this.damage);
        })
        this.alcanzado = false;
        this.rotation = Math.PI/2;
        
        this.play('meteorAnimation');
    }

    preUpdate(t,dt){
        super.preUpdate(t,dt);

        if(this.alcanzado) return;
        if(this.y >= this.targetY-40){
            this.alcanzado = true;
            this.playerColl.add(this.shadow);
            this.play('boltDie');
            this.scale = this.scale*2;
            this.body.setVelocity(0,0);
            this.scene.time.delayedCall(400, ()=>{
                this.explode();
            })
        }
    }

    explode(){
        this.shadow.destroy();
        this.destroy();
    }

}
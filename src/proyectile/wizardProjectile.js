import Basic_projectile from "./basic_projectile.js";

export default class wizardProjectile extends Basic_projectile{
    constructor(scene,x,y,vx,vy,time,damage, type, velocity){
        super(scene,x,y,'',vx,vy,time,damage);
        this.cont = 4000;
        
        this.velocity = velocity;
        if(type == 0){
            this.play('boltFire');
            this.tint = 0xff0000;
            this.flipX = true;
        }
        if(type == 1){
            this.cont = -2000;
            this.play('magicBallAnimation');
            this.doEffect = this.doHoming;
            
        }
        
    }


    preUpdate(t,dt){
        this.doEffect(t,dt);
        super.preUpdate(t,dt);
    }

    doHoming(t,dt){
        if(this.cont < 0){
            this.cont+= dt;
            if(this.cont >= 0){
               this.cont = 2000;
            }
            return;
        }
        if (this.cont >= 2500) {
            this.playerVector = new Phaser.Math.Vector2(this.scene.player.x - this.x, this.scene.player.y - this.y).normalize().scale(this.velocity);
            this.cont = 0;
        }
        else if (this.cont < 2000){
            this.cont+=dt;
            this.body.setVelocity(this.playerVector.x,this.playerVector.y);
        }
        else{
            this.body.setVelocity(0,0);
            this.cont+= dt
        }
    }
    doEffect(t,dt){}

}
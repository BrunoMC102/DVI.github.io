import Basic_projectile from "./basic_projectile.js";

export default class wizardProjectile extends Basic_projectile{
    constructor(scene,x,y,vx,vy,time,damage, type, velocity){
        super(scene,x,y,'flecha',vx,vy,time,damage);
        this.cont = 4000;
        this.setOrigin(1,1);
        this.doEffect = (t,dt) => {};
        this.velocity = velocity;
        if(type == 0){
            this.play('boltFire');
            this.tint = 0xff0000;
            this.flipX = true;
            this.body.setSize(20,20);
            this.body.setOffset(25,15);
        }
        else if(type == 1){
            this.cont = -2000;
            this.play('magicBallAnimation');
            this.doEffect = this.doHoming;
            this.body.setSize(35,35);
            this.body.setOffset(35,35);
            
            
        }
        else if(type == 2){
            this.cont = -2500;
            this.play('magicBallAnimation');
            this.doEffect = this.doHomingOnce;
            this.body.setSize(35,35);
            this.body.setOffset(35,35);
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
    

    doHomingOnce(t,dt){
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
            this.body.setVelocity(this.playerVector.x*2,this.playerVector.y*2);
            this.doEffect = ()=>{};
        }
        else{
            this.body.setVelocity(0,0);
            this.cont+= dt
        }
    }

}
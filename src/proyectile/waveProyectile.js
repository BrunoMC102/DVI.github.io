import Basic_projectile from "./basic_projectile.js";

export default class WaveProjectile extends Basic_projectile{

    constructor(scene,x,y,vx,vy,time,damage){
        super(scene,x,y,'flecha',vx,vy,time,damage);
        this.directionVector = new Phaser.Math.Vector2(vx,vy);
        this.rotateTime = 500;
        this.cont = this.rotateTime/2;
        this.sentido = 1;
    }


    preUpdate(t,dt){
        this.body.setVelocity(this.directionVector.x,this.directionVector.y);
        this.directionVector.rotate(Math.PI/3*dt* this.sentido/this.rotateTime);
        if(this.cont >= this.rotateTime){
            this.cont = 0;
            this.sentido = -this.sentido;
        }
        this.cont+= dt;
        super.preUpdate(t,dt);
    }

}
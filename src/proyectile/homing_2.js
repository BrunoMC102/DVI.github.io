import Basic_projectile from "./basic_projectile.js";

export default class Homing_2 extends Basic_projectile{
    constructor(scene,x,y,vx,vy,time,damage){
        super(scene,x,y,'flecha',vx,vy,time,damage);
        this.cont = 4000;
    }


    preUpdate(t,dt){
        
        if (this.cont >= 2500) {
            this.x_h = this.scene.player.x - this.x;
            this.y_h = this.scene.player.y - this.y;
            this.z_h = Math.abs(this.x_h)+Math.abs(this.y_h);
            this.cont = 0;
        }
        else if (this.cont < 2000){
            this.cont+=dt;
            this.body.setVelocity(this.x_h/this.z_h*300,this.y_h/this.z_h*300);
        }
        else{
            this.body.setVelocity(0,0);
            this.cont+= dt
        }
        super.preUpdate(t,dt);
    }

}
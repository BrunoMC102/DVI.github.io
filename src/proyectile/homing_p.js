import Basic_projectile from "./basic_projectile.js";


export default class Homing_p extends Basic_projectile{

    constructor(scene,x,y,vx,vy,time,damage){
        super(scene,x,y,'flecha',vx,vy,time,damage);
        this.body.setMaxSpeed(300);
    }


    preUpdate(t,dt){
        this.scene.physics.accelerateToObject(this,this.scene.player, 300);
        super.preUpdate(t,dt);
    }

}
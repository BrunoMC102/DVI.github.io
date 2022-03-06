import Basic_projectile from "./basic_projectile.js";


export default class Homing_p extends Basic_projectile{

    constructor(scene,x,y){
        super(scene,x,y,'flecha');
        this.body.setMaxSpeed(300);
    }


    preUpdate(t,dt){
       
        this.scene.physics.accelerateToObject(this,this.scene.player, 300);
        super.preUpdate(t,dt);
    }

}
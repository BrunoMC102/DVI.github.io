import Basic_projectile from "./basic_projectile.js";


export default class GhostArrow extends Basic_projectile{

    constructor(scene,x,y,vx,vy,time,damage){
        super(scene,x,y,'flecha',vx,vy,time,damage);
        this.play("ghostArrow");
    }


    

}
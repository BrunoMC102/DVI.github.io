import Homing_p from "./homing_p.js";

export default class GhostArrow_2 extends Homing_p{
    constructor(scene,x,y,vx,vy,time,damage){
        super(scene,x,y,vx,vy,time,damage);
        this.play("ghostArrow_2");
    }
}

import Basic_projectile from "./basic_projectile.js";


export default class PlayerProyectile extends Basic_projectile{

    constructor(scene,x,y,vx,vy){
        super(scene,x,y,'flecha',vx,vy);
        this.body.setBounce(1,1);
    }
}
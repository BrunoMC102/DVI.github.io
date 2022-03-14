import Basic_projectile from "../proyectile/basic_projectile.js";


export default class Mana extends Basic_projectile{

    constructor(scene,x,y,vx,vy){
        super(scene,x,y,'mana',vx,vy);
        this.body.setCollideWorldBounds(false);
        this.body.onWorldBounds = false;
        this.body.setMaxSpeed(500);
        this.scene.physics.add.overlap(this, this.scene.player,(o1,o2)=>{o1.destroy(); o2.playerData.mana++});
        this.a = 1000;
        this.body.setMaxSpeed(800);
        this.setScale(0.5,0.5);
    }


    preUpdate(t,dt){
        let dx = this.scene.player.x - this.x;
        let dy = this.scene.player.y - this.y;
        let f = Math.abs(dx)+Math.abs(dy);
        let x = -this.body.velocity.x/500;
        let y = -this.body.velocity.y/500;
        this.body.setAcceleration(dx*this.a/f+x*this.a,dy*this.a/f+y*this.a);    
        super.preUpdate(t,dt);
    }

}
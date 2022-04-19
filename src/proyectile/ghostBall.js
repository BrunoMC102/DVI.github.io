
import Basic_projectile from "./basic_projectile.js";
import GhostArrow from "./ghostArrow.js";


export default class GhostBall extends Basic_projectile{

    constructor(scene,x,y,vx,vy,time,damage){
        super(scene,x,y,'flecha',vx,vy,time,damage);
        
        this.play("ghostBall");
        this.body.setBounce(1,1);
        this.dispTime = 800;
        this.cont = 0;
        this.velocity = 400;
        this.deadCenter = new Phaser.Math.Vector2(this.body.center.x,this.body.center.y);
    }

    preUpdate(d,dt){
        super.preUpdate(d,dt);
        if(this.cont >= this.dispTime){
            const direction = new Phaser.Math.Vector2(0,1);
            direction.rotate(Math.random()*Math.PI*2);
            for(let i = 0; i < 2; i++){
                direction.rotate(Math.PI);
                const disparo = new GhostArrow(this.scene, this.centerX(), this.centerY(), direction.x * this.velocity, direction.y * this.velocity, this.time, 1);
                this.addColliders(disparo);
            }
            this.cont = 0;
        }
        this.cont += dt;
    }

    dest(){
        const direction = new Phaser.Math.Vector2(1,0);
        for (let i = 0; i < 8; i++) {
            const disparo = new GhostArrow(this.scene, this.centerX(), this.centerY(), direction.x * this.velocity, direction.y * this.velocity, this.time, 1);
            this.addColliders(disparo);
            direction.rotate(2*Math.PI/8);
        }
        this.deadCenter.x = this.centerX();
        this.deadCenter.y = this.centerY();
        this.preUpdate = _=>{}
        this.destroy();
    }
    

    addColliders(disparo){
        this.scene.physics.add.collider(disparo, this.scene.wallLayer, (o1,o2) => {
            o1.destroy();
        });
        this.scene.projectiles.add(disparo);
    }

    centerX(){
        if (this.body != undefined)
          return this.body.center.x;
        return this.deadCenter.x;
      }
      centerY(){
        if(this.body != undefined)
          return this.body.center.y;
        return this.deadCenter.y;
      }
}
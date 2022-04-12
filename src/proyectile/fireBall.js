export default class FireBall extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y, damage){
        super(scene,0,0,'');
        this.rotation = Math.PI/2;
        this.targetX = x;
        this.targetY = y;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.scene.physics.add.overlap(this, this.scene.player, ()=>{
            this.scene.player.hurt(damage);
        })
        this.play('fireBallAnimation');
        this.body.setVelocity(x/6, y/6);
        this.target = new Phaser.Math.Vector2(this.targetX, this.targetY);
        this.direction = this.target.clone();
        this.direction.normalize();
        this.alcanzado = false;
        this.ida = false;
        this.vuelta = false;
        this.finish = false;
    }

    preUpdate(t,dt){
        super.preUpdate(t,dt);
        if(this.alcanzado) return;
        if(Math.abs(this.x) >= Math.abs(this.targetX) && Math.abs(this.y) >= Math.abs(this.targetY)){
            this.body.setVelocity(0,0);
            this.alcanzado = true;
        }
    }

    moveLocation(velocity){
        const position = new Phaser.Math.Vector2(this.x, this.y);
        if(!this.ida){
            this.body.setVelocity(this.direction.x*velocity, this.direction.y*velocity);
            if(this.target.distance(position) >= 250){
                this.ida = true;
            }
        }
        else if(!this.vuelta){
            this.body.setVelocity(-this.direction.x*velocity, -this.direction.y*velocity);
            if(this.target.distance(position) >= 100 && position.distance(new Phaser.Math.Vector2(0,0)) < this.target.distance(new Phaser.Math.Vector2(0,0))){
                this.vuelta = true;
            }
        }
        else if(!this.finish){
            this.body.setVelocity(this.direction.x*velocity, this.direction.y*velocity);
            if(position.distance(new Phaser.Math.Vector2(0,0)) >= this.target.distance(new Phaser.Math.Vector2(0,0))){
                this.finish = true;
            }
        }
        else{
            this.body.setVelocity(0,0);
        }
    }
    finishMoving(){
        this.ida = false;
        this.vuelta = false;
        this.finish = false;
    }
}
import FireEnemy from "../enemies/fireEnemy.js";

export default class fireEnemySpawn extends Phaser.GameObjects.Sprite{
    constructor(scene,x, y , targetY, initialX, initialY, aceleration, damage,scale){
        super(scene,x,y);
        this.targetY = targetY;
        this.aceleration = aceleration;
        this.damage = damage;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false; 
        this.body.setVelocity(initialX, initialY);
        this.body.setAcceleration(0, aceleration);
        this.time = 30;
        this.scale = scale;
        
        
        this.rotation = Math.PI/2;
        
        this.play('fireBallAnimation');
        
    }

    preUpdate(t,dt){
        super.preUpdate(t,dt);

        if(this.alcanzado) return;
        if(this.body.velocity.y <= 10) return;
        if(this.y >= this.targetY){
            this.alcanzado = true;
            this.scene.enemies.add(new FireEnemy(this.scene,this.scene.player, this.x, this.y));
            this.destroy();
        }
    }
   

    

}
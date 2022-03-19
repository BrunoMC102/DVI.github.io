export default class Basic_projectile extends Phaser.GameObjects.Image{

    constructor(scene,x,y,texture,vx,vy, time){
        super(scene,x,y,texture);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);
        this.body.allowGravity = false;
        this.setVisible(true);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.world.on('worldbounds', (o1) => {
          o1.gameObject.destroy();
        });
        if(time == undefined)
            this.time_left = 10;
        
        const dimension = Math.min(this.body.width,this.body.height);
        this.body.setSize(dimension,dimension);
        this.body.setVelocity(vx,vy);
    }


    preUpdate(t,dt){ //Llamar despues en clases hijos

        if(this.body.velocity.length() != 0){
            this.setRotation(this.body.velocity.angle());
        }
        if(this.time_left <= 0) this.destroy();
        this.time_left -= dt/1000;
    }

    dest(){
        this.destroy();
    }

}
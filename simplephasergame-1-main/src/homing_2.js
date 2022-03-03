export default class Homing_2 extends Phaser.GameObjects.Image{

    constructor(scene,x,y){
        super(scene,x,y,'flecha');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);
        this.body.allowGravity = false;
        this.setVisible(true);
        this.cont = 15000;
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.world.on('worldbounds', (o1) => {
          o1.gameObject.destroy();
        });
    }


    preUpdate(t,dt){
        
       

        if (this.cont >= 7000) {
            this.x_h = this.scene.player.x - this.x;
            this.y_h = this.scene.player.y - this.y;
            this.z_h = Math.abs(this.x_h)+Math.abs(this.y_h);
            this.cont = 0;
        }
        else if (this.cont < 5000){
            this.cont+=dt;
            this.body.setVelocity(this.x_h/this.z_h*500,this.y_h/this.z_h*500);
        }
        else
            this.body.setVelocity(0,0);
            this.cont+= dt
    }

}
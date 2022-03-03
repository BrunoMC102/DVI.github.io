

export default class Homing_p extends Phaser.GameObjects.Image{

    constructor(scene,x,y){
        super(scene,x,y,'flecha');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);
        this.body.allowGravity = false;
        this.setVisible(true);
        
        this.body.onWorldBounds = true;
        this.body.world.on('worldbounds', (o1) => {
          this.destroy();
        });
    }


    preUpdate(t,dt){
        
        this.scene.physics.moveToObject(this,this.scene.player, 100);
    }

}
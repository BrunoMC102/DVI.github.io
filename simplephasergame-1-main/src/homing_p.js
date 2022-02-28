

export default class Homing_p extends Phaser.GameObjects.Image{

    constructor(scene,x,y,texture){
        super(scene,x,y,texture);
    }


    preUpdate(t,dt){
        this.scene.physics.moveToObject(this,this.scene.player, 1000);
    }

}
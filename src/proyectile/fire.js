export default class Fire extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y, time){
        super(scene,x,y,"flecha");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);
        this.body.allowGravity = false;
        this.setVisible(true);
        
        this.time_left = time;
        
        /*const dimension = Math.min(this.body.width,this.body.height);
        this.body.setSize(dimension,dimension);*/
        
    }


    preUpdate(t,dt){ //Llamar despues en clases hijos

        if(this.time_left <= 0) this.destroy();
        this.time_left -= dt/1000;
    }

    dest(){
        this.destroy();
    }

}
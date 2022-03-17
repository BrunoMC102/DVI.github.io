import Sword from "./sword.js";

export default class SwordContainer extends Phaser.GameObjects.Container{

    constructor(scene,x,y,player){
        super(scene,x,y);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, false);
        this.body.allowGravity = false;
        this.setVisible(true);
        this.interiorContainer = new Phaser.GameObjects.Container(scene, 10, 0);
        this.add(this.interiorContainer);
        this.sprite = new Sword(scene, 50, 0, player);
        this.interiorContainer.add(this.sprite);
        this.interiorContainer.rotation = -Math.PI/2;
        this.noAttackrotation = this.interiorContainer.rotation;
        this.player = player;
        this.espera = false;
    }


    preUpdate(t,dt){ //Llamar despues en clases hijos
        let v = this.player.body.velocity;
        if(v.x != 0 || v.y != 0){
        
            let posEsp = new Phaser.Math.Vector2(this.player.body.velocity.x,this.player.body.velocity.y);
            let ang = posEsp.angle();
            this.rotation = ang;
        }
        if (!this.attacking) return;
        this.interiorContainer.rotation += dt/(13*3);  
    }

    
    attack(){
        if(this.espera) return;
        this.attacking = true;
        this.espera = true;
        this.scene.time.delayedCall(150, ()=> {this.attacking = false; this.interiorContainer.rotation = this.noAttackrotation})
        this.scene.time.delayedCall(600, ()=> {this.espera = false})
    }

}
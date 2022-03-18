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
        this.sword = new Sword(scene, 50, 0, player);
        this.interiorContainer.add(this.sword);
        this.interiorContainer.rotation = -Math.PI/2;
        this.noAttackrotation = this.interiorContainer.rotation;
        this.swordNoAttackRotation = -Math.PI/2;
        this.sword.rotation = -Math.PI/2;
        this.player = player;
        this.espera = false;
        this.timeAttack = 200;
        this.AttackSpeed = 300;
        this.positioning = false;
    }


    preUpdate(t,dt){ //Llamar despues en clases hijos

        if (!this.attacking){
            let v = this.player.body.velocity;
            if(v.x != 0 || v.y != 0){
                let posEsp = new Phaser.Math.Vector2(this.player.body.velocity.x,this.player.body.velocity.y);
                let ang = posEsp.angle();
                this.rotation = ang;
            }
        }
        else {

            if(this.positioning) this.interiorContainer.rotation -= dt*Math.PI/this.timeAttack;  
            else this.interiorContainer.rotation += dt*Math.PI/this.timeAttack;  

            if(this.fase == 0 || this.fase == 2)
                if(this.positioning) this.sword.rotation -= dt*2*3/this.timeAttack;
                else this.sword.rotation += dt*2*3/this.timeAttack;
        }
    }

    
    attack(){
        if(this.espera) return;
        this.attacking = true;
        this.espera = true;
        this.fase = 0;
        this.scene.time.delayedCall(this.timeAttack/4, ()=>{this.fase = 1});
        this.scene.time.delayedCall(this.timeAttack*3/4, ()=>{this.fase = 2});
        this.scene.time.delayedCall(this.timeAttack, ()=> {
            this.positioning = !this.positioning
            if(this.positioning){ 
                this.noAttackrotation = Math.PI/2;
                this.swordNoAttackRotation = Math.PI/2;
            }
            else{
                this.noAttackrotation = -Math.PI/2;
                this.swordNoAttackRotation = -Math.PI/2;
            }

            this.attacking = false; 
            this.interiorContainer.rotation = this.noAttackrotation; 
            this.sword.rotation = this.swordNoAttackRotation; 
            this.fase = -1; 
            
        })
        this.scene.time.delayedCall(this.AttackSpeed, ()=> {this.espera = false})
    }

}
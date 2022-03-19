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
        this.sword = new Sword(scene, 40, 0, player);
        this.interiorContainer.add(this.sword);
        this.interiorContainer.rotation = -Math.PI/2-0.7;
        this.noAttackrotation = this.interiorContainer.rotation;
        this.swordNoAttackRotation = -Math.PI/2-0.7;
        this.sword.rotation = -Math.PI/2-0.7;
        this.player = player;
        this.espera = false;
        this.timeAttack = 300;
        this.AttackSpeed = 350;
        this.positioning = false;
        this.rotacion = Math.PI + 1.4;
    }


    preUpdate(t,dt){ //Llamar despues en clases hijos

        if (!this.attacking){
            let posEsp = this.player.controls.swordAngle();
            if(posEsp.x != 0 || posEsp.y != 0){
                let ang = posEsp.angle();
                this.rotation = ang;
            }
        }
        else {
            if(this.fase == 0){
                if(this.positioning) this.interiorContainer.rotation -= dt*this.rotacion*5*0.2/this.timeAttack;  
                else this.interiorContainer.rotation += dt*this.rotacion*2.5*0.05/this.timeAttack;  
            }
            else if(this.fase == 1){
                if(this.positioning) this.interiorContainer.rotation -= dt*this.rotacion*5*0.5/this.timeAttack;  
                else this.interiorContainer.rotation += dt*this.rotacion*5*0.6/this.timeAttack; 
            }
            else{
                if(this.positioning) this.interiorContainer.rotation -= dt*this.rotacion*(5/3)*0.3/this.timeAttack;  
                else this.interiorContainer.rotation += dt*this.rotacion*2.5*0.25/this.timeAttack; 
            }

            if(this.fase == 0 || this.fase == 2)
                if(this.positioning) this.sword.rotation -= dt*(5/4)*(Math.PI+1.4)/this.timeAttack;
                else this.sword.rotation += dt*(5/4)*(Math.PI+1.4)/this.timeAttack;
        }
    }

    
    attack(){
        if(this.espera) return;
        this.attacking = true;
        this.sword.activateHitbox();
        this.espera = true;
        this.fase = 0;
        this.scene.time.delayedCall(this.timeAttack*1/5, ()=>{this.fase = 1});
        this.scene.time.delayedCall(this.timeAttack*2/5, ()=>{this.fase = 2});
        this.scene.time.delayedCall(this.timeAttack, ()=> {
            this.positioning = !this.positioning
            if(this.positioning){ 
                this.noAttackrotation = Math.PI/2+0.7;
                this.swordNoAttackRotation = Math.PI/2+0.7;
            }
            else{
                this.noAttackrotation = -Math.PI/2-0.7;
                this.swordNoAttackRotation = -Math.PI/2-0.7;
            }

            this.attacking = false; 
            this.interiorContainer.rotation = this.noAttackrotation; 
            this.sword.rotation = this.swordNoAttackRotation; 
            this.fase = -1; 
            this.sword.removeHitbox();
        })
        this.scene.time.delayedCall(this.AttackSpeed, ()=> {this.espera = false})
    }

}
import Sword from "./sword.js";

export default class SwordContainer extends Phaser.GameObjects.Container{

    constructor(scene,x,y,player){
        super(scene,x,y);
        this.scene.add.existing(this);
       
        this.setVisible(false);
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


    preUpdate(t,dt){ 

        if (!this.attacking){
            let posEsp = this.player.controls.swordAngle();
            if(posEsp.x != 0 || posEsp.y != 0){
                let ang = posEsp.angle();
                this.rotation = ang;
            }
        }
        else {
            let rotationInteriorContainer = 0;
            let rotationSword = 0;
            let index = this.positioning*2-1; //-1 si false, 1 si true, nos ahorramos 3 ifs, gran mejora del rendimiento, 100% rentable. 100% real no fake

            if(this.fase == 0){
                rotationInteriorContainer = -index * this.rotationPercent(0.2, dt, this.rotacion, this.timeAttack/5)// 20% moviminento total
                rotationSword = -index * this.rotationPercent(0.25, dt, this.rotacion, this.timeAttack/5);
            }
            else if(this.fase == 1){
                rotationInteriorContainer = -index * this.rotationPercent(0.5, dt, this.rotacion, this.timeAttack/5) // 50% moviminento total
            }
            else{
                rotationInteriorContainer = -index * this.rotationPercent(0.3, dt, this.rotacion, this.timeAttack*3/5) //30% movimiento total
                rotationSword = -index * this.rotationPercent(0.75, dt, this.rotacion, this.timeAttack*3/5);
            }
            this.interiorContainer.rotation += rotationInteriorContainer;
            this.sword.rotation += rotationSword; 
        }
    }


    rotationPercent(percent, time, totalRotation, totalTime){
        return time*percent*totalRotation/totalTime;
    }
    
    attack(){
        if(this.espera) return;
        this.attacking = true;
        this.player.swordAudio.play();
        this.sword.activateHitbox();
        this.espera = true;
        this.fase = 0;
        this.scene.time.delayedCall(this.timeAttack*1/5, ()=>{this.fase = 1});
        this.scene.time.delayedCall(this.timeAttack*2/5, ()=>{this.fase = 2});
        this.scene.time.delayedCall(this.timeAttack, ()=> {
            this.positioning = !this.positioning
            
            //Posicion de la espada pasa al otro lado
            this.noAttackrotation = -this.noAttackrotation;
            this.swordNoAttackRotation = -this.swordNoAttackRotation;
            this.interiorContainer.rotation = this.noAttackrotation; 
            this.sword.rotation = this.swordNoAttackRotation; 


            this.attacking = false; 
            this.fase = -1; 
            this.sword.removeHitbox();
        })
        this.scene.time.delayedCall(this.AttackSpeed, ()=> {this.espera = false})
    }

}
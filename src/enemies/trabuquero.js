import ShootingEnemyParent from "./shootingEnemyParent.js";
import Basic_projectile from "../proyectile/basic_projectile.js";

export default class Trabuquero extends ShootingEnemyParent {


    constructor(scene, player, x, y) {
        super(scene, player, x, y, '');
        this.Pv = 400;
        this.fireDirection = new Phaser.Math.Vector2(1, 0);
        this.dispMax = 7;  //Numero de proyectiles disparado cada ataque
        this.dispCont = this.dispMax;
        this.dispTime = 0.1;  //Tiempo entre proyectiles de un mismo ataque
        this.actDispTime = 0;
        this.nVueltas = 0.15;  //Numero de vueltas que dan los proyectles en un ataque (puede ser menor a 1)
        this.shootTime = 6; //Tiempo entre ataques
        this.shootTime += this.dispMax * this.dispTime; //Suma el tiempo que dura un ataque al tiempo entre ataques
        this.attacking = false;
        this.attackingPreparing = false;
        this.cont = 1;
        this.charging = false;
    }
    /*creador(){
      this.projectileE = new Homing_p(this.scene,this.x,this.y);
      
    }*/


    creador() {
        return new Basic_projectile(this.scene, this.centerX(), this.centerY(), 'flecha', this.fireDirection.x * this.Pv, this.fireDirection.y * this.Pv, 10, this.projectileDamage);
    }

    attack(d, dt) {

        if (this.cont === 0) {
            this.knockback(-(this.player.x - this.centerX()), -(this.player.y - this.centerY()), 400);
            this.attack_aux = this.normalAttack 
            this.dispCont = 0;
            this.attacking = true;
        }
        this.cont += dt;
        this.actDispTime += dt;


        if(this.cont >= (this.shootTime - 2) * 1000)
            this.charging = true;

        if (this.cont >= (this.shootTime - 0.3) * 1000) {
            this.attackingPreparing = true;
            this.charging = false;
        }

        if (this.cont >= this.shootTime * 1000) {
            this.cont = 0;
        }
        if (this.actDispTime >= this.dispTime * 1000) {
            this.attack_aux();
            this.dispCont++;
            this.actDispTime = 0;
        }
        if (this.dispCont >= this.dispMax) {
            this.attack_aux = () => { };
            if (this.attacking) {
                this.attacking = false;
                this.scene.time.delayedCall(500, () => { this.attackingPreparing = false; })
            }

        }
        if (this.attackingPreparing) {
            this.sprite.play('minotaurSpinAttack', true);
        }
    }

    attack_aux() {
        this.normalAttack
    }

    
    moveU() {
        
        if (!this.attackingPreparing && !this.charging) {
            this.sprite.play('minotaurWalk', true);
            this.scene.physics.moveToObject(this, this.player, 50);
        }
        if(this.charging){
            this.body.setVelocity(0,0);
        }
    }
    normalAttack() {
        this.fireDirection.x = this.player.x - this.centerX();
        this.fireDirection.y = this.player.y - this.centerY();
        this.fireDirection.normalize();

        this.fireDirection.rotate((Math.random() * 2 - 1) * 2 * Math.PI * this.nVueltas / 2);
        this.fire();
    }
}
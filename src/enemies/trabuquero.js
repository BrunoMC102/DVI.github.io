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
        this.sprite.scale = 3;
        this.body.offset.x = -15;
        this.body.setSize(this.body.width * 1.3, this.body.height * 1.6);
        this.dispOffset = 0;
    }
   


    creador() {
        return new Basic_projectile(this.scene, this.centerX() + this.dispOffset, this.centerY(), 'flecha', this.fireDirection.x * this.Pv, this.fireDirection.y * this.Pv, 10, this.projectileDamage);
    }

    attack(d, dt) {

        if (this.cont === 0) {
            
            this.attack_aux = this.normalAttack 
            this.dispCont = 0;
            this.attacking = true;
        }
        this.cont += dt;
        this.actDispTime += dt;


        if(this.cont >= (this.shootTime - 2) * 1000)
            this.charging = true;

        if (this.cont >= (this.shootTime - 0.005) * 1000) {
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
            this.attack_aux = () => {};
            if (this.attacking) {
                this.attacking = false;
                this.scene.time.delayedCall(100, () => { this.attackingPreparing = false; })
            }

        }
        if (this.attackingPreparing) {
            this.sprite.play('bot_fire', true);
        }
        
            
    }

    attack_aux() {
        this.normalAttack
    }

    
    moveU() {
        
        if (!this.attackingPreparing && !this.charging) {
            this.sprite.play('walking_bot', true);
            this.scene.physics.moveToObject(this, this.player, 50);
        }
        if(this.charging){
            this.sprite.play('bot_charging', true);
            this.body.setVelocity(0,0);
        }

        let dirx = this.player.x-this.x
        if (dirx < 0) {
            this.dispOffset = -50;
            this.sprite.flipX = true;
        } else {
            this.dispOffset = 50;
            this.sprite.flipX = false;
        }
    }
    normalAttack() {
        this.fireDirection.x = this.player.x - this.centerX();
        this.fireDirection.y = this.player.y - this.centerY();
        this.fireDirection.normalize();

        this.fireDirection.rotate((Math.random() * 2 - 1) * 2 * Math.PI * this.nVueltas / 2);
        this.knockback(-this.fireDirection.x, -this.fireDirection.y, 200);
        this.fire();
    }
    die(){
        this.sprite.play('bot_death');
        this.deadCenter.x = this.centerX();
        this.deadCenter.y = this.centerY();
        this.body.destroy();
        this.preUpdate = ()=>{};
        this.scene.time.delayedCall(1500, () => {
          this.spawnMana();
          this.spawnLoot();
          this.destroy();
        })
      }
}
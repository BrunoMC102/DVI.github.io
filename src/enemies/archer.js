import ShootingEnemyParent from './shootingEnemyParent.js';
import Basic_projectile from '../proyectile/basic_projectile.js';

/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Archer extends ShootingEnemyParent {

    constructor(scene, player, x, y) {
        super(scene, player, x, y, '');
        this.Pv = 300;
        this.fireDirection = new Phaser.Math.Vector2(0, 1);
        this.arrows = 5;
        this.circun = 0.2;
        this.shootTime = 3;
        this.charging = false;
        this.cont = 1;
        this.dashing = false;
        this.dashDelay = false;
        this.escaping = false;
        this.preCharging = false;
        this.v = 250;
        //this.scale = 2;
        this.changeEscapeVector();
        this.changemoveVector();
        this.body.offset.x = -8;
        this.body.offset.y = 54;
        this.body.setSize(this.body.width * 1.4, this.body.height * 1.7);
        this.dispOffset = 0;
        this.atrapadoVector = new Phaser.Math.Vector2(this.x, this.y);
        this.atrapado = false;
        this.atrapadoCont = 0;
        this.escapingcont = 0;
    }



    preUpdate(d,dt){
        if(this.freezing) return;
    
        if(this.knockbackinfo.knocking){
          this.attack(dt);
          if(this.preCharging || this.charging) return;
          this.checkatrapado(dt);
          return;
        }
    
        this.moveU(dt);
        this.attack(dt);
      }

    creador() {
        return new Basic_projectile(this.scene, this.centerX() + this.dispOffset, this.centerY(), 'flecha', this.fireDirection.x * this.Pv, this.fireDirection.y * this.Pv, 10, this.projectileDamage);
    }


    attack(dt) {
        if (!this.atrapado) {
            if (!this.dashing) {
                if (!this.escaping) {
                    if (this.cont === 0) {
                        this.fire();
                    }
                    this.cont += dt;
                    if (this.cont >= (this.shootTime - 1) * 1000) {
                        this.preCharging = true;
                    }
                    if (this.cont >= (this.shootTime - 0.35) * 1000) {
                        this.preCharging = false;
                        this.charging = true;
                    }
                    if (this.cont >= this.shootTime * 1000) {
                        this.cont = 0;
                        this.scene.time.delayedCall(500, () => { this.charging = false; })
                    }
                }
            }
        }
    }


    moveU(dt) {
        let xdir = this.player.x - this.centerX();
        if (xdir > 0) {
            this.sprite.flipX = false;
            this.dispOffset = 50;
        }
        else {
            this.sprite.flipX = true;
            this.dispOffset = -50;
        }
        if (this.preCharging) {
            this.sprite.stop();
            this.body.setVelocity(0, 0);
            return;
        }
        if (this.charging) {
            this.sprite.play('archerfire', true);
            this.body.setVelocity(0, 0);
        }
        else {
            const dx = new Phaser.Math.Vector2(this.player.x - this.centerX(), this.player.y - this.centerY());
            if(!this.atrapado){
                if (dx.length() < 200) {
                    if (!this.dashDelay) {
                        this.dashing = true;
                        this.dashDelay = true;
                        this.scene.time.delayedCall(500, () => {
                            this.dashing = false;
                            this.changeEscapeVector();
                            this.changemoveVector();
                        })
                        this.scene.time.delayedCall(4000, () => {
                            this.dashDelay = false;
                        })
                        return;
                    }
                }
            }
            if (dx.length() < 350) {
                if (!this.escaping) {
                    this.changeEscapeVector();
                    this.escaping = true;
                }

            }
            else if(dx.length() > 400){
                if (this.escaping) {
                    this.changemoveVector();
                    this.escaping = false
                    this.cont = 1;
                }
            }

            if(this.atrapado){
                this.sprite.play('archeridle', true);
                this.body.setVelocity(0,0);
                this.sprite.tint = 0x00ff00;
            }
            else{
                if (this.dashing) {
                    this.body.setVelocity(this.escapeVector.x * 2, this.escapeVector.y * 2);
                    this.sprite.play('archerjump', true);
                }
                else if (this.escaping) {
                    this.body.setVelocity(this.escapeVector.x, this.escapeVector.y);
                    this.sprite.play('archerMove', true);
                    this.escapingcont += dt;
                    if(this.escapingcont >= 1000){
                        this.changeEscapeVector();
                        this.escapingcont = 0;
                    }
                }
                else {
                    this.body.setVelocity(this.moveVector.x / 2, this.moveVector.y / 2);
                    this.sprite.play('archerMove', true);
                }
            }
            this.checkatrapado(dt);
        }
    }



    hurt(damage){
        if(this.atrapado) return;
        super.hurt(damage);
    }
    knockback(x,y,p){
        if(this.atrapado) return;
        super.knockback(x,y,p);
    }

    freeze(){
        if(this.atrapado) return;
        super.freeze();
    }

    die() {
        this.sprite.play('archerDie');
        this.deadCenter.x = this.centerX();
        this.deadCenter.y = this.centerY();
        this.body.destroy();
        this.preUpdate = () => { };
        if (this.cambio != undefined)
            this.cambio.remove();
        if (this.escambio != undefined)
            this.escambio.remove();
            
        this.scene.time.delayedCall(1500, () => {
            this.spawnMana();
            this.spawnLoot();
            this.destroy();
        })
    }


    checkatrapado(dt) {

        if (this.atrapado) {
            if (!this.escaping){
                this.atrapado = false;
                this.sprite.tint = this.origTint;
                this.atrapadoCont = 0;
                this.cont = (this.shootTime - 1.5) * 1000;
            }
        }
        this.actVector = new Phaser.Math.Vector2(this.x, this.y);
        if (this.actVector.distance(this.atrapadoVector) < 20) {
            this.atrapadoCont += dt;
        }
        else {
            this.atrapadoCont = 0;
            this.atrapadoVector = new Phaser.Math.Vector2(this.x, this.y);
        }
        if (this.atrapadoCont > 500) {
            this.atrapado = true;
        }

    }

    changeEscapeVector() {
        const dx = new Phaser.Math.Vector2(-(this.player.x - this.x), -(this.player.y - this.y));
        let ang = (Math.random() * 2 - 1) * 0.3 * Math.PI;
        dx.normalize().rotate(ang).scale(this.v);
        this.escapeVector = dx;
        if (this.escambio != undefined)
            this.escambio.remove();
       
    }
    changemoveVector() {
        const dx = new Phaser.Math.Vector2(this.player.x - this.x, this.player.y - this.y);
        let ang = (Math.random() * (Math.PI * 2 / 4 - Math.PI / 4) + Math.PI / 4)
        let dir = Math.random();
        if (dir < 0.5) {
            ang = -ang;
        }
        dx.normalize().rotate(ang).scale(this.v);
        this.moveVector = dx;
        if (this.cambio != undefined)
            this.cambio.remove();
        this.cambio = this.scene.time.delayedCall(2000, () => {
            if (this.dead) return
            this.changemoveVector();
        });

    }
    fire() {
        this.fireDirection.x = this.player.x - (this.centerX()+this.dispOffset);
        this.fireDirection.y = this.player.y - this.centerY();
        this.fireDirection.normalize();
        if (this.arrows % 2 == 0)
            this.fireDirection.rotate(2 * Math.PI * this.circun / this.arrows * 1 / 2);

        for (let i = 0; i < this.arrows; i++) {
            this.fireDirection.rotate(2 * Math.PI * this.circun / this.arrows * Math.floor((i + 1) / 2) * ((-1) ** i));
            super.fire();
            this.fireDirection.rotate(-2 * Math.PI * this.circun / this.arrows * Math.floor((i + 1) / 2) * ((-1) ** i));
            this.boo = 0;
        }
    }
    isCol() {
        if (this.dashing)
            return;
        this.changeEscapeVector();
        this.changemoveVector();

    }
    centerX(){
        return this.body.center.x;
    }
    centerY(){
        return this.body.center.y;
    }
}
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
        this.shootTime = 5;
        this.charging = false;
        this.cont = 1;
        this.dashing = false;
        this.dashDelay = false;
        this.escaping = false;
        this.preCharging = false;
        this.v = 200;
        //this.scale = 2;
        this.changeEscapeVector();
        this.changemoveVector();
        this.body.offset.x = -8;
        this.body.offset.y = 54;
        this.body.setSize(this.body.width * 1.4, this.body.height * 1.7);
    }


    creador() {
        return new Basic_projectile(this.scene, this.centerX(), this.centerY(), 'flecha', this.fireDirection.x * this.Pv, this.fireDirection.y * this.Pv, 10, this.projectileDamage);
    }


    attack(d, dt) {
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
                    this.scene.time.delayedCall(500, () => {this.charging = false;})
                }
            }
        }
    }


    moveU(t, dt) {
        let xdir = this.player.x - this.x;
        if(xdir > 0)
            this.sprite.flipX = false;
        else
            this.sprite.flipX = true;
        

        
        if (this.preCharging){
            this.sprite.stop();
            this.body.setVelocity(0,0);
            return;
        }
        if (this.charging) {
            this.sprite.play('archerfire', true);
            this.body.setVelocity(0,0);
        }
        else {
            const dx = new Phaser.Math.Vector2(this.player.x - this.x, this.player.y - this.y);
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
            if (dx.length() < 350) {
                if (!this.escaping) {
                    this.changeEscapeVector();
                    this.escaping = true;
                }

            }
            else {
                if (this.escaping) {
                    this.changemoveVector();
                    this.escaping = false
                    this.cont = 1;
                }
            }

        
        if(this.dashing){
            this.body.setVelocity(this.escapeVector.x*2, this.escapeVector.y*2);
            this.sprite.play('archerjump', true);
        }
        else if (this.escaping) {
            this.body.setVelocity(this.escapeVector.x, this.escapeVector.y);
            this.sprite.play('archerMove', true);
        }
        else{
            this.body.setVelocity(this.moveVector.x/2,this.moveVector.y/2);
            this.sprite.play('archerMove',true);
        }
    }

    }
    changeEscapeVector() {
        const dx = new Phaser.Math.Vector2(-(this.player.x - this.x), -(this.player.y - this.y));
        let ang = (Math.random() * 2 - 1) * 0.2 * Math.PI;
        dx.normalize().rotate(ang).scale(this.v);
        this.escapeVector = dx;
    }
    changemoveVector(){
        const dx = new Phaser.Math.Vector2(this.player.x - this.x, this.player.y - this.y);
        let ang = (Math.random() * (Math.PI*2/4 - Math.PI/4) + Math.PI/4)
        let dir = Math.random();
        if(dir < 0.5){
            ang = -ang;
        } 
        dx.normalize().rotate(ang).scale(this.v);
        this.moveVector = dx;
        if(this.cambio != undefined)
            this.cambio.remove();
        this.cambio = this.scene.time.delayedCall(2000,()=>{
            this.changemoveVector();
        });

    }
    fire() {
        this.fireDirection.x = this.player.x - this.centerX();
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
    isCol(){
        if(this.dashing)
            return;
        this.changeEscapeVector();
        this.changemoveVector();

    }
}
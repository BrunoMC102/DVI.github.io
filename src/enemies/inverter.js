
import ShootingEnemyParent from './shootingEnemyParent.js';
import Basic_projectile from '../proyectile/basic_projectile.js';


export default class Inverter extends ShootingEnemyParent {

    constructor(scene, player, x, y) {
        super(scene, player, x, y, 'enemy');
        this.Pv = 300;
        this.fireDirection = new Phaser.Math.Vector2(0, 1);
        this.arrows = 5;
        this.circun = 0.2;
        this.shootTime = 2;
    }


    creador() {
        return new Basic_projectile(this.scene, this.centerX(), this.centerY(), 'flecha', this.fireDirection.x * this.Pv, this.fireDirection.y * this.Pv, 10, this.projectileDamage);
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

    moveU(){
        this.invierte();
    }
    invierte() {
        let dirx = this.player.x-this.x
        let dx = -this.player.body.velocity.x;
        this.body.setVelocity(-this.player.body.velocity.x, -this.player.body.velocity.y);
        if (dirx < 0) {
            this.sprite.flipX = true;
        } else {
            this.sprite.flipX = false;
        }
    }
}
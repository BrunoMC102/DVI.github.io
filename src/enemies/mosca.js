import ShootingEnemyParent from './shootingEnemyParent.js';
import Basic_projectile from '../proyectile/basic_projectile.js';

/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Mosca extends ShootingEnemyParent {

  constructor(scene, player, x, y) {
    super(scene, player, x, y, '');
    this.Pv = 300;
    this.fireDirection = new Phaser.Math.Vector2(0, 1);
    this.cont = 1;
    this.body.pushable = false;
    this.attacking = false;
    const initial_velocity = new Phaser.Math.Vector2(1,1).normalize().scale(this.v); 
    this.body.setVelocity(initial_velocity.x, initial_velocity.y);
    this.body.setBounce(1,1);
    this.shootTime = 2.5;
  }
  creador() {
    return new Basic_projectile(this.scene, this.x, this.y, "flecha", this.fireDirection.x * this.Pv, this.fireDirection.y * this.Pv, 5, this.projectileDamage);
  }


  attack(d, dt) {
    if (this.cont === 0) {
      this.fire();
      this.fireDirection.rotate(Math.PI / 4)
      this.scene.time.delayedCall(350, () => {
        if (this.sprite != undefined && !this.dead) {
          this.attacking = false;
        }
      });
    }
    this.cont += dt;
    if (this.cont >= (this.shootTime - 1) * 1000) {
      this.attacking = true;
    }
    if (this.cont >= this.shootTime * 1000) {
      this.cont = 0;
    }
  }

  fire() {
    for (let i = 0; i < 4; i++) {
      super.fire();
      this.fireDirection.rotate(Math.PI / 2);
    }
  }
  knockback(){}
  
}
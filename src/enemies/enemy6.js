import ShootingEnemyParent from './shootingEnemyParent.js';
import Homing_p from '../proyectile/homing_p.js';

/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy6 extends ShootingEnemyParent{
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemy');
    this.Pv = 300;
    this.fireDirection = new Phaser.Math.Vector2(0,1);
    //this.shootTime = 1;
  }
  creador(){
    return new Homing_p(this.scene,this.x,this.y,this.fireDirection.x*this.Pv,this.fireDirection.y*this.Pv);
  }

    
    fire(){
        for (let i = 0; i < 8; i++){
            super.fire();
            this.fireDirection.rotate(Math.PI/4);
        }
    }
}
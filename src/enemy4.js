import ShootingEnemyParent from './shootingEnemyParent.js';
import Homing_p from './homing_p.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy4 extends ShootingEnemyParent{
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemy');
    this.Pv = 300;
    this.shootTime = 2;
  }
  creador(){
    this.projectileE = new Homing_p(this.scene,this.x,this.y);
  }
}
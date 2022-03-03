import ShootingEnemyParent from './shootingEnemyParent.js';
import Homing_2 from './homing_2.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy5 extends ShootingEnemyParent{
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemy');
  }
  creador(){
    this.projectileE = new Homing_2(this.scene,this.x,this.y);
  }
}
import ShootingEnemyParent from './shootingEnemyParent.js';
import Homing_2 from '../proyectile/homing_2.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy5 extends ShootingEnemyParent{
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemyBlack');
    this.Pv = 300;
    this.body.setDrag(0.0001);
    this.origDrag = 0.0001;
  }
  creador(){
    
    return new Homing_2(this.scene,this.x,this.y, 0, 0,  10, this.projectileDamage);
  }
}
import ShootingEnemyParent from './shootingEnemyParent.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy3 extends ShootingEnemyParent{
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemy');
    this.Pv = 300;  //Velocidad proyectil
    this.shootTime = 5; //Velocidad disparo
    this.body.setDrag(0.0001);
    this.origDrag = 0.0001;
  }
}
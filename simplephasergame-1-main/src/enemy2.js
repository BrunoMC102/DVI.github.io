import EnemyParent from './enemyParent.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy2 extends EnemyParent{
  
 
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemy');
    this.a = 500;
    this.v = 50;
  }

  
  moveU(){
    
    let dx = this.player.x - this.x;
    let dy = this.player.y - this.y;
    let t = Math.abs(dx)+Math.abs(dy);


    //this.body.setVelocity(dx*this.v/t,dy*this.v/t);
    this.body.setAcceleration(dx*this.a/t,dy*this.a/t);
    this.body.setMaxVelocity(200,200);
    //this.body.setAngularAcceleration(dx*this.a/t,dy*this.a/t);
   

  }
    

}
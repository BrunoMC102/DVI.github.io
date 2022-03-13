import ShootingEnemyParent from './shootingEnemyParent.js';
import Basic_projectile from '../proyectile/basic_projectile.js';

/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy7 extends ShootingEnemyParent{
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemy');
    this.Pv = 300;
    this.fireDirection = new Phaser.Math.Vector2(0,1);
    this.arrows = Math.floor(Math.random()*7+3);
    this.circun = Math.random()/5;
    this.shootTime = 2;
  }
 

  creador(){
    return new Basic_projectile(this.scene,this.centerX() , this.centerY(),'flecha',this.fireDirection.x*this.Pv,this.fireDirection.y*this.Pv);
  }

  
    fire(){
        this.fireDirection.x = this.player.x - this.centerX();
        this.fireDirection.y = this.player.y - this.centerY();
        this.fireDirection.normalize();
        if (this.arrows%2 == 0)
        this.fireDirection.rotate(2*Math.PI*this.circun/this.arrows*1/2);

        for (let i = 0; i < this.arrows; i++){
            this.fireDirection.rotate(2*Math.PI*this.circun/this.arrows*Math.floor((i+1)/2)*((-1)**i));
            super.fire();
            this.fireDirection.rotate(-2*Math.PI*this.circun/this.arrows*Math.floor((i+1)/2)*((-1)**i));
            this.boo = 0;
        }
    }
}
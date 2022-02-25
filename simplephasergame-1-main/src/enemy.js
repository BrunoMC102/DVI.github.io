
import EnemyParent from './enemyParent.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy extends EnemyParent{
  
  atack = {
    x : 0,
    y : 0,
    ready : false,
    charge : 0  ,
    wait : 0
  }

  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemy');
    this.dist = 600;
  }

  
  moveU(){
    
    let dx = this.player.x - this.x;
    let dy = this.player.y - this.y;
    let t = Math.abs(dx)+Math.abs(dy);


    if(this.atack.ready){
      if (this.atack.wait < 200){
        this.body.setVelocity(0,0);
        this.atack.wait++
        if (this.atack.wait == 200){
          this.atack.x = dx/t * this.v * 5;
          this.atack.y = dy/t * this.v * 5;
        }
        
      }
      else{
        this.body.setVelocity(this.atack.x,this.atack.y);
        //this.move(this.atack.x,this.atack.y);
        
        if (this.c){
            this.atack.ready = false;
            this.atack.wait = 0;
            this.c = false;
        }
      }
    
    
    }
    else if ((Math.abs(dx)< this.dist) && (Math.abs(dy) < this.dist)){
        if(this.atack.charge > 1000){
            
            this.atack.ready = true;
            this.atack.charge = 0;
        }
        else{
        //this.scene.physics.moveToObject(this,this.player,this.v); tambien es valido esta forma de perseguir al jugador
        this.body.setVelocity(dx*this.v/t,dy*this.v/t);
        this.atack.charge++;
        } 
      }
    else{
    this.body.setVelocity(0,0);
    this.atack.charge = 0;
    
    
    }
  }
  isCol(){
    if(this.atack.ready)
      this.c = true;
  }
}

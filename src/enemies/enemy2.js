import EnemyParent from './enemyParent.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy2 extends EnemyParent{
  
 
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'moleStand');
    this.a = 1000;
    this.v = 50;
    
  }


  
  preUpdate(d,dt){
    this.sprite.play('mole', true);
    this.resbala();
  }
  
  
  resbala(){
    this.a = 700
    let dx = this.player.x - this.x;
    let dy = this.player.y - this.y;
    let t = Math.abs(dx)+Math.abs(dy);
    let x = -this.body.velocity.x/600;
    let y = -this.body.velocity.y/600;
    this.body.setAcceleration(dx*this.a/t+x*this.a,dy*this.a/t+y*this.a);    
    this.body.setMaxVelocity(400,400);
    this.body.setBounce(1,1);
        
      

  }

  prediceA(ti,dt){
    
    let dx = this.player.x+this.player.body.velocity.x*dt/10 - this.x;
    let dy = this.player.y+this.player.body.velocity.y*dt/10 - this.y;
    let t = Math.abs(dx)+Math.abs(dy);
    
    let x = -this.body.velocity.x/600;
    let y = -this.body.velocity.y/600;
    this.body.setAcceleration(dx*this.a/t+x*this.a,dy*this.a/t+y*this.a);
    
    this.body.setMaxVelocity(300,300);
    this.body.setBounce(1,1);
  }

  prediceV(ti,dt){
    this.a = 200;
    let dx = this.player.x+this.player.body.velocity.x*dt/2 - this.x;
    let dy = this.player.y+this.player.body.velocity.y*dt/2 - this.y;
    let t = Math.abs(dx)+Math.abs(dy);
    
    this.body.setVelocity(dx*this.a/t,dy*this.a/t);
    
    this.body.setMaxVelocity(300,300);
    this.body.setBounce(1,1);
  }

  copia(){
    this.body.setVelocity(this.player.body.velocity.x,this.player.body.velocity.y);
  }

  invierte(){
    this.body.setVelocity(-this.player.body.velocity.x,-this.player.body.velocity.y);
  }
}
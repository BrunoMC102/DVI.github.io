import Base from './base.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  sentido = 1;
  v = 250;
  atack = {
    x : 0,
    y : 0,
    ready : false,
    charge : 0  ,
    wait : 0
  }
  constructor(scene, player, baseGroup, x, y) {
    super(scene, x, y, 'enemy');
    this.player = player
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, false);
    this.scene.physics.add.collider(this,player);
    //this.body.setCollideWorldBounds();
    //this.scene.physics.add.collider(this, player);    
  }

  /*update(d,dt){
    dx = this.player.x - this.x;
    dy = this.player.y - this.y;
    t = dx+dy;
    if ((Math.abs(dx)< 200) && (Math.abs(dy) < 200)){
      this.move(dx/t,dy/t);
    }
  }*/

  preUpdate(t,dt){
    
    this.moveU();
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
        
        if ((this.x > 1230) || (this.x < 5) || (this.y < 10) || (this.y > 950)){
            this.atack.ready = false;
            this.atack.wait = 0;
        }
      }
    
    
    }
    else if ((Math.abs(dx)< 300) && (Math.abs(dy) < 300)){
        if(this.atack.charge > 1000){
            
            this.atack.ready = true;
            this.atack.charge = 0;
        }
        else{
        //this.move(dx/t,dy/t);
        this.body.setVelocity(dx*this.v/t,dy*this.v/t);
        this.atack.charge++;
        } 
      }
    else{
    if (this.x > 900){
      this.sentido = -1;
    }
    if (this.x < 100){
      this.sentido = 1;
    }
    this.atack.charge = 0;
    this.body.setVelocity(this.sentido*this.v,0);
    //this.move(this.sentido,0);
  }
    

    //this.x += x;
    //this.y += y;
    //this.scene.physics.add.collider(this, this.player);    
  }
  move(x,y){
    this.x += x;
    this.y += y;
  }
}

import ShootingEnemyParent from './shootingEnemyParent.js';
import Homing_p from '../proyectile/homing_p.js';

/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy6 extends ShootingEnemyParent{
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'');
    this.Pv = 300;
    this.fireDirection = new Phaser.Math.Vector2(0,1);
    this.sprite.play("goblinKing_idle", true);
    //this.shootTime = 1;
    this.cont = 1;
    this.body.pushaable = false;
    this.origDrag = 0.001;
    this.body.setDrag(0.001);
  }
  creador(){
    return new Homing_p(this.scene,this.x,this.y,this.fireDirection.x*this.Pv,this.fireDirection.y*this.Pv);
  }

    
  attack(d,dt){
    if (this.cont === 0){
      this.fire();
    }
    this.cont+=dt;
    if(this.cont >= (this.shootTime-1)*1000){
      this.sprite.play("goblinKing_attack", true);
    }
    if(this.cont >= this.shootTime*1000){
          this.cont = 0;
    }
 }

  fire(){
      for (let i = 0; i < 8; i++){
          super.fire();
          this.fireDirection.rotate(Math.PI/4);
      }
      this.scene.time.delayedCall(350, () => {
        if(this.sprite != undefined && !this.dead){
        this.sprite.play("goblinKing_idle", true);}
      }
    )
  }

  hurt(damage){
    this.health -= damage;
      if(this.health <= 0 && !this.dead){
        if(this.sprite != undefined){
          this.sprite.play("goblinKing_death",true);
        }

        this.scene.time.delayedCall(1500, () => {
          this.spawnMana();
          this.spawnLoot(); 
          this.destroy();
      })
      this.dead = true;
      this.preUpdate = () =>{};
    }
  }

  moveU(){

    if(this.health <= 15){
      this.shootTime = 2;
    }
      
    let dx = this.player.x - this.x;
    if(dx < 0){
      this.sprite.flipX = true;
    }else {
      this.sprite.flipX = false;
    }

    //this.sprite.play("goblinKing_idle", true);
  }
}
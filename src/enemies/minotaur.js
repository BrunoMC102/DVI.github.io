import ShootingEnemyParent from './shootingEnemyParent.js';
import Homing_p from '../proyectile/homing_p.js';
import Basic_projectile from '../proyectile/basic_projectile.js';

/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Minotaur extends ShootingEnemyParent {


  constructor(scene, player, x, y) {
    super(scene,player,x,y,'');
    this.Pv = 400;
    this.fireDirection = new Phaser.Math.Vector2(1,0);
    this.dispMax = 15;  //Numero de proyectiles disparado cada ataque
    this.dispCont = this.dispMax;
    this.dispTime = 0.02;  //Tiempo entre proyectiles de un mismo ataque
    this.actDispTime = 0;  
    this.nVueltas = 1;  //Numero de vueltas que dan los proyectles en un ataque (puede ser menor a 1)
    this.shootTime = 3; //Tiempo entre ataques
    this.shootTime += this.dispMax*this.dispTime; //Suma el tiempo que dura un ataque al tiempo entre ataques
    this.attacking = false;
    this.attackingPreparing = false;
    this.origDrag = 0.0001;
    this.body.setDrag(this.origDrag);
    
    this.cont = 1;
    //this.body.offset.x = -15;
    this.body.offset.y = -10;
    this.body.setSize(this.body.width * 1.2, this.body.height * 1.5);
  }
  /*creador(){
    this.projectileE = new Homing_p(this.scene,this.x,this.y);
    
  }*/


  creador(){
    return new Basic_projectile(this.scene,this.centerX() , this.centerY(),'flecha',this.fireDirection.x*this.Pv,this.fireDirection.y*this.Pv, 10, this.projectileDamage);
  }
  
    attack(d,dt){

        if (this.cont === 0){
            this.attack_aux = () => {this.fire()};
            this.dispCont = 0;
            this.attacking = true;
        }
        this.cont+=dt;
        this.actDispTime+=dt;

        if(this.cont >= (this.shootTime-0.3)*1000){
          this.attackingPreparing = true;
        }

        if(this.cont >= this.shootTime*1000){
            this.cont = 0;
        }
        if(this.actDispTime >= this.dispTime*1000){
            this.attack_aux();
            this.dispCont++;
            this.actDispTime = 0;
        }
        if(this.dispCont >= this.dispMax){
            this.attack_aux = () => {};
            if (this.attacking){
              this.attacking = false;
              this.scene.time.delayedCall(500, () => {this.attackingPreparing = false;})
            }
        }
        if(this.attackingPreparing){
          this.sprite.play('minotaurSpinAttack',true);
        }
    }

    attack_aux(){
        this.fire();
    }

    fire(){
        super.fire();
        this.fireDirection.rotate(Math.PI*2*this.nVueltas/this.dispMax);
    }
    moveU(){
      if(!this.attackingPreparing){
        this.sprite.play('minotaur_idle',true);
      }
    }
    die(){
      this.sprite.play('minotaurDeath');
      this.preUpdate = ()=>{};
      this.deadCenter.x = this.centerX();
      this.deadCenter.y = this.centerY();
      this.body.destroy();
      this.scene.time.delayedCall(1500, () => {
        this.spawnMana();
        this.spawnLoot();
        this.destroy();
      })
    }
}
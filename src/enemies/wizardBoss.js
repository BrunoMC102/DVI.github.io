import ShootingEnemyParent from './shootingEnemyParent.js';
import Basic_projectile from '../proyectile/basic_projectile.js';
import wizardProjectile from '../proyectile/wizardProjectile.js';
import Meteor from '../proyectile/meteor.js';
import FireBall from '../proyectile/fireBall.js';

/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class WizardBoss extends ShootingEnemyParent{
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'');
    this.Pv = 300;
    this.fireDirection = new Phaser.Math.Vector2(0,1);
    this.arrows = 4;
    this.circun = 0.4;
    this.shootTime = 4;
    this.projectileType = 0;
    this.statusInfo = {
      preparingCont: 0,
      preparing: true, 
      attack: 0,
      postPreparing: false,
      postPreparingCont: 0,
      postPreparingTime: 350,
      lastattack: 0
    }
    this.attack2Info = {
      projectilesShooted: 0,
      dispCont:0,
      projectiles: 5,
      projectileTime: 0.05,
      nVueltas: 0.3
    }
    this.interiorContainer = new Phaser.GameObjects.Container(this.scene, 0,0);
    this.add(this.interiorContainer);
    this.fireBalls = [];
    this.setFire();
  }
 

  creador(){
    return new wizardProjectile(this.scene,this.centerX() + this.calculateOffset(), this.centerY(),this.fireDirection.x*this.Pv,this.fireDirection.y*this.Pv, 10, this.projectileDamage, this.projectileType, this.Pv);
  }


  attack(d,dt){
    this.interiorContainer.rotation += dt/1000;
    if(this.statusInfo.attack == 0){
      if(this.statusInfo.postPreparing){
        this.statusInfo.postPreparingCont += dt;
        if(this.statusInfo.postPreparingCont > this.statusInfo.postPreparingTime){
          this.statusInfo.postPreparing = false;
          this.statusInfo.postPreparingCont = 0;
        }
      }
      else{
        this.sprite.play('wizardIdle', true);
      }
      this.cont+=dt;
      if(this.cont >= this.shootTime*1000){
        this.cont = 0;
        this.statusInfo.attack = this.statusInfo.lastattack+1;
        if(this.statusInfo.attack >= 4){
          this.statusInfo.attack = 1;
        }
        this.statusInfo.lastattack = this.statusInfo.attack
        this.statusInfo.preparing = true;
      }
    }
    else if(this.statusInfo.attack == 1){
      this.sprite.play("wizardAttack1", true)
      if(this.statusInfo.preparing){
        this.statusInfo.preparingCont += dt;
        if(this.statusInfo.preparingCont > 400){
          this.statusInfo.preparingCont = 0;
          this.statusInfo.preparing = false;
          this.projectileType = 1;
          this.Pv = 150;
        }
      }
      else{
        
        this.attack1();
        this.statusInfo.attack = 0;
        this.statusInfo.postPreparingTime = 350;
        this.statusInfo.postPreparing = true;
      }
    }
    else if(this.statusInfo.attack == 2){
      this.sprite.play("wizardAttack2", true)
      if(this.statusInfo.preparing){
        this.statusInfo.preparingCont += dt;
        if(this.statusInfo.preparingCont > 300){
          this.statusInfo.preparingCont = 0;
          this.statusInfo.preparing = false;
          this.setFireDirectionToPlayer();
          this.fireDirection.rotate(-Math.PI*(this.attack2Info.nVueltas-(this.attack2Info.nVueltas/this.attack2Info.projectiles)));
          this.projectileType = 0;
          this.Pv = 400;
        }
      }
      else{
        this.attack2(dt);
        this.attack2Info.cont += dt;
        if(this.attack2Info.projectilesShooted >= this.attack2Info.projectiles){
          this.statusInfo.attack = 0;
          this.attack2Info.projectilesShooted = 0;
          this.statusInfo.postPreparingTime = 400;
          this.statusInfo.postPreparing = true;
        }
      }
    }

    else if(this.statusInfo.attack == 3){
      this.sprite.play("wizardAttack1", true)
      if(this.statusInfo.preparing){
        this.statusInfo.preparingCont += dt;
        if(this.statusInfo.preparingCont > 400){
          this.statusInfo.preparingCont = 0;
          this.statusInfo.preparing = false;
        }
      }
      else{
        this.attack3();
        this.statusInfo.attack = 0;
        this.statusInfo.postPreparingTime = 350;
        this.statusInfo.postPreparing = true;
      }
    }
    
 }


  moveU(d,dt){
    if(this.isPLayerRight()){
      this.sprite.flipX = false;
    }
    else{
      this.sprite.flipX = true;
    }
  }

  attack1(){
    this.setFireDirectionToPlayer();
    if (this.arrows%2 == 0)
    this.fireDirection.rotate(2*Math.PI*this.circun/this.arrows*1/2);
    for (let i = 0; i < this.arrows; i++){
        this.fireDirection.rotate(2*Math.PI*this.circun/this.arrows*Math.floor((i+1)/2)*((-1)**i));
        this.fire();
        this.fireDirection.rotate(-2*Math.PI*this.circun/this.arrows*Math.floor((i+1)/2)*((-1)**i));
        this.boo = 0;
    }
  }

  attack2(dt){
    if(this.attack2Info.dispCont == 0){
      this.fire();
      this.fireDirection.rotate(Math.PI*2*this.attack2Info.nVueltas/this.attack2Info.projectiles);
      this.attack2Info.projectilesShooted++;
    }
    this.attack2Info.dispCont += dt/1000;
    if(this.attack2Info.dispCont >= this.attack2Info.projectileTime){
      this.attack2Info.dispCont = 0;
    }
    
  }

  attack3(){
    let numMeteor = Math.floor(Math.random()*5+8);
    for(let i = 0; i < numMeteor; i++){
      let velocidad = Math.floor(Math.random()*400+75);
      let posX = Math.floor(Math.random()*1000+100);
      let target = Math.floor(Math.random()*500+300);
      this.meteorFire(posX,target,velocidad,1);
    }
    
  }

  setFireDirectionToPlayer(){
    this.fireDirection.x = this.player.x - this.centerX();
    this.fireDirection.y = this.player.y - this.centerY();
    this.fireDirection.normalize();
  }

  isPLayerRight(){
    let dirP = this.getPlayerDirection();
    if(dirP.x > 0){
      return true;
    }
    return false;
    
  }

  calculateOffset(){
    if(this.isPLayerRight()){
      return 100;
    }
    return -100;
  }

  getPlayerDirection(){
    return new Phaser.Math.Vector2(this.player.x - this.centerX(), this.player.y - this.centerY()).normalize();
  }
  meteorFire(x, targetY, velocity, damage){
    new Meteor(this.scene, x, targetY, velocity ,damage , 1);
  }

  setFire(){
    let fireBall = new FireBall(this.scene, 100, 0, 1);
    this.interiorContainer.add(fireBall);
    this.fireBalls.push(fireBall);
  }
}
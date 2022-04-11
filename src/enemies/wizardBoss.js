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
export default class WizardBoss extends ShootingEnemyParent {

  constructor(scene, player, x, y) {
    super(scene, player, x, y, '');
    this.Pv = 300;
    this.fireDirection = new Phaser.Math.Vector2(0, 1);
    this.arrows = 4;
    this.circun = 0.4;
    this.shootTime = 4;
    this.projectileType = 0;
    this.statusInfo = {
      phase: 0,
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
      dispCont: 0,
      projectiles: 5,
      projectileTime: 0.05,
      nVueltas: 0.3
    }
    this.interiorContainer = new Phaser.GameObjects.Container(this.scene, 0, 0);
    this.add(this.interiorContainer);
    this.fireBalls = [];
    this.body.pushable = false;
    this.health = 100;
    this.maxHealth = 100;
    this.escaping = true;
    this.persecution = false;
    this.moving = false;
    this.teleporting = false;
    this.changeVectors();
    this.atrapadoVector = new Phaser.Math.Vector2(this.x, this.y);
    this.movingCont = 0;
  }


  creador() {
    return new wizardProjectile(this.scene, this.centerX() + this.calculateOffset(), this.centerY(), this.fireDirection.x * this.Pv, this.fireDirection.y * this.Pv, 10, this.projectileDamage, this.projectileType, this.Pv);
  }




  preUpdate(d, dt) {

    if (this.freezing) return;
    if (this.changinPhase) return;
    if(this.teleporting){
      this.teleport();
      return;
    }
    this.toUpdate(dt);

    if (this.knockbackinfo.knocking) {
      this.attack(d, dt);
      return;
    }

    this.moveU(d, dt);
    this.attack(d, dt);
  }

  toUpdate(dt) {
    this.interiorContainer.rotation += dt / 1000;
    this.fireBalls.forEach((e) => {
      e.rotation -= dt / 1000;
    })
    if (this.statusInfo.phase == 0 && this.health <= this.maxHealth * 3 / 4) {
      this.changeToSecondFase();
      this.statusInfo.phase = 1;
    }
    else if (this.statusInfo.phase == 1 && this.health <= this.maxHealth * 1 / 2) {
      this.changeToSecondFase();
      this.statusInfo.phase = 2;
    }
    else if (this.statusInfo.phase == 2 && this.health <= this.maxHealth * 1 / 4) {
      this.changeToSecondFase();
      this.statusInfo.phase = 3;
    }
  }

  attack(d, dt) {


    if (this.statusInfo.attack == 0) {
      if (this.statusInfo.postPreparing) {
        this.statusInfo.postPreparingCont += dt;
        if (this.statusInfo.postPreparingCont > this.statusInfo.postPreparingTime) {
          this.statusInfo.postPreparing = false;
          this.statusInfo.postPreparingCont = 0;
        }
      }
      this.cont += dt;
      if (this.cont >= this.shootTime * 1000) {
        this.cont = 0;
        this.statusInfo.attack = this.statusInfo.lastattack + 1;
        if (this.statusInfo.attack >= 4) {
          this.statusInfo.attack = 1;
        }
        this.statusInfo.lastattack = this.statusInfo.attack
        this.statusInfo.preparing = true;
      }
    }
    else if (this.statusInfo.attack == 1) {
      this.sprite.play("wizardAttack1", true)
      if (this.statusInfo.preparing) {
        this.statusInfo.preparingCont += dt;
        if (this.statusInfo.preparingCont > 400) {
          this.statusInfo.preparingCont = 0;
          this.statusInfo.preparing = false;
          this.projectileType = 1;
          this.Pv = 150;
        }
      }
      else {

        this.attack1();
        this.statusInfo.attack = 0;
        this.statusInfo.postPreparingTime = 350;
        this.statusInfo.postPreparing = true;
      }
    }
    else if (this.statusInfo.attack == 2) {
      this.sprite.play("wizardAttack2", true)
      if (this.statusInfo.preparing) {
        this.statusInfo.preparingCont += dt;
        if (this.statusInfo.preparingCont > 300) {
          this.statusInfo.preparingCont = 0;
          this.statusInfo.preparing = false;
          this.setFireDirectionToPlayer();
          this.fireDirection.rotate(-Math.PI * (this.attack2Info.nVueltas - (this.attack2Info.nVueltas / this.attack2Info.projectiles)));
          this.projectileType = 0;
          this.Pv = 400;
        }
      }
      else {
        this.attack2(dt);
        this.attack2Info.cont += dt;
        if (this.attack2Info.projectilesShooted >= this.attack2Info.projectiles) {
          this.statusInfo.attack = 0;
          this.attack2Info.projectilesShooted = 0;
          this.statusInfo.postPreparingTime = 400;
          this.statusInfo.postPreparing = true;
        }
      }
    }

    else if (this.statusInfo.attack == 3) {
      this.sprite.play("wizardAttack1", true)
      if (this.statusInfo.preparing) {
        this.statusInfo.preparingCont += dt;
        if (this.statusInfo.preparingCont > 400) {
          this.statusInfo.preparingCont = 0;
          this.statusInfo.preparing = false;
        }
      }
      else {
        this.attack3();
        this.statusInfo.attack = 0;
        this.statusInfo.postPreparingTime = 350;
        this.statusInfo.postPreparing = true;
      }
    }

  }


  moveU(d, dt) {
   

    if (this.statusInfo.attack != 0 || this.statusInfo.postPreparing) {
      if (this.isPLayerRight()) {
        this.sprite.flipX = false;
      }
      else {
        this.sprite.flipX = true;
      }
      this.body.setVelocity(0, 0);
      return;
    }
    
    if (this.body.velocity.x >= 0) {
      this.sprite.flipX = false;
    }
    else {
      this.sprite.flipX = true;
    }
    
      if(this.movingCont >= 1000){
        this.changeVectors();
        this.movingCont = 0;
      }
      this.movingCont += dt;

      const dx = new Phaser.Math.Vector2(this.player.x - this.centerX(), this.player.y - this.centerY());

      if (dx.length() < 150) {
        if (!this.escaping) {
          this.changeEscapeVector();
          this.escaping = true;
          this.persecution = false;
          this.moving = false;
        }
      }
      else if (dx.length() < 400 && dx.length() > 200) {
        if (!this.moving) {
          this.changemoveVector();
          this.escaping = false;
          this.persecution = false;
          this.moving = true;
        }
      }
      else if (dx.length() > 450) {
        if(!this.persecution){
          this.changePersecutorVector();
          this.escaping = false;
          this.persecution = true;
          this.moving = false;
        }
      }

      if (this.teleporting) {
        this.sprite.play('archeridle', true);
        this.body.setVelocity(0, 0);
        this.sprite.tint = 0x00ff00;
      }
      else {
        if (this.escaping) {
          this.body.setVelocity(this.escapeVector.x, this.escapeVector.y);
          this.sprite.play('wizardRun', true);
          
        }
        else if(this.moving){
          this.body.setVelocity(this.moveVector.x, this.moveVector.y);
          this.sprite.play('wizardRun', true);
        }
        else if(this.persecution){
          this.body.setVelocity(this.persecutionVector.x, this.persecutionVector.y);
          this.sprite.play('wizardRun', true);
        }
      }
      this.checkatrapado(dt);
    

  }

  attack1() {
    this.setFireDirectionToPlayer();
    if (this.arrows % 2 == 0)
      this.fireDirection.rotate(2 * Math.PI * this.circun / this.arrows * 1 / 2);
    for (let i = 0; i < this.arrows; i++) {
      this.fireDirection.rotate(2 * Math.PI * this.circun / this.arrows * Math.floor((i + 1) / 2) * ((-1) ** i));
      this.fire();
      this.fireDirection.rotate(-2 * Math.PI * this.circun / this.arrows * Math.floor((i + 1) / 2) * ((-1) ** i));
      this.boo = 0;
    }
  }

  attack2(dt) {
    if (this.attack2Info.dispCont == 0) {
      this.fire();
      this.fireDirection.rotate(Math.PI * 2 * this.attack2Info.nVueltas / this.attack2Info.projectiles);
      this.attack2Info.projectilesShooted++;
    }
    this.attack2Info.dispCont += dt / 1000;
    if (this.attack2Info.dispCont >= this.attack2Info.projectileTime) {
      this.attack2Info.dispCont = 0;
    }
  }

  attack3() {
    let numMeteor = Math.floor(Math.random() * 5 + 8);
    for (let i = 0; i < numMeteor; i++) {
      let velocidad = Math.floor(Math.random() * 400 + 75);
      let posX = Math.floor(Math.random() * 1000 + 100);
      let target = Math.floor(Math.random() * 500 + 300);
      this.meteorFire(posX, target, velocidad, 1);
    }

  }

  setFireDirectionToPlayer() {
    this.fireDirection.x = this.player.x - this.centerX();
    this.fireDirection.y = this.player.y - this.centerY();
    this.fireDirection.normalize();
  }

  isPLayerRight() {
    let dirP = this.getPlayerDirection();
    if (dirP.x > 0) {
      return true;
    }
    return false;

  }

  calculateOffset() {
    if (this.isPLayerRight()) {
      return 100;
    }
    return -100;
  }

  getPlayerDirection() {
    return new Phaser.Math.Vector2(this.player.x - this.centerX(), this.player.y - this.centerY()).normalize();
  }
  meteorFire(x, targetY, velocity, damage) {
    new Meteor(this.scene, x, targetY, velocity, damage, 1);
  }


  changeToSecondFase() {
    this.changinPhase = true;

    this.attack2Info.projectiles = 6;
    this.attack2Info.nVueltas = 0.5;
    this.arrows = 5;
    this.circun = 0.5;
    this.sprite.play("wizardAttack1");
    this.scene.time.delayedCall(400, _ => {
      this.setFire();
      this.sprite.play("wizardSpell")
      this.scene.time.delayedCall(5000, _ => {
        this.changinPhase = false;
        this.sprite.play("wizardFinishSpell");
        this.statusInfo.postPreparingTime = 350;
        this.statusInfo.postPreparing = true;
      });
    });

  }


  setFire() {

    let firePos = new Phaser.Math.Vector2(200,0);

    if(this.fireBalls.length == 0){
      
      let fireBall = new FireBall(this.scene, firePos.x, firePos.y, 1);
      this.interiorContainer.add(fireBall);
      this.fireBalls.push(fireBall);
    }
    else if(this.fireBalls.length == 1){
      
      firePos.rotate(4/3*Math.PI)
      let fireBall = new FireBall(this.scene, firePos.x, firePos.y, 1);
      this.interiorContainer.add(fireBall);
      this.fireBalls.push(fireBall);
    }
    else if(this.fireBalls.length == 2){
      firePos.rotate(2/3*Math.PI)
      //this.interiorContainer.rotation = Math.PI/3;
      let fireBall = new FireBall(this.scene, firePos.x, firePos.y, 1);
      this.interiorContainer.add(fireBall);
      this.fireBalls.push(fireBall);
    }
  }


  checkatrapado(dt) {

    if (this.atrapado) {
      if (!this.escaping) {
        this.atrapado = false;
        this.sprite.tint = this.origTint;
        this.atrapadoCont = 0;
        this.cont = (this.shootTime - 1.5) * 1000;
      }
    }
    this.actVector = new Phaser.Math.Vector2(this.x, this.y);
    if (this.actVector.distance(this.atrapadoVector) < 20) {
      this.atrapadoCont += dt;
    }
    else {
      this.atrapadoCont = 0;
      this.atrapadoVector = new Phaser.Math.Vector2(this.x, this.y);
    }
    if (this.atrapadoCont > 500) {
      this.teleporting = true;
    }

  }


  changeEscapeVector() {
    const dx = new Phaser.Math.Vector2(-(this.player.x - this.x), -(this.player.y - this.y));
    let ang = (Math.random() * 2 - 1) * 0.3 * Math.PI;
    dx.normalize().rotate(ang).scale(this.v);
    this.escapeVector = dx;
    
  }

  changePersecutorVector() {
    const dx = new Phaser.Math.Vector2((this.player.x - this.x), (this.player.y - this.y));
    let ang = (Math.random() * 2 - 1) * 0.3 * Math.PI;
    dx.normalize().rotate(ang).scale(this.v);
    this.persecutionVector = dx;
  }

  changemoveVector() {
    const dx = new Phaser.Math.Vector2(this.player.x - this.x, this.player.y - this.y);
    let ang = (Math.random() * (Math.PI * 2 / 4 - Math.PI / 4) + Math.PI / 4)
    let dir = Math.random();
    if (dir < 0.5) {
      ang = -ang;
    }
    dx.normalize().rotate(ang).scale(this.v);
    this.moveVector = dx;
  }

  changeVectors(){
    this.changeEscapeVector();
    this.changePersecutorVector();
    this.changemoveVector();
  }

  isColl() {
    this.changeVectors();
  }


  teleport(){
    this.teleporting = false;
  }

}
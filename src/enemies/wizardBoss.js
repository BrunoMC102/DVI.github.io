
import wizardProjectile from '../proyectile/wizardProjectile.js';
import Meteor from '../proyectile/meteor.js';
import FireBall from '../proyectile/fireBall.js';
import FireColumn from '../proyectile/fireColumn.js';

import BossParent from './bossParent.js';


export default class WizardBoss extends BossParent {

  constructor(scene, player, x, y, dimesionX, dimesionY) {
    super(scene, player, x, y, '');
    this.Pv = 300;
    this.fireDirection = new Phaser.Math.Vector2(0, 1);
    this.arrows = 4;
    this.circun = 0.4;
    this.shootTime = 4;
    this.projectileType = 0;

    this.sceneDimensionX = dimesionX;
    this.sceneDimensionY = dimesionY;
   
    this.attack2Info = {
      projectilesShooted: 0,
      dispCont: 0,
      projectiles: 5,
      projectileTime: 0.05,
      nVueltas: 0.3
    }
    this.fireColumns = {
      projectilesShooted: 0,
      dispCont: 0,
      projectiles: 20,
      projectileTime: 0.5,
    }
    this.meteor = {
      projectilesShooted: 0,
      dispCont: 0,
      projectiles: 50,
      projectileTime: 0.2,
    }

    this.body.setSize(40, 150);


    this.interiorContainer = new Phaser.GameObjects.Container(this.scene, this.body.width / 2, this.body.height / 2);
    this.add(this.interiorContainer);
    this.fireBalls = [];
    this.body.pushable = false;
    this.health = 1;
    this.maxHealth = 1;
    this.escaping = true;
    this.persecution = false;
    this.moving = false;
    this.teleported = false;
    this.changeVectors();
    this.atrapadoVector = new Phaser.Math.Vector2(this.x, this.y);
    this.movingCont = 0;
    this.finalFaseCont = -7000;
    this.healCont = 0;
    this.recovering = false;
    this.secondPhase = false;
    
    this.movingFireCont = 0;
    this.firstPhaseAttacks = [1, 2, 3];
    this.secondPhaseAttacks = [2, 4, 5, 6, 7];
    this.phaseAttacks = [];
  }

  creador() {
    return new wizardProjectile(this.scene, this.centerX() + this.calculateOffset(), this.centerY(), this.fireDirection.x * this.Pv, this.fireDirection.y * this.Pv, 10, this.projectileDamage, this.projectileType, this.Pv);
  }




  preUpdate(t, dt) {
    this.healthBar.actualiza(this.health, this.maxHealth, this.recovering);
    if (this.freezing) return;
    if (this.changingFinalPhase) {
      this.changingToFinalPhase(dt);
      return;
    }
    if (this.changinPhase) return;
    this.toUpdate(dt);

    if (this.knockbackinfo.knocking) {
      this.attack(dt);
      return;
    }

    this.moveU(dt);
    this.attack(dt);
  }

  toUpdate(dt) {
    this.interiorContainer.rotation += dt / 1000;
    this.fireBalls.forEach((e) => {
      e.rotation = -e.getParentRotation()+Math.PI/2;
    })
    
    if (this.statusInfo.phase == 0 && this.health <= this.maxHealth * 4 / 5) {
      this.changeFase(1);
      this.statusInfo.phase = 1;
    }
    else if (this.statusInfo.phase == 1 && this.health <= this.maxHealth * 3 / 5) {
      this.changeFase(2);
      this.statusInfo.phase = 2;
    }
    else if (this.statusInfo.phase == 2 && this.health <= this.maxHealth * 2 / 5) {
      this.changeFase(3);
      this.statusInfo.phase = 3;
    }
    else if (this.statusInfo.phase == 3 && this.health <= this.maxHealth * 1 / 5) {
      this.changeFase(4);
      this.statusInfo.phase = 4;
    }

  }

  attack(dt) {

    if (this.changinPhase) return;
    if (this.changingFinalPhase) return;

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
        this.statusInfo.attack = this.extractAttack();
        this.statusInfo.lastattack = this.statusInfo.attack
        this.statusInfo.preparing = true;
      }
    }
    else if (this.statusInfo.attack == 1) {

      this.runAttack(400, true, () => { }, 350, () => {
        this.projectileType = 1;
        this.Pv = 150
      },
        this.attack1.bind(this), () => { }, dt)
    }
    else if (this.statusInfo.attack == 2) {

      this.runAttack(300, this.attack2Info.projectilesShooted >= this.attack2Info.projectiles, () => { this.attack2Info.projectilesShooted = 0; }, 400, () => {
        this.setFireDirectionToPlayer();
        this.fireDirection.rotate(-Math.PI * (this.attack2Info.nVueltas - (this.attack2Info.nVueltas / this.attack2Info.projectiles)));
        this.projectileType = 0;
        this.Pv = 400;
      }, this.attack2.bind(this), () => { }, dt, "wizardAttack2");
    }

    else if (this.statusInfo.attack == 3) {
      this.runAttack(400, true, () => { }, 350, () => { }, this.attack3.bind(this), () => { }, dt)
    }


    else if (this.statusInfo.attack == 4) {
      this.runAttack(400, true, () => { }, 350, () => {this.projectileType = 2 }, this.attack4.bind(this), () => { }, dt);
    }

    else if (this.statusInfo.attack == 5) {

      this.runAttack(300, this.meteor.projectilesShooted >= this.meteor.projectiles, () => {
        this.meteor.projectilesShooted = 0;
        this.sprite.play("wizardFinishSpell", true)
      }, 300, () => { }, this.attack5.bind(this), () => { this.sprite.play("wizardSpell", true) }, dt)

    }
    else if (this.statusInfo.attack == 6) {

      this.runAttack(300, this.fireColumns.projectilesShooted >= this.fireColumns.projectiles, () => {
        this.fireColumns.projectilesShooted = 0;
        this.sprite.play("wizardFinishSpell", true);
      }, 300, () => { }, this.attack6.bind(this), () => { this.sprite.play("wizardSpell", true) }, dt)
    }
    else if (this.statusInfo.attack == 7) {
      this.runAttack(300, this.movingFireCont >= 12000, () => {
        this.movingFireCont = 0;
        this.fireColumns.projectilesShooted = 0;
        this.fireBalls.forEach(e => e.finishMoving());
        this.sprite.play("wizardFinishSpell", true);
      }, 300, () => { }, this.attack7.bind(this), () => { this.sprite.play("wizardSpell", true); this.movingFireCont += dt }, dt)
    }
  }

  

  moveU(dt) {

    if (this.changinPhase || this.changingFinalPhase) return;
    
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

    if (this.movingCont >= 1000) {
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
      if (!this.persecution) {
        this.changePersecutorVector();
        this.escaping = false;
        this.persecution = true;
        this.moving = false;
      }
    }
    if (this.escaping) {
      this.body.setVelocity(this.escapeVector.x, this.escapeVector.y);
      this.sprite.play('wizardRun', true);
    }
    else if (this.moving) {
      this.body.setVelocity(this.moveVector.x, this.moveVector.y);
      this.sprite.play('wizardRun', true);
    }
    else if (this.persecution) {
      this.body.setVelocity(this.persecutionVector.x, this.persecutionVector.y);
      this.sprite.play('wizardRun', true);
    }
  }



  moveUSecondPhase(d, dt) {
    if (this.isPLayerRight()) {
      this.sprite.flipX = false;
    }
    else {
      this.sprite.flipX = true;
    }
    if (this.statusInfo.attack == 0 && !this.statusInfo.postPreparing) {
      this.sprite.play('wizardIdle', true);
    }
  }


  attack1() {
    this.setFireDirectionToPlayer();
    if (this.arrows % 2 == 0)
      this.fireDirection.rotate(2 * Math.PI * this.circun / this.arrows * 1 / 2);
    for (let i = 0; i < this.arrows; i++) {
      this.fireDirection.rotate(2 * Math.PI * this.circun / this.arrows * Math.floor((i + 1) / 2) * ((-1) ** i));
      this.fire();
      this.fireDirection.rotate(-2 * Math.PI * this.circun / this.arrows * Math.floor((i + 1) / 2) * ((-1) ** i));
      
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
    let numMeteor = Math.floor(Math.random() * 15 + 20);
    for (let i = 0; i < numMeteor; i++) {
      let velocidad = Math.floor(Math.random() * 400 + 75);
      let posX = Math.floor(Math.random() * (this.sceneDimensionX-200) + 100);
      let target = Math.floor(Math.random() * (this.sceneDimensionY-500) + 300);
      this.meteorFire(posX, target, velocidad, 1);
    }

  }


  attack4() {
    let arrows = 10
    this.setFireDirectionToPlayer();
    if (arrows % 2 == 0)
      this.fireDirection.rotate(2 * Math.PI / arrows * 1 / 2);
    for (let i = 0; i < arrows; i++) {
      this.fireDirection.rotate(2 * Math.PI / arrows * Math.floor((i + 1) / 2) * ((-1) ** i));
      this.fire();
      this.fireDirection.rotate(-2 * Math.PI / arrows * Math.floor((i + 1) / 2) * ((-1) ** i));
      
    }
  }

  attack5(dt) {
    if (this.meteor.dispCont == 0) {
      let velocidad = Math.floor(Math.random() * 400 + 75);
      let posX = Math.floor(Math.random() * (this.sceneDimensionX-200) + 100);
      let target = Math.floor(Math.random() * (this.sceneDimensionY-500) + 300);
      this.meteorFire(posX, target, velocidad, 1);
      this.meteor.projectilesShooted++;
    }
    this.meteor.dispCont += dt / 1000;
    if (this.meteor.dispCont >= this.meteor.projectileTime) {
      this.meteor.dispCont = 0;
    }
  }

  attack6(dt) {
    this.releaseFireColumns(dt);
  }

  attack7(dt) {
    this.interiorContainer.rotation += dt / 100;
    this.fireBalls.forEach(e => e.moveLocation(100));

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


  changeFase(phase) {
    
    if (phase == 4) {
      this.changingFinalPhase = true;
      this.secondPhase = true;
      this.phaseAttacks = this.createRandomizedList(this.secondPhaseAttacks);
      this.moveU = this.moveUSecondPhase;
      this.attack2Info.projectiles = 12;
      this.attack2Info.nVueltas = 0.7;
    }
    else if (phase == 1) {
      this.attack2Info.projectiles = 6;
      this.attack2Info.nVueltas = 0.5;
      this.arrows = 5;
      this.circun = 0.5;
    }
    else if (phase == 2) {
      this.attack2Info.projectiles = 7;
      this.arrows = 6;
    }
    else if (phase == 3) {
      this.attack2Info.projectiles = 8;
      this.arrows = 7;
      this.circun = 0.55;
      this.attack2Info.nVueltas = 0.55;
    }
    if (phase <= 3) {
      this.changinPhase = true;
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
    else {
      this.sprite.play("wizardDie");

    }
    this.body.setVelocity(0,0);
  }


 


  changingToFinalPhase(dt) {
    if (this.finalFaseCont < 1000 && this.finalFaseCont >= -4500) {
      this.recovering = true;
      this.sprite.tint = 0x00ff00;
      if (this.healCont == 0)
        this.heal();
      this.healCont += dt
      if (this.healCont >= 50) {
        this.healCont = 0;
      }
    }
    if (!this.teleported) {
      if (this.finalFaseCont >= 1000) {
        this.sprite.play("wizardAttack1");
        this.scene.time.delayedCall(400, _ => this.sprite.play("wizardSpell"))
        this.sprite.tint = 0xffffff;
        this.recovering = false;
        this.x -= this.centerX() - this.sceneDimensionX/2;
        this.y -= this.centerY() - this.sceneDimensionY/2;
        this.teleported = true;
      }
    }
    if (this.finalFaseCont >= 2000) {
      this.releaseFireColumns(dt);
    }

    if (this.finalFaseCont >= 12000) {
      this.changingFinalPhase = false;
      this.sprite.play("wizardFinishSpell");
      this.statusInfo.postPreparingTime = 350;
      this.statusInfo.postPreparing = true;
      this.fireColumns.projectilesShooted = 0;
    }
    this.finalFaseCont += dt;
  }


  heal() {
    if (this.health < this.maxHealth)
      this.health++;
  }

  releaseFireColumns(dt) {
    if (this.fireColumns.dispCont == 0) {
      this.fireFireColumn();
      this.fireColumns.projectilesShooted++;
    }
    this.fireColumns.dispCont += dt / 1000;
    if (this.fireColumns.dispCont >= this.fireColumns.projectileTime) {
      this.fireColumns.dispCont = 0;
    }
  }

  fireFireColumn() {
    let velocidad = new Phaser.Math.Vector2(0, -Math.floor(Math.random() * 300 + 150));
    let ang = (Math.random() * (Math.PI / 4) + Math.PI / 10)
    let dir = Math.random();
    if (dir < 0.5) {
      ang = -ang;
    }
    velocidad.rotate(ang);
    let target = Math.floor(Math.random() * (this.sceneDimensionY*2/3) + this.sceneDimensionY*1/4);
    new FireColumn(this.scene, this.centerX(), this.centerY(), target, velocidad.x, velocidad.y, 175, 1, 1);
  }

  setFire() {
    let firePos = new Phaser.Math.Vector2(200, 0);

    if (this.fireBalls.length == 0) {
      this.addFireBall(firePos);
    }
    else if (this.fireBalls.length == 1) {

      firePos.rotate(4 / 3 * Math.PI)
      this.addFireBall(firePos);
    }
    else if (this.fireBalls.length == 2) {
      firePos.rotate(2 / 3 * Math.PI)

      this.addFireBall(firePos);
    }


  }
  addFireBall(firePos) {
    let fireBall = new FireBall(this.scene, firePos.x, firePos.y, 1);
    this.interiorContainer.add(fireBall);
    fireBall.rotation = -fireBall.getParentRotation()+Math.PI/2;
    this.fireBalls.push(fireBall);
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

  changeVectors() {
    this.changeEscapeVector();
    this.changePersecutorVector();
    this.changemoveVector();
  }

  isColl() {
    this.changeVectors();
  }


  extractAttack() {
    if (this.phaseAttacks.length <= 0) {
      if (this.secondPhase) {
        this.phaseAttacks = this.createRandomizedList(this.secondPhaseAttacks);
      }
      else {
        this.phaseAttacks = this.createRandomizedList(this.firstPhaseAttacks);
      }
    }
    return this.phaseAttacks.pop();
  }


  createRandomizedList(list) {
    const auxList = list.slice();
    let randomList = [];
    while (auxList.length != 0) {
      let index = Math.floor(Math.random() * auxList.length);
      randomList.push(auxList[index]);
      auxList.splice(index, 1);
    }
    return randomList;
  }

  die() {
    super.die("wizardDie");
  }

  hurt(damage) {
    if (this.changinPhase) return;
    if (this.changingFinalPhase) return;
    super.hurt(damage);
  }

  knockback(x, y, p) {
    if (this.changinPhase) return;
    if (this.changingFinalPhase) return;
    if (this.secondPhase) return;
    super.knockback(x, y, p);
  }

  freeze() { }

}
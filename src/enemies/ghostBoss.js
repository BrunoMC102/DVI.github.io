import GhostArrow from "../proyectile/ghostArrow.js";
import ShootingEnemyParent from "./shootingEnemyParent.js";


export default class GhostBoss extends ShootingEnemyParent {

    constructor(scene, player, x_dimension, y_dimension, isRight) {
        super(scene, player, x_dimension/2, y_dimension/2 , '');
        this.attack_type = 1;
        this.isRight = isRight;
        this.isGoingUp = false;
        this.x_dimension = x_dimension;
        this.y_dimension = y_dimension;
        this.x_offset = 175;
        this.y_offset = 175;

        this.numberDashProjectiles = 7;
        this.dashDistance = this.x_dimension - 2 * this.x_offset;
        this.dashShooted = 8;


        this.dashVelocity = 600;
        this.v = 200;
        this.statusInfo = {
            preparingCont: 0,
            preparing: true,
            postPreparing: false,
            postPreparingCont: 0,
            postPreparingTime: 350,
        }

        this.attacks = [1];
        this.phaseAttacks = [];
        this.Pv = 300;
    }



    preUpdate(d, dt) {





        /*if (this.knockbackinfo.knocking) {
          this.attack(d, dt);
          return;
        }*/
        this.moveU(d, dt);
        this.attack(d, dt);
    }



    creador() {
        return new GhostArrow(this.scene, this.centerX() + this.calculateOffset(), this.centerY(), this.fireDirection.x * this.Pv, this.fireDirection.y * this.Pv, 10, this.projectileDamage, this.projectileType, this.Pv);
    }

    attack(d,dt) {
        if (this.attack_type == 0) {
            this.sprite.play("ghostBossIdle", true);
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
              this.attack_type = this.extractAttack();
              this.statusInfo.preparing = true;
            }
        }
        else if (this.attack_type == 1) {
            
            if (this.statusInfo.preparing) {
                this.statusInfo.preparingCont += dt;
                this.sprite.play("ghostBossDash", true);
                if (this.statusInfo.preparingCont > 400) {
                    this.statusInfo.preparingCont = 0;
                    this.statusInfo.preparing = false;
                    
                    this.sprite.chain("ghostBossDashCont");
                }
            }
            else { 
                this.shootDashProjectiles();
            }
        }
    }

    moveU(d,dt) {

        this.setFlip();

        if (this.attack_type === 0) {
            if (this.isGoingUp) {
                if (this.isUpCoord()) {
                    this.isGoingUp = false;
                    this.body.setVelocity(0, 0);
                }
                else {
                    this.body.setVelocity(0, -this.v);
                }
            }
            else {
                if (this.isDownCoord()) {
                    this.isGoingUp = true;
                    this.body.setVelocity(0, 0);
                }
                else {
                    this.body.setVelocity(0, this.v);
                }
            }
        }

        else if (this.attack_type === 1) {
            if(this.statusInfo.preparing){
                this.body.setVelocity(0,0);
                return;
            } 
            if (this.isRight) {
                if (this.isLeftCoord()) {
                    this.attack_type = 0;
                    this.dashShooted = 0;
                    this.body.setVelocity(0, 0);
                    this.isRight = false;
                }
                else {
                    this.body.setVelocity(-this.dashVelocity, 0);
                }
            }
            else {
                if (this.isRightCoord()) {
                    this.attack_type = 0;
                    this.dashShooted = 0;
                    this.body.setVelocity(0, 0);
                    this.isRight = true;
                }
                else {
                    this.body.setVelocity(this.dashVelocity, 0);
                }
            }
        }
    }


    shootDashProjectiles() {
        if(this.dashShooted >= this.numberDashProjectiles) return;
        let comp;
        if (!this.isRight) {
            comp = this.centerX() >= (this.dashShooted * this.dashDistance / (this.numberDashProjectiles)) + this.x_offset;
        }
        else {
            comp = this.centerX() <= this.x_dimension - this.x_offset - (this.dashShooted * this.dashDistance / (this.numberDashProjectiles));
        }
        if (comp) {
            this.dashShooted++;
            this.dashShoot();
        }
    }



    dashShoot() {
        this.fireDirection = new Phaser.Math.Vector2(0,1);
        this.projectileType = 0;
        this.fire();
        this.fireDirection.rotate(Math.PI);
        this.fire();
    }


    setFlip(){
        if(this.isRight){
            this.sprite.flipX = false;
        }
        else{
            this.sprite.flipX = true;
        }
    }


    isLeftCoord() {
        if (this.centerX() <= this.x_offset) {
            return true;
        }
        else {
            return false;
        }
    }

    isRightCoord() {
        if (this.centerX() >= this.x_dimension - this.x_offset) {
            return true;
        }
        else {
            return false;
        }
    }

    isUpCoord() {
        if (this.centerY() <= this.y_offset) {
            return true;
        }
        else {
            return false;
        }
    }

    isDownCoord() {
        if (this.centerY() >= this.y_dimension - this.y_offset) {
            return true;
        }
        else {
            return false;
        }
    }

    calculateOffset() {
        if(this.attack == 1){
            return 0;
        }
        if (this.isRight) {
          return -100;
        }
        return 100;
      }

      extractAttack(){
        if(this.phaseAttacks.length <= 0){
            this.phaseAttacks = this.createRandomizedList(this.attacks);
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


}
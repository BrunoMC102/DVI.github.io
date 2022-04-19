import GhostArrow from "../proyectile/ghostArrow.js";
import GhostBall from "../proyectile/ghostBall.js";
import GhostBall_2 from "../proyectile/ghostBall_2.js";
import ShootingEnemyParent from "./shootingEnemyParent.js";


export default class GhostBoss extends ShootingEnemyParent {

    constructor(scene, player, x_dimension, y_dimension, isRight) {
        super(scene, player, x_dimension / 2, y_dimension / 2, '');
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



        this.circun = 0.3;
        this.arrows = 3;
        this.attack2Vel = 130;
        this.attack3Vel = 370;

        this.attacks = [1, 2, 3];
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
        if (this.projectileType == 0)
            return new GhostArrow(this.scene, this.centerX() + this.calculateOffset(), this.centerY(), this.fireDirection.x * this.Pv, this.fireDirection.y * this.Pv, 10, this.projectileDamage);
        if (this.projectileType == 1)
            return new GhostBall(this.scene, this.centerX() + this.calculateOffset(), this.centerY(), this.fireDirection.x * this.attack2Vel, this.fireDirection.y * this.attack2Vel, 5, this.projectileDamage);
        if (this.projectileType == 2)
            return new GhostBall_2(this.scene, this.centerX() + this.calculateOffset(), this.centerY(), this.fireDirection.x * this.attack3Vel, this.fireDirection.y * this.attack3Vel, 5, this.projectileDamage);

    }

    attack(d, dt) {
        if (this.attack_type == 0) {
            
            if (this.statusInfo.postPreparing) {
                this.statusInfo.postPreparingCont += dt;
                if (this.statusInfo.postPreparingCont > this.statusInfo.postPreparingTime) {
                    this.statusInfo.postPreparing = false;
                    this.statusInfo.postPreparingCont = 0;
                }
            }
            else{
                this.sprite.play("ghostBossIdle", true);
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
        else if (this.attack_type == 2) {

            if (this.statusInfo.preparing) {
                this.statusInfo.preparingCont += dt;
                this.sprite.play("ghostBossAttack", true);
                if (this.statusInfo.preparingCont > 800) {
                    this.statusInfo.preparingCont = 0;
                    this.statusInfo.preparing = false;
                }
            }
            else {
                this.attack2();
                this.attack_type = 0;
                this.statusInfo.postPreparingTime = 350;
                this.statusInfo.postPreparing = true;
            }
        }
        else if (this.attack_type == 3) {

            if (this.statusInfo.preparing) {
                this.statusInfo.preparingCont += dt;
                this.sprite.play("ghostBossAttack", true);
                if (this.statusInfo.preparingCont > 800) {
                    this.statusInfo.preparingCont = 0;
                    this.statusInfo.preparing = false;
                }
            }
            else {
                this.attack3();
                this.attack_type = 0;
                this.statusInfo.postPreparingTime = 350;
                this.statusInfo.postPreparing = true;
            }
        }
    }

    moveU(d, dt) {

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
            if (this.statusInfo.preparing) {
                this.body.setVelocity(0, 0);
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
        else {
            this.body.setVelocity(0, 0);
        }
    }


    shootDashProjectiles() {
        if (this.dashShooted >= this.numberDashProjectiles) return;
        this.wallCollGroup = this.noBounceCollGroup;
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

    attack2() {
        this.wallCollGroup = this.bounceCollGroup;
        this.projectileType = 1;
        this.setFireDirection();
        if (this.arrows % 2 == 0)
            this.fireDirection.rotate(2 * Math.PI * this.circun / this.arrows * 1 / 2);
        for (let i = 0; i < this.arrows; i++) {
            this.fireDirection.rotate(2 * Math.PI * this.circun / this.arrows * Math.floor((i + 1) / 2) * ((-1) ** i));
            this.fire();
            this.fireDirection.rotate(-2 * Math.PI * this.circun / this.arrows * Math.floor((i + 1) / 2) * ((-1) ** i));
        }
    }

    attack3() {
        this.wallCollGroup = this.bounceCollGroup;
        this.projectileType = 2;
        this.setFireDirection();
        this.fire();


    }

    dashShoot() {
        this.fireDirection = new Phaser.Math.Vector2(0, 1);
        this.projectileType = 0;
        this.fire();
        this.fireDirection.rotate(Math.PI);
        this.fire();
    }


    setFlip() {
        if (this.isRight) {
            this.sprite.flipX = false;
        }
        else {
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
        if (this.attack == 1) {
            return 0;
        }
        if (this.isRight) {
            return -60;
        }
        return 60;
    }

    extractAttack() {
        if (this.phaseAttacks.length <= 0) {
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

    createGropus() {


        this.noBounceCollGroup = this.scene.add.group();
        this.scene.physics.add.collider(this.noBounceCollGroup, this.scene.wallLayer, (o1, o2) => {
            o1.destroy();
        });
        this.playerOverlapGroup = this.scene.add.group();
        this.scene.physics.add.overlap(this.playerOverlapGroup, this.player, (o1, o2) => {
            o2.hurt(this.damage);
        });
        this.bounceCollGroup = this.scene.add.group();
        this.scene.physics.add.collider(this.bounceCollGroup, this.scene.wallLayer, (o1, o2) => { });

        this.wallCollGroup = this.noBounceCollGroup;
    }

    setFireDirection() {
        if (this.isRight){
            this.fireDirection = new Phaser.Math.Vector2(-1, 0);
        }
        else {
            this.fireDirection = new Phaser.Math.Vector2(1, 0);
        }
    }

}
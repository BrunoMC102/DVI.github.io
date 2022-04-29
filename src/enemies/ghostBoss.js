import fireEnemySpawn from "../proyectile/fireEnemySpawn.js";
import GhostArrow from "../proyectile/ghostArrow.js";
import GhostArrow_2 from "../proyectile/ghostArrow_2.js";
import GhostBall from "../proyectile/ghostBall.js";
import GhostBall_2 from "../proyectile/ghostBall_2.js";
import BossParent from "./bossParent.js";



export default class GhostBoss extends BossParent {

    constructor(scene, player, x_dimension, y_dimension, isRight) {
        super(scene, player, x_dimension / 2, y_dimension / 2, '');
        this.statusInfo.attack = 1;
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




        this.circun = 0.3;
        this.arrowsAttack2 = 5;
        this.arrowsAttack3 = 3;
        this.attack2Vel = 130;
        this.attack3Vel = 370;


        this.attack4Info = {
            projectilesShooted: 0,
            dispCont: 0,
            projectiles: 20,
            projectileTime: 0.4,
        }


        this.fireSpawnNumber = 8;

        this.attacks = [1, 2, 3, 4, 5];
        this.phaseAttacks = [];
        this.Pv = 300;
        this.Pv2 = 500;
        this.maxHealth = 300;
        this.health = 300;

    }



    preUpdate(d, dt) {

        this.healthBar.actualiza(this.health, this.maxHealth, this.recovering);
        this.moveU();
        this.attack(dt);

    }


    creador() {
        if (this.projectileType == 0)
            return new GhostArrow(this.scene, this.centerX() + this.calculateOffset(), this.centerY(), this.fireDirection.x * this.Pv, this.fireDirection.y * this.Pv, 10, this.projectileDamage);
        if (this.projectileType == 1)
            return new GhostBall(this.scene, this.centerX() + this.calculateOffset(), this.centerY(), this.fireDirection.x * this.attack2Vel, this.fireDirection.y * this.attack2Vel, 10, this.projectileDamage);
        if (this.projectileType == 2)
            return new GhostBall_2(this.scene, this.centerX() + this.calculateOffset(), this.centerY(), this.fireDirection.x * this.attack3Vel, this.fireDirection.y * this.attack3Vel, 13, this.projectileDamage);
        if (this.projectileType == 3)
            return new GhostArrow_2(this.scene, this.centerX() + this.calculateOffset(), this.centerY(), this.fireDirection.x * this.Pv2, this.fireDirection.y * this.Pv2, 10, this.projectileDamage);

    }

    attack(dt) {
        if (this.statusInfo.attack == 0) {


            if (this.statusInfo.postPreparing) {
                this.statusInfo.postPreparingCont += dt;
                if (this.statusInfo.postPreparingCont > this.statusInfo.postPreparingTime) {
                    this.statusInfo.postPreparing = false;
                    this.statusInfo.postPreparingCont = 0;
                }
            }
            else {
                this.sprite.play("ghostBossIdle", true);
            }
            this.cont += dt;
            if (this.cont >= this.shootTime * 1000) {
                this.cont = 0;
                this.statusInfo.attack = this.extractAttack();
                this.statusInfo.preparing = true;
            }
        }
        else if (this.statusInfo.attack == 1) {

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
        else if (this.statusInfo.attack == 2) {

            this.runAttack(800, true, () => { }, 350, () => { }, this.attack2.bind(this), () => { }, dt, "ghostBossAttack");

        }
        else if (this.statusInfo.attack == 3) {

            this.runAttack(800, true, () => { }, 350, () => { }, this.attack3.bind(this), () => { }, dt, "ghostBossAttack");

        }
        else if (this.statusInfo.attack == 4) {
            this.runAttack(800, this.attack4Info.projectilesShooted >= this.attack4Info.projectiles, () => {
                this.attack4Info.projectilesShooted = 0;
                this.attack4Info.dispCont = 0;
            }, 400, () => { this.sprite.chain("ghostBossAttackCont", true) }, this.attack4.bind(this), () => { }, dt, "ghostBossAttack");
        }
        else if (this.statusInfo.attack == 5) {
            this.runAttack(800, true, () => { }, 350, () => { }, this.attack5.bind(this), () => { }, dt, "ghostBossAttack");
        }
    }

    moveU() {

        this.setFlip();

        if (this.statusInfo.attack === 0 || this.statusInfo.attack == 4) {
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

        else if (this.statusInfo.attack === 1) {
            if (this.statusInfo.preparing) {
                this.body.setVelocity(0, 0);
                return;
            }
            if (this.isRight) {
                if (this.isLeftCoord()) {
                    this.statusInfo.attack = 0;
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
                    this.statusInfo.attack = 0;
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
        if (this.arrowsAttack2 % 2 == 0)
            this.fireDirection.rotate(2 * Math.PI * this.circun / this.arrowsAttack2 * 1 / 2);
        for (let i = 0; i < this.arrowsAttack2; i++) {
            this.fireDirection.rotate(2 * Math.PI * this.circun / this.arrowsAttack2 * Math.floor((i + 1) / 2) * ((-1) ** i));
            this.fire();
            this.fireDirection.rotate(-2 * Math.PI * this.circun / this.arrowsAttack2 * Math.floor((i + 1) / 2) * ((-1) ** i));
        }
    }

    attack3() {
        this.wallCollGroup = this.bounceCollGroup;
        this.projectileType = 2;
        this.setFireDirection();
        if (this.arrowsAttack3 % 2 == 0)
            this.fireDirection.rotate(2 * Math.PI * this.circun / this.arrowsAttack3 * 1 / 2);
        for (let i = 0; i < this.arrowsAttack3; i++) {
            this.fireDirection.rotate(2 * Math.PI * this.circun / this.arrowsAttack3 * Math.floor((i + 1) / 2) * ((-1) ** i));
            this.fire();
            this.fireDirection.rotate(-2 * Math.PI * this.circun / this.arrowsAttack3 * Math.floor((i + 1) / 2) * ((-1) ** i));
        }
    }

    attack4(dt) {
        this.projectileType = 3;
        this.wallCollGroup = this.noBounceCollGroup;
        if (this.attack4Info.dispCont == 0) {
            this.setFireDirection();
            this.fire();
            this.attack4Info.projectilesShooted++;
        }
        this.attack4Info.dispCont += dt / 1000;
        if (this.attack4Info.dispCont >= this.attack4Info.projectileTime) {
            this.attack4Info.dispCont = 0;
        }
    }

    attack5() {
        for (let i = 0; i < this.fireSpawnNumber; i++) {
            this.fireFireSpawner();
        }
    }


    fireFireSpawner() {
        let velocidad = new Phaser.Math.Vector2(0, -Math.floor(Math.random() * 300 + 150));
        let ang = (Math.random() * (Math.PI / 3) + Math.PI / 10)
        let dir = Math.random();
        if (this.isRight) {
            ang = -ang;
        }
        velocidad.rotate(ang);
        let target = Math.floor(Math.random() * (this.y_dimension*2/3) + this.y_dimension*1/5);
        new fireEnemySpawn(this.scene, this.centerX(), this.centerY(), target, velocidad.x, velocidad.y, 150, 1, 1);
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
        if (this.isRight) {
            this.fireDirection = new Phaser.Math.Vector2(-1, 0);
        }
        else {
            this.fireDirection = new Phaser.Math.Vector2(1, 0);
        }
    }

    die(){
        super.die("ghostBossDie");
    }


    

}
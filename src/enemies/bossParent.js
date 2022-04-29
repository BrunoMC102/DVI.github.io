
import ShootingEnemyParent from "./shootingEnemyParent.js";
import WizardBossHealth from "./wizardBossHealth.js";

export default class BossParent extends ShootingEnemyParent {
    constructor(scene, player, x, y, texture) {
        super(scene, player, x, y, texture);
        this.healthBar = new WizardBossHealth(this.scene, 300, 850);   

        this.statusInfo = {
            phase: 0,
            preparingCont: 0,
            preparing: true,
            attack: 0,
            postPreparing: false,
            postPreparingCont: 0,
            postPreparingTime: 350,
        }
     }


    runAttack(preparingCont, finishCondition, finishAction, postPreparingTime, preAttackAction, attack, attackingAction, dt, animation = "wizardAttack1") {
        if (this.statusInfo.preparing) {
            this.sprite.play(animation, true);
            this.statusInfo.preparingCont += dt;
            if (this.statusInfo.preparingCont > preparingCont) {
                this.statusInfo.preparingCont = 0;
                this.statusInfo.preparing = false;
                preAttackAction();
            }
        }
        else {
            attackingAction();
            attack(dt);
            if (finishCondition) {
                this.statusInfo.attack = 0;
                finishAction();
                this.statusInfo.postPreparingTime = postPreparingTime;
                this.statusInfo.postPreparing = true;
            }
        }
    }


    

    die(dieAnimation) {
        this.sprite.play(dieAnimation);
        this.preUpdate = () => { };
        this.deadCenter.x = this.centerX();
        this.deadCenter.y = this.centerY();
        this.body.destroy();
        this.healthBar.boom();
        this.scene.time.delayedCall(2000, () => {
            this.scene.onBossDefeated();
            this.destroy();
        })
    }
}


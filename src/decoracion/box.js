export default class Box extends Phaser.GameObjects.Sprite {
    constructor(scene, x, targetY, direction) {
        super(scene, x, -70, 'boxImg');
        this.targetY = targetY;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.timeToReach = 0.3;
        this.velocity = (this.targetY + 70) / this.timeToReach;
        this.reached = false;
        if(direction == 0){
            this.setDepth(1);
        }
        else{
            this.setDepth(7);
        }

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.reached) return;
        this.body.setVelocity(0, this.velocity);
        if (this.y >= this.targetY) {
            this.y = this.targetY;
            this.play("box");
            this.body.setVelocity(0, 0);
            this.reached = true;
        }
    }

    break() {
        if (!this.reached) {
            this.destroy();
        }
        else {
            this.play("boxDestroy");
            this.scene.time.delayedCall(1000, () => this.destroy());
        }



    }


}
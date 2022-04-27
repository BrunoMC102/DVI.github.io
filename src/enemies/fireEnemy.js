import EnemyParent from "./enemyParent.js";

export default class FireEnemy extends EnemyParent {
    constructor(scene, player, x, y) {
        super(scene, player, x, y, '');
        this.toDashCont = 0;
        this.dashCont = 0;
        this.dashTime = 800;
        this.dashDuration = 200;
        this.dashing = false;
        this.v = 70;
        this.dashingVelocity = 250;
        this.sprite.play("fireEnemy", true);
        this.dashDirection = this.getPlayerDirection(this.dashingVelocity);
    }


    moveU(t, dt) {
        if (!this.dashing) {
            if(this.toDashCont >= this.dashTime){
                this.dashing = true;
                this.dashDirection = this.getPlayerDirection(this.dashingVelocity);
                this.toDashCont = 0;
            }
            else{
                const dir = this.getPlayerDirection(this.v);
                this.body.setVelocity(dir.x,dir.y);
                this.toDashCont += dt;
            }
        }
        else{
            if(this.dashCont >= this.dashDuration){
                this.dashing = false
                this.dashCont = 0;
            }
            else{
                this.dashCont += dt;
                this.body.setVelocity(this.dashDirection.x,this.dashDirection.y);
            }
        }

    }


    getPlayerDirection(scale) {
        return new Phaser.Math.Vector2(this.player.x - this.centerX(), this.player.y - this.centerY()).normalize().scale(scale);
    }

    die(){  
        this.destroy();
    }

}
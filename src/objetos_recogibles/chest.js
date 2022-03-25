import PasivePowerUpList from "./pasivos/PasivePowerUpList.js";

export default class Chest extends Phaser.GameObjects.Sprite{

    constructor(scene,player,x,y){
        super(scene,x,y,'');
        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.body.allowGravity = false;
        this.open = false;
        this.scene.physics.add.collider(this, this.player, () => {
            if(this.open) return;
            this.open = true;
            this.spawnPoweUp()});
        
    }

    spawnPoweUp(){
        PasivePowerUpList.extractPowerUp()(this.scene, this.player, this.x, this.y-30);
    }
}
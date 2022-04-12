export default class WizardBossHealth extends Phaser.GameObjects.Rectangle{
    constructor(scene,x,y){
        super(scene,x,y,200,15,0xff0000).setScrollFactor(0).setDepth(4);
        this.outline = new Phaser.GameObjects.Rectangle(scene,x,y, 200+6, 15+4, 0x000000).setScrollFactor(0).setDepth(4);
        this.scene.add.existing(this.outline);
        this.scene.add.existing(this);
        this.z = 0.5;
        this.outline.z = 1;
        this.maxWidth = 1000;
    }

    actualiza(health, max, recovering){
        this.width = health*this.maxWidth/max;
        this.outline.width = (this.maxWidth)+6;
        
        if(recovering){
            this.fillColor = 0x00ff00;
        }
        else{
            this.fillColor = 0xff0000;
        }
    }
    boom(){
        this.outline.destroy();
        this.destroy();
    }
}
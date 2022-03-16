

export default class ManaBar extends Phaser.GameObjects.Rectangle{
    constructor(scene,x,y){
        super(scene,x,y,200,15,0x1e0bd0)
        this.outline = new Phaser.GameObjects.Rectangle(scene,x,y, 200+6, 15+4, 0x000000);
        this.scene.add.existing(this.outline);
        this.scene.add.existing(this);
    }

    actualiza(mana, max){
        this.width = mana*2;
        this.outline.width = (max*2)+6;
        if(mana > 20){
            this.fillColor = 0x9265ff;
        }
    }
}
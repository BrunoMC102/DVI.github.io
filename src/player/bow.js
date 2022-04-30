import Sword from "./sword.js";

export default class Bow extends Phaser.GameObjects.Container {

    constructor(scene, x, y, player) {
        super(scene, x, y);
        this.scene.add.existing(this);
        this.setVisible(true);
        
        this.sprite = new Phaser.GameObjects.Sprite(scene, 40, 0, 'bow');
        this.wand = new Phaser.GameObjects.Sprite(scene, 30, 20, 'wand');
        this.directionArrow = new Phaser.GameObjects.Sprite(scene, 50, 0, 'directionArrow');
        this.wand.setVisible(false);
        this.sprite.setVisible(false);
        this.directionArrow.setVisible(false);
        this.wand.scale = 0.5;
        this.directionArrow.scale = 0.3;
        this.directionArrow.alpha = 0.3;
        this.sprite.depth = 6;
        this.add(this.sprite);
        this.add(this.wand);
        this.add(this.directionArrow);
        this.player = player;
    }


    preUpdate(t, dt) { //Llamar despues en clases hijos
        this.wand.rotation = -this.wand.getParentRotation();
        let posEsp = this.player.controls.projectileAngle();
        let ang = posEsp.angle();
        this.rotation = ang;
    }
}


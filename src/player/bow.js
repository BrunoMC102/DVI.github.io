import Sword from "./sword.js";

export default class Bow extends Phaser.GameObjects.Container {

    constructor(scene, x, y, player) {
        super(scene, x, y);
        this.scene.add.existing(this);
        this.setVisible(false);
        
        this.sprite = new Phaser.GameObjects.Sprite(scene, 40, 0, 'bow');
        this.sprite.depth = 6;
        this.add(this.sprite);
        this.player = player;

    }


    preUpdate(t, dt) { //Llamar despues en clases hijos
        let posEsp = this.player.controls.projectileAngle();
        let ang = posEsp.angle();
        this.rotation = ang;
    }
}


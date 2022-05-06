export default class ProjectileBar extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
        super(scene, x, y, 100, 15, 0xff0000)
    }

    actualiza(porcentaje) {
        this.width = porcentaje;
        if (porcentaje == 100)
            this.fillColor += 1000;
        else
            this.fillColor = 0xff0000;

    }
}
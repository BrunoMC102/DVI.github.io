import WaveProjectile from "../proyectile/waveProyectile.js";
import Archer from "./archer.js";

export default class ArcherVariante extends Archer{
    constructor(scene, player, x, y) {
        super(scene,player,x,y);
    }
    creador() {
        return new WaveProjectile(this.scene, this.centerX() + this.dispOffset, this.centerY(), this.fireDirection.x * this.Pv, this.fireDirection.y * this.Pv, 10, this.projectileDamage);
    }
}
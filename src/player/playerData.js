import ProjectileBar from "../projectileBar.js";
export default class PlayerData{
    constructor(){
      this.speed = 300;
      this.vSpeed = 300;
      this.jumpSpeed = -400;
      this.health = 6;
      this.damage = 10;
      
      this.money = 0; // dinero del jugador
      this.healthPotions = 0; // pociones de vida
      this.manaPotions = 0; // pociones de mana

      //Informacion proyectiles
      this.projectileBaseSpeed = 500;
      this.projectileSpeed = this.projectileBaseSpeed;
      this.projectileMaxSpeed = 1000;
      this.arrows = 100;
      this.flickerTime = 0;

      this.player = null;
    }

    wallColl(){
        if (this.player.scene.layers != undefined){
          this.player.scene.layers.forEach( a => {this.player.scene.physics.add.collider(this.player.projectile, a, (o1,o2) => {
            o1.destroy();
            })});
        }
    }
}
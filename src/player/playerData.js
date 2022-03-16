import ProjectileBar from "./projectileBar.js";
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
      this.mana = 0;
      //Informacion proyectiles
      this.projectileBaseSpeed = 500;
      this.projectileSpeed = this.projectileBaseSpeed;
      this.projectileMaxSpeed = 1000;
      this.arrows = 100;
      this.flickerTime = 0;
      this.maxMana = 100;
      this.player = null;
      this.projectileGroups = [() => {return {id: 'nWall', grupo: this.player.WallCollGroup}}, () => {return {id:"enemiesColl", grupo: this.player.EnemiesCollGroup}}];
      //this.projectileGroups = [];
      this.projectileEffects = [/*(enemy) => {enemy.freeze()}*/];

    }

    setBouncy(){
      this.projectileGroups = this.projectileGroups.filter((a)=> a().id != 'nWall');
      this.projectileGroups.push(() => {return {id: "bouncy", grupo:this.player.WallCollGroup_noEff}});
    }

    setSpectral(){
      this.projectileGroups = this.projectileGroups.filter(a=>a().id != 'nWall');
    }
}
import ProjectileBar from "./projectileBar.js";
export default class PlayerData{
    constructor(){
      this.speed = 300;
      this.vSpeed = 300;
      this.jumpSpeed = -400;
      this.health = 6;
      this.damage = 5;
      
      this.money = 5; // dinero del jugador
      this.healthPotions = 50; // pociones de vida
      this.manaPotions = 50; // pociones de mana
      this.mana = 0;
      //Informacion proyectiles
      this.projectileBaseSpeed = 500;
      this.projectileSpeed = this.projectileBaseSpeed;
      this.projectileMaxSpeed = 1000;
      this.arrows = 100;
      this.flickerTime = 0;
      this.maxMana = 100;
      this.player = null;
      this.weapon = 0;
      this.projectileGroups = [() => {return {id: 'nWall', grupo: this.player.WallCollGroup}}, () => {return {id:"enemiesColl", grupo: this.player.EnemiesCollGroup}}];
      //this.projectileGroups = [];
    
      this.projectileEffects = [];
      this.isPadControlling = false;
      this.dashSpeed = 900;
      this.dashInvincibilityPower = false;
      this.currentManaCost = 5;
      this.minimapUnlock = true;
    }

    setBouncy(){
      this.projectileGroups = this.projectileGroups.filter((a) => a().id != 'nWall');
      this.projectileGroups.push(() => {return {id: "bouncy", grupo:this.player.WallCollGroup_noEff}});
    }

    setSpectral(){
      this.projectileGroups = this.projectileGroups.filter(a=>a().id != 'nWall');
    }
}
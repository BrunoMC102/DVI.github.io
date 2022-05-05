import ProjectileBar from "./projectileBar.js";
export default class PlayerData {
  constructor() {

    //Atributos generales
    this.damage = 1000;
    
    this.isPadControlling = false;
    this.progressStory = 3;
    this.wins = 0;
    this.deaths = 0;
    this.keys = 1;
    this.maxSpeed = 750;

    //Recursos jugador
    this.health = 6;
    this.maxhealth = 6;
    this.money = 10; // dinero del jugador
    this.healthPotions = 50; // pociones de vida
    this.manaPotions = 50; // pociones de mana
    this.mana = 0;
    this.arrows = 100;
    this.maxMana = 100;

    //Atributos topdown
    this.projectileBaseSpeed = 500;
    this.speed = 400;
    this.projectileSpeed = this.projectileBaseSpeed;
    this.projectileMaxSpeed = 1000;
    this.flickerTime = 0;
    this.weapon = 0;
    this.dashSpeed = 900;  //Topdown
    this.dashDuration = 0.13;
    this.dashCoolDown = 0.8;
    this.minDashCooldown = 0.3;
    this.dashInvincibilityPower = false;
    this.currentManaCost = 5;
    this.minimapUnlock = false;


    //Atributos scroll
    this.scrollSpeed = 400;
    this.dashVelocity = 975;
    this.doubleJump = true;
    this.scrollDash = true;
    this.scrollBoxes = true;
    // Aceleraciones vertical y horizontal 
    
    this.hAcc = 2000;
   
    

    //UI related
    this.isSoundMuted = false;
    this.firstDialogBlacksmith = false;
    this.arrowHelp = true;


    this.player = null;
    this.projectileGroups = [() => { return { id: 'nWall', grupo: this.player.WallCollGroup } }, () => { return { id: "enemiesColl", grupo: this.player.EnemiesCollGroup } }, () => { return { id: "nVoid", grupo: this.player.VoidCollGroup } }];
    this.projectileEffects = [];
  }

  setBouncy() {
    this.projectileGroups = this.projectileGroups.filter((a) => a().id != 'nWall');
    this.projectileGroups.push(() => { return { id: "bouncy", grupo: this.player.WallCollGroup_noEff } });
  }

  setSpectral() {
    this.projectileGroups = this.projectileGroups.filter(a => a().id != 'nWall');
  }

  win(){
    let power = 0;
    this.wins++;
    if(this.keys > this.progressStory){
      if(this.progressStory < 3){
        this.progressStory++;
        this.unlockPowers(this.progressStory);
        power = this.progressStory;
      }
    }
    this.keys = 0;
    this.winData();
    return power;
  }
  die(){
    this.deaths++;
    this.keys = 0;
    this.money -= 10;
    this.restartData();
  }

  unlockPowers(progress){
    switch (progress) {
      case 1:
        this.doubleJump = true
        break;
      case 2:
        this.scrollDash = true;
        break;
      case 3:
        this.scrollBoxes = true;
      default:
        break;
    }
  }

  winData(){
    this.health = this.maxhealth;
    this.money += 10;
    this.healthPotions = Math.max(1,this.healthPotions);
    this.manaPotions = Math.max(1,this.manaPotions);
    this.arrows = Math.max(20,this.arrows);
    this.weapon = 0;
    this.keys = 0;
  }

  restartData(){
    this.damage = 7;
    this.speed = 400;
    this.health = 6;
    this.maxhealth = 6;
    
    if(this.money < 0) this.money = 0; 
    this.healthPotions = 50; // pociones de vida
    this.manaPotions = 50; // pociones de mana
    this.mana = 0;
    this.arrows = 100;
    this.projectileBaseSpeed = 500;
    this.weapon = 0;
    this.dashDuration = 0.13;
    this.dashCoolDown = 0.8;
    this.dashInvincibilityPower = false;
    this.minimapUnlock = false;
    this.keys = 0;
    this.projectileGroups = [() => { return { id: 'nWall', grupo: this.player.WallCollGroup } }, () => { return { id: "enemiesColl", grupo: this.player.EnemiesCollGroup } }, () => { return { id: "nVoid", grupo: this.player.VoidCollGroup } }];
    this.projectileEffects = [];
  }

//PowerUps
  healthUp(){
    this.maxhealth++;
  }
  speedUp(cant){
    this.speed += cant;
    if(this.speed >= this.maxSpeed){
      this.speed = this.maxSpeed;
    }
  }
  progressObject(n){
    this.keys = Math.max(n, this.keys);
  }
  dashCoolDownUp(cant){
    this.dashCoolDown -= cant;
    if(this.dashCoolDown <= this.minDashCooldown){
      this.dashCoolDown = this.minDashCooldown;
    }
  }
  projectileBaseSpeedUp(cant){
    this.projectileBaseSpeed += cant;
    if(this.projectileBaseSpeed > this.projectileMaxSpeed){
      this.projectileBaseSpeed = this.projectileMaxSpeed;
    }
  }
  damageUp(cant){
    this.damage += cant;
  }
}
import Bouncy from "./bouncy.js"
import DamageUp from "./damageUp.js"
import DashCoolDownUp from "./dashCooldownUp.js"
import FreezeProjectiles from "./freezeProjectiles.js"
import HealthUp from "./healthUp.js"
import ProjectileBaseSpeedUp from "./projectileBaseSpeedUp.js"
import ProjectileInvincibilityDash from "./projectileInvincibilityDash.js"
import Spectral from "./spectral.js"
import SpeedUp from "./speedUp.js"


export default class PasivePowerUpList {
    constructor() {
         this.powerUpList = [Bouncy, FreezeProjectiles, ProjectileInvincibilityDash, Spectral, DamageUp, DashCoolDownUp, HealthUp, ProjectileBaseSpeedUp, SpeedUp]
         this.defaultPowerUp = HealthUp;
    }

  extractPowerUp(){
    if (this.powerUpList.length == 0)
        return this.defaultPowerUp;
    const rand = Math.floor(Math.random()*this.powerUpList.length);
    const newPowerUp = this.powerUpList[rand];
    this.powerUpList.splice(rand,1);
    return newPowerUp;
}
}
// export default class PasivePowerUpList {




//     static powerUpList = [
//     (scene,player,x,y)=>{new Bouncy(scene,player,x,y)},
//     (scene,player,x,y)=>{new FreezeProjectiles(scene,player,x,y)},
//     (scene,player,x,y)=>{new ProjectileInvincibilityDash(scene,player,x,y)},
//     (scene,player,x,y)=>{new Spectral(scene,player,x,y)}
//     ]

//     static defaultPowerUp = (scene,player,x,y) =>{new Bouncy(scene,player,x,y)}
    
//     static extractPowerUp(){
//         if (this.powerUpList.length == 0)
//             return this.defaultPowerUp;
//         const rand = Math.floor(Math.random()*this.powerUpList.length);
//         const newPowerUp = this.powerUpList[rand];
//         this.powerUpList.splice(rand,1);
//         return newPowerUp;
//     }
// }
import EnemyParent from './enemyParent.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class MimicChest extends EnemyParent{
  
 
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'chestUnopened');
    this.a = 1000;
    this.v = 50;
    this.active = false;
    this.awake = false;
    this.body.pushable = false;
    this.stealing = false;
    this.health = 60;
  }
  
  moveU(t,dt){
    if(!this.active) return;
    this.sprite.play("mimicChestSideAttack",true);
    //this.sprite.preUpdate(t,dt);
    this.resbala();
  }
  
  
  resbala(){
    this.a = 700
    let dx = this.player.x - this.x;
    let dy = this.player.y - this.y;
    let t = Math.abs(dx)+Math.abs(dy);
    let x = -this.body.velocity.x/600;
    let y = -this.body.velocity.y/600;
    this.body.setAcceleration(dx*this.a/t+x*this.a,dy*this.a/t+y*this.a);    
    this.body.setMaxVelocity(400,400);
    this.body.setBounce(1,1);
    if(dx < 0){
      this.sprite.flipX = true;
    }else {
      this.sprite.flipX = false;
    }
        
      

  }

  prediceA(ti,dt){
    
    let dx = this.player.x+this.player.body.velocity.x*dt/10 - this.x;
    let dy = this.player.y+this.player.body.velocity.y*dt/10 - this.y;
    let t = Math.abs(dx)+Math.abs(dy);
    
    let x = -this.body.velocity.x/600;
    let y = -this.body.velocity.y/600;
    this.body.setAcceleration(dx*this.a/t+x*this.a,dy*this.a/t+y*this.a);
    
    this.body.setMaxVelocity(300,300);
    this.body.setBounce(1,1);
    if(dx < 0){
      this.sprite.flipX = true;
    }else {
      this.sprite.flipX = false;
    }
  }

  prediceV(ti,dt){
    this.a = 200;
    let dx = this.player.x+this.player.body.velocity.x*dt/2 - this.x;
    let dy = this.player.y+this.player.body.velocity.y*dt/2 - this.y;
    let t = Math.abs(dx)+Math.abs(dy);
    
    this.body.setVelocity(dx*this.a/t,dy*this.a/t);
    
    this.body.setMaxVelocity(300,300);
    this.body.setBounce(1,1);
    if(dx < 0){
      this.sprite.flipX = true;
    }else {
      this.sprite.flipX = false;
    }
  }

  copia(){
    this.body.setVelocity(this.player.body.velocity.x,this.player.body.velocity.y);
    let dx = this.player.body.velocity.x;
    if(dx < 0){
      this.sprite.flipX = true;
    }else {
      this.sprite.flipX = false;
    }

  }

  invierte(){
    let dx = -this.player.body.velocity.x;
    this.body.setVelocity(-this.player.body.velocity.x,-this.player.body.velocity.y);
    if(dx < 0){
      this.sprite.flipX = true;
    }else {
      this.sprite.flipX = false;
    }
  }
  onCollisionWithPlayer(){
    if(this.active){
        super.onCollisionWithPlayer();
        this.steal();
        return;
    }
    if(this.awaking) return;
    this.awaking = true;
    this.awake = true;
    this.sprite.play("mimicChestAttack");
    this.scene.time.delayedCall(1000, ()=>{
        this.active = true;
        this.awaking = false;
    })
    
  }
  steal(){
    if(this.stealing) return;

    const objectStealed = this.player.steal()
    if(objectStealed != null){
      const imgStealed = new Phaser.GameObjects.Image(this.scene, 20, -30, objectStealed);
      this.add(imgStealed);
      this.stealing = true;
      this.scene.time.delayedCall(4000, () => {imgStealed.destroy(); this.stealing = false;});
    }
  }
  
  die() {
    this.sprite.play('mimicChestDie');
    this.deadCenter.x = this.centerX();
    this.deadCenter.y = this.centerY();
    this.body.destroy();
    this.preUpdate = () => { };
    if (this.cambio != undefined)
        this.cambio.remove();
    if (this.escambio != undefined)
        this.escambio.remove();
          
    this.scene.time.delayedCall(1500, () => {
        this.spawnMana();
        this.spawnLoot();
        this.destroy();
    })
  }
  
}
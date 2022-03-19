import Mana from "../decoracion/mana.js";
import Arrow from "../objetos_recogibles/consumibles/arrow.js";
import Coin from "../objetos_recogibles/consumibles/coin.js";
import Health from "../objetos_recogibles/consumibles/health.js";

/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class EnemyParent extends Phaser.GameObjects.Container {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   * 
   */
 
  constructor(scene, player, x, y, texture) {
    super(scene, x, y);
    this.c = false;
    this.damage = 1;
    this.player = player
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, false);
    this.body.allowGravity = false;
    this.scene.physics.add.collider(this, this.scene.wallLayer,()=>this.isCol());
    this.scene.physics.add.collider(this, this.scene.voidLayer,()=>this.isCol());
    this.body.useDamping = true;
    this.v = 150;
    this.scene.physics.add.collider(this, this.player, () => this.doDamage());
    this.health = 30;
    this.dead=false;
    //this.body.setCollideWorldBounds();
    // this.sprite = new Phaser.GameObjects.Sprite(scene,0,0, texture);
    this.sprite = scene.add.sprite(0,0, texture);
    this.add(this.sprite);
    
    //this.scene.add.existing(this.sprite);
    this.body.setSize(this.sprite.width,this.sprite.height);
    this.sprite.x = this.sprite.width/2;
    this.sprite.y = this.sprite.height/2;

    this.origTint = this.sprite.tint;
    
    const consumibles = [()=>new Coin(scene,player,this.x,this.y), ()=>new Health(scene,player,this.x,this.y),()=>new Arrow(scene,player,this.x,this.y)]
    this.consumible = consumibles[Math.floor(Math.random()*consumibles.length)];
    this.freezing = false;
    this.knockbackinfo = {
      move: ()=>{},
      knocking:false,
      knockEvent:null
    }
  }

  


  preUpdate(d,dt){
    if(this.freezing) return;

    if(this.knockbackinfo.knocking){
      this.attack(d,dt);
      return;
    }

    this.moveU(d,dt);
    this.attack(d,dt);
  }

  moveU(){}
    
  attack(){}

  doDamage(){
      this.player.hurt(this.damage);
  }
  
  isCol(){
      
  }

  hurt(damage){
    this.health -= damage;
    if(this.health <= 0){
      this.spawnMana();
      this.destroy();
      this.spawnLoot();
      
    }
  }

  spawnLoot(){
    if(Math.random() < 0.8){
      this.consumible();
    }
  }

  freeze(){
    if(this.freezing) return
    if(this.health <= 0) return;
    this.freezing = true;
    let v_x, v_y, a_x, a_y;
    this.sprite.stop();
    if(!this.knockbackinfo.knocking){
      v_x = this.body.velocity.x;
      v_y = this.body.velocity.y;
      a_x = this.body.acceleration.x;
      a_y = this.body.acceleration.y; 
    }
    else{
      v_x = 0;
      v_y = 0;
      a_x = 0;
      a_y = 0;
    }
    this.sprite.tint = 0x9265ff
    this.body.setVelocity(0,0);
    this.body.setAcceleration(0,0);
    this.scene.time.delayedCall(5000, ()=>{
      if (this.body != undefined){
        this.sprite.tint = this.origTint; 
        this.body.setVelocity(v_x,v_y); 
        this.body.setAcceleration(a_x,a_y); 
        this.freezing = false;
      }
    });

  }
    
  

  knockback(x,y,p){
    
    if(this.health <= 0) return;
    if(this.freezing) return;  
    if(this.knockbackinfo.knocking)
      this.knockbackinfo.knockEvent.remove()

    this.knockbackinfo.knocking = true;
    this.body.setBounce(0,0);
    const bounce = this.body.bounce
    const dir = new Phaser.Math.Vector2(x,y).normalize().scale(p);
    this.body.setVelocity(dir.x,dir.y);
    this.body.setAcceleration(0,0);
    this.body.setDrag(0.003);
    
    this.knockbackinfo.knockEvent = this.scene.time.delayedCall(300, ()=>{
      this.knockbackinfo.knocking = false;
      if(this.body != undefined){
        this.body.setVelocity(0,0);
        this.body.setDrag(1); 
        this.body.setBounce(bounce.x,bounce.y)
      }
    });
  }

  centerX(){
    return this.x + this.sprite.width/2
  }
  centerY(){
    return this.y + this.sprite.height/2
  }

  spawnMana(){
    let dir = new Phaser.Math.Vector2(1,0);
    for (let i = 0; i < 6; i++) {
      dir.rotate(Math.random()*2*Math.PI);
      new Mana(this.scene,this.centerX(),this.centerY(),dir.x*450,dir.y*450);
    }
    
  }
  
}

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
    this.v = 150;
    this.scene.physics.add.collider(this, this.player, () => this.doDamage());
    this.health = 30;
    //this.body.setCollideWorldBounds();
    this.sprite = new Phaser.GameObjects.Sprite(scene,0,0, texture);
    this.add(this.sprite);
    //this.scene.add.existing(this.sprite);
    this.body.setSize(this.sprite.width,this.sprite.height);
    this.sprite.x = this.sprite.width/2;
    this.sprite.y = this.sprite.height/2;

    this.origTint = this.sprite.tint;
    
    const consumibles = [()=>new Coin(scene,player,this.x,this.y), ()=>new Health(scene,player,this.x,this.y),()=>new Arrow(scene,player,this.x,this.y)]
    this.consumible = consumibles[Math.floor(Math.random()*consumibles.length)];
  }

  

  preUpdate(t,dt){
    
    this.moveU(t,dt);
    
  }

  moveU(){
    
  }
    
  doDamage(){
      this.player.hurt(this.damage);
  }
  
  isCol(){
      
  }

  hurt(damage){
    this.health -= damage;
    if(this.health <= 0){
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
    if(this.health > 0){
      const v_x = this.body.velocity.x;
      const v_y = this.body.velocity.y;
      const a_x = this.body.acceleration.x;
      const a_y = this.body.acceleration.y; 
      this.sprite.tint = 0x9265ff
      this.body.setVelocity(0,0);
      this.body.setAcceleration(0,0);
      let aux = this.preUpdate;
      this.preUpdate = () =>{};
      this.scene.time.delayedCall(5000, ()=>{this.sprite.tint = this.origTint; this.preUpdate = aux; this.body.setVelocity(v_x,v_y); this.body.setAcceleration(a_x,a_y)});

    }
  }

}

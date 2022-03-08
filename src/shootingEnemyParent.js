import Basic_projectile from './basic_projectile.js';
import EnemyParent from './enemyParent.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class ShootingEnemyParent extends EnemyParent{
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemy');
    this.projectileE;
    this.cont = 0;
    this.cl = Phaser.Physics.Arcade.Image;
    //this.projectilesE = this.scene.physics.add.group({
    //    classType: Phaser.Physics.Arcade.Image,
    //})
    this.shootTime = 5;
    this.Pv = 1000; //Projectile speed
    this.projectilesE = this.scene.physics.add.group({
      classType: this.cl,
    })
  }



 


  fire(){
    

    //this.projectileE = this.projectilesE.get(this.x,this.y,'flecha');


    this.creador();
    this.scene.physics.add.collider(this.projectileE, this.player, (o1,o2) => {
    o1.destroy();
    this.player.hurt(this.damage)
    });

    this.wallColl();

    /*this.projectileE.setCollideWorldBounds(true);
    this.projectileE.body.onWorldBounds = true;
    this.projectileE.body.world.on('worldbounds', () => {
        this.projectileE.destroy();
        },this);*/
    
    this.setInitialVelocity();
    //this.projectileE.rotation =   Math.atan2(dx/t,dy/t) + 180;
    }
  
  wallColl(){
    
    if (this.scene.layers != undefined){
        this.scene.layers.forEach( a => {this.scene.physics.add.collider(this.projectileE, a, (o1,o2) => {
            o1.destroy();
            })});
    }
  }

  moveU(d,dt){
    this.attack(d,dt);
  }

  creador(){
    this.projectileE = new Basic_projectile(this.scene,this.x,this.y,'flecha');
  }

  attack(d,dt){
      if (this.cont === 0){
        this.fire();
      }
      this.cont+=dt;
      if(this.cont >= this.shootTime*1000){
            this.cont = 0;
      }
   }
  
   setInitialVelocity(){
    let dx = this.player.x - this.x;
    let dy = this.player.y - this.y;
    let t = Math.abs(dx)+Math.abs(dy);
     this.projectileE.body.setVelocity(dx*this.Pv/t,dy*this.Pv/t)
    }

  move(){

  }
}
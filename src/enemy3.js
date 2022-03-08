import EnemyParent from './enemyParent.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy3 extends EnemyParent{
  
 
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemy');
    this.a = 1000;
    this.v = 50;
    this.cont = 0;
    this.projectilesE = this.scene.physics.add.group({
        classType: Phaser.Physics.Arcade.Image,
        
    })
    this.Pv = 1000;
    //this.body.setMass(100000);
  }


  fire(){
    let dx = this.player.x - this.x;
    let dy = this.player.y - this.y;
    let t = Math.abs(dx)+Math.abs(dy);

    this.projectileE = this.projectilesE.get(this.x,this.y,'flecha');
    
    this.scene.physics.add.overlap(this.projectileE, this.player, (o1,o2) => {
      o1.destroy();
      this.player.hurt(this.damage)
      });
        
    if (this.scene.layers != undefined){
        this.scene.layers.forEach( a => {this.scene.physics.add.collider(this.projectileE, a, (o1,o2) => {
            o1.destroy();
            })});
    }
    
    this.projectileE.setCollideWorldBounds(true);
    this.projectileE.body.onWorldBounds = true;
    this.projectileE.body.world.on('worldbounds', () => {
        this.projectileE.destroy();
        },this);
    this.projectileE.body.allowGravity = false;
    this.projectileE.setVelocity(dx*this.Pv/t,dy*this.Pv/t); 
    //this.projectileE.rotation =   Math.atan2(dx/t,dy/t) + 180;
    }
  
  
  moveU(d,dt){
    this.attack();
  }

  attack(){
      if (this.cont === 0){
        this.fire();
      }
      this.cont++;
      if(this.cont >= 1000){
            this.cont = 0;
      }
  }
  


  actualiza(d,dt){

  }
  
}
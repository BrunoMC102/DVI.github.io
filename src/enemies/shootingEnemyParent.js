import Basic_projectile from '../proyectile/basic_projectile.js';
import EnemyParent from './enemyParent.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class ShootingEnemyParent extends EnemyParent{
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemy');
    this.cont = 0;
    
    //this.projectilesE = this.scene.physics.add.group({
    //    classType: Phaser.Physics.Arcade.Image,
    //})
    this.shootTime = 5;
    this.Pv = 1000; //Projectile speed
    this.createGropus();
    
  }


  fire(){
    const disparo = this.creador();
    this.addtoGroups(disparo);
    }
  
  
  moveU(d,dt){
    this.attack(d,dt);
  }

  creador(){
    let dx = this.player.x - this.x;
    let dy = this.player.y - this.y;
    let t = Math.abs(dx)+Math.abs(dy);
    return new Basic_projectile(this.scene,this.centerX() , this.centerY(),'flecha',dx*this.Pv/t,dy*this.Pv/t);
  }


  addtoGroups(disparo){
    this.wallCollGroup.add(disparo);
    this.playerCollGroup.add(disparo);
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
  
  move(){

  }
  centerX(){
    return this.x + this.sprite.width/2
  }
  centerY(){
    return this.y + this.sprite.height/2
  }
  createGropus(){
    this.wallCollGroup = this.scene.add.group();
    this.scene.physics.add.collider(this.wallCollGroup, this.scene.wallLayer, (o1,o2) => {
      o1.destroy();
      });

    this.playerCollGroup = this.scene.add.group();
    this.scene.physics.add.collider(this.playerCollGroup, this.player, (o1,o2) => {
      o1.destroy();
      o2.hurt(this.damage);
      });
  }
}
import ShootingEnemyParent from './shootingEnemyParent.js';
import Homing_p from './homing_p.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy4 extends ShootingEnemyParent{
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemy');
    this.cl = Homing_p;
    this.projectilesE = this.scene.physics.add.group({
        classType: Homing_p,
      })
  }
  fire(){
    let dx = this.player.x - this.x;
    let dy = this.player.y - this.y;
    let t = Math.abs(dx)+Math.abs(dy);

    //this.projectileE = this.projectilesE.get(this.x,this.y,'flecha');
    this.projectileE = this.projectilesE.get(this.scene, this.x,this.y, 'flecha');
    this.scene.physics.add.collider(this.projectileE, this.player, () => {
    this.projectileE.destroy();
    this.player.hurt(this.damage)
    });

    this.wallColl();

    this.projectileE.body.allowGravity = false;
    
    //this.projectileE.rotation =   Math.atan2(dx/t,dy/t) + 180;
    }
}
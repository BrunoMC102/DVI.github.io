
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class EnemyParent extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
 
  constructor(scene, player, x, y, sprite) {
    super(scene, x, y, sprite);
    this.c = false;
    this.damage = 1;
    this.player = player
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, false);
    this.body.allowGravity = false;
    this.v = 150;
    this.scene.physics.add.collider(this, this.player, () => this.doDamage());
    //this.body.setCollideWorldBounds();
     
  }

  

  preUpdate(t,dt){
    super.preUpdate(t,dt);
    this.moveU(t,dt);
    
  }

  moveU(){
    
  }
    
  doDamage(){
      this.player.hurt(this.damage);
  }
  
  isCol(){

  }
}

import Star from '../star.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Container {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  
  

  constructor(scene, x, y,data) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    //this.body.setCollideWorldBounds();
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.body.setSize(this.body.width * 0.5, this.body.height * 0.8);
    this.body.offset.y = 20;
    this.body.offset.x = 25;
    this.body.setBounce(0,0.15);
    this.playerData = data;
    this.playerData.player = this;
    this.sprite = this.scene.add.sprite(0, 0,'characterScroll', 'walk-143.png');
    this.add(this.sprite);
    this.health_label = this.scene.add.text(this.scene.cameras.x, this.scene.cameras.y, "Health");
  }

  
  
  /*
   * Actualiza la UI con la vida actual
   */
  /*
  updateHealth() {
    this.label.text = 'Health ' + this.score;
  }
  */

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */

  
  preUpdate(t,dt) {
    
    if(this.cursors.up.isDown){
    if ( this.body.onFloor()) {
      //this.anims.chain(['jump', 'jumpfinal']);
      this.sprite.play('jump',true);
      this.body.setVelocityY(this.playerData.jumpSpeed);
      
    }
  }
    else {
     if (this.cursors.left.isDown) {
      if(this.body.onFloor()){
      this.sprite.play('walk', true);
      }else {
        this.sprite.play('jump',true);
      }
      this.body.setVelocityX(-this.playerData.speed);
      this.scaleX = -1;
      this.body.offset.x = 95;
      

    }
    else if (this.cursors.right.isDown) {
       if(this.body.onFloor()){
        this.sprite.play('walk', true);
        }else {
          this.sprite.play('jump',true);
        }
      this.body.setVelocityX(this.playerData.speed);
      this.scaleX = 1;
      this.body.offset.x = 35;
    }
    else {
      this.body.setVelocityX(0);
       this.sprite.play('stand');
    }
  }
  }
  
}

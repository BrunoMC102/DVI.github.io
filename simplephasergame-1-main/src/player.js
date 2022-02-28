import Star from './star.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  
  

  constructor(scene, x, y) {
    super(scene, x, y, 'characterScroll', 'walk-143.png');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.createAnimations();
    this.body.setSize(this.body.width * 0.5, this.body.height * 0.8);
    this.body.offset.y = 20;
    this.body.offset.x = 25;

  }

  setPlayerData(playerData) {
    this.speed = playerData.speed;
    this.vSpeed = playerData.vSpeed;
    this.jumpSpeed = playerData.jumpSpeed;
    this.health = playerData.health;
    this.label = this.scene.add.text(10, 10, "" + this.health);
  }

  getPlayerData(){
    return {speed:this.speed,vSpeed:this.vSpeed,health:this.health,jumpSpeed: this.jumpSpeed};
  }

  createAnimations() {
    this.scene.anims.create({key: 'stand', frames: [{ key: 'characterScroll', frame: 'walk-143.png'}], duration: -1});
    this.scene.anims.create({
    key: 'walk', 
    frames: this.anims.generateFrameNames('characterScroll',{ start: 143, end: 151,prefix: 'walk-',suffix: '.png'}),
    frameRate: 15,
    repeat: -1});

  }
  
  
  /**
   * Actualiza la UI con la vida actual
   */
  updateHealth() {
    this.label.text = 'Health ' + this.score;
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    if (this.cursors.up.isDown && this.body.onFloor()) {
      this.body.setVelocityY(this.jumpSpeed);
      
    }
    if (this.cursors.left.isDown) {
      this.anims.play('walk',true);
      this.body.setVelocityX(-this.speed);
      this.scaleX = -1;
      this.body.offset.x = 95;

    }
    else if (this.cursors.right.isDown) {
      this.anims.play('walk',true);
      this.body.setVelocityX(this.speed);
      this.scaleX = 1;
      this.body.offset.x = 35;
    }
    else {
      this.body.setVelocityX(0);
      this.anims.play('stand');
    }
  }
  
}

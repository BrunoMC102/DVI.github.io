
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

  constructor(scene, x, y, data) {
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
    //this.body.setBounce(0, 0.15);
    this.playerData = data;
    this.playerData.player = this;
    this.sprite = this.scene.add.sprite(0, 0, 'characterScroll', 'walk-143.png');
    this.add(this.sprite);
    this.health_label = this.scene.add.text(this.scene.cameras.x, this.scene.cameras.y, "Health");
    this.jumpTimer = 0;
    this.maxJumpTime = 125; // tiempo maximo de salto en ms 
    this.isJumping = false;
    this.stillJumping = true;
    this.body.setMaxVelocityY(975);
  }

  /*
   * Actualiza la UI con la vida actual
   */
  /*
  updateHealth() {
    this.label.text = 'Health ' + this.score;
  }*/

  //Preupdate con salto nuevo

  preUpdate(t, dt) {

    let somePressed = false;

    if (this.cursors.up.isDown) {

      if (this.body.onFloor()) {
        this.stillJumping = true;
        this.jumpTimer = 0;
        this.body.setAccelerationY(this.playerData.vAcc);
      }

      this.sprite.play('jump', true);

      if (this.jumpTimer >= this.maxJumpTime) {
        this.stillJumping = false;
        this.body.setAccelerationY(0);
        this.jumpTimer = 0;
      }
      else{
         this.jumpTimer += dt;
      }
        //this.anims.chain(['jump', 'jumpfinal']);
      somePressed = true;
    }
    else{
      if(this.stillJumping){
        this.body.setAccelerationY(0);
        this.stillJumping = false;
      }
    }
    if (this.cursors.left.isDown) {
      //this.body.setAccelerationY(-this.playerData.vAcc);
      if (this.body.onFloor()) {
        this.sprite.play('walk', true);
      } else {
        this.sprite.play('jump', true);
      }
      this.body.setVelocityX(-this.playerData.speed);
      this.scaleX = -1;
      this.body.offset.x = 95;
      somePressed = true;
    }
    if (this.cursors.right.isDown) {
      //this.body.setAccelerationY(-this.playerData.vAcc);
      if (this.body.onFloor()) {
        this.sprite.play('walk', true);
      } else {
        this.sprite.play('jump', true);
      }
      this.body.setVelocityX(this.playerData.speed);
      this.scaleX = 1;
      this.body.offset.x = 35;
      somePressed = true;
    }
    if(!somePressed){
      if (this.body.onFloor()) {
        this.sprite.play('stand', true);
        this.body.setAccelerationY(0);
      } else {
        this.sprite.play('jump', true);
      }
      this.body.setVelocityX(0);
      this.jumpTimer = 0;
    }
  }

  //Preupdate anterior con salto de Bruno

  /*preUpdate(t, dt) {

    if (this.cursors.up.isDown) {
      this.sprite.play('jump', true);
      if (this.jumpTimer < this.maxJumpTime) {
        if (this.body.onFloor()) {
          this.body.setAccelerationY(this.playerData.vAcc);
        }
        this.jumpTimer += dt + 2;
        //this.anims.chain(['jump', 'jumpfinal']);
      } else {
        this.body.setAccelerationY(-this.playerData.vAcc);
        if (this.body.onFloor()) {
          this.jumpTimer = 0;
        }
      }
    }
    else if (this.cursors.left.isDown) {
      this.body.setAccelerationY(-this.playerData.vAcc);
      if (this.body.onFloor()) {
        this.sprite.play('walk', true);
      } else {
        this.sprite.play('jump', true);
      }
      this.body.setVelocityX(-this.playerData.speed);
      this.scaleX = -1;
      this.body.offset.x = 95;
    }
    else if (this.cursors.right.isDown) {
      this.body.setAccelerationY(-this.playerData.vAcc);
      if (this.body.onFloor()) {
        this.sprite.play('walk', true);
      } else {
        this.sprite.play('jump', true);
      }
      this.body.setVelocityX(this.playerData.speed);
      this.scaleX = 1;
      this.body.offset.x = 35;
    }
    else {
      if (this.body.onFloor()) {
        this.sprite.play('stand', true);
        this.body.setAccelerationY(0);
      } else {
        this.sprite.play('jump', true);
        this.body.setAccelerationY(-this.playerData.vAcc);
      }
      this.body.setVelocityX(0);
      this.jumpTimer = 0;
    }
  }*/
}

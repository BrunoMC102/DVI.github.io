import PlayerPlatform from "./playerPlatform.js";

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
    this.body.setSize(this.body.width * 0.7, this.body.height * 1.3);
    this.body.offset.y = -25;
    this.body.offset.x = -22;
    //this.body.setBounce(0, 0.15);
    this.playerData = data;
    this.playerData.player = this;
    this.sprite = this.scene.add.sprite(0, 0, 'characterScroll', 'walk-143.png');
    this.add(this.sprite);
    this.jumpTimer = 0;
    this.maxJumpTime = 50; // tiempo maximo de salto en ms 
    this.isJumping = false;
    this.stillJumping = true;
    this.body.setMaxVelocityY(975);

    this.handleControls();
    if (this.playerData.isPadControlling) this.controls = this.padControls;
    else this.controls = this.keyboardControls;
    scene.input.keyboard.on('keydown', () => { this.controls = this.keyboardControls; this.playerData.isPadControlling = false });
    scene.input.gamepad.on(Phaser.Input.Gamepad.Events.BUTTON_DOWN, () => { this.controls = this.padControls; this.playerData.isPadControlling = true });

    this.dashing = false;
    this.doubleJumped = false;

    //Keys
    this.keyC = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.keyX = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    //Pressed buttons
    this.jumpPressed = false;
    this.dashPressed = false;
    this.boxCreated = false;
    this.boxPressed = false;
    this.maxPlatforms = 2;

    this.lastInput = 1;

    this.platforms = [];

    this.boxesGroup = this.scene.add.group();
    this.scene.physics.add.collider(this.boxesGroup, this.boxesGroup);

    //Audio
    this.upgradeAudio = this.scene.sound.add("upgrade");
  }

  
  restart(x, y, playerData){
    this.x = x;
    this.y = y;
    this.playerData = playerData;
  }

  givePasivoPowerUp(texture, titleString) {
    this.upgradeAudio.play();
    const objectPicked = new Phaser.GameObjects.Image(this.scene, 0, -50, texture);
    const background = new Phaser.GameObjects.Image(this.scene, this.scene.cameras.cameras[0].centerX, this.scene.cameras.cameras[0].centerY - 600, 'emptySign').setScrollFactor(0);
    background.scaleX = 2.5;
    this.scene.add.existing(background);
    //background.x -= background.width/2
    const title = this.scene.add.text(this.scene.cameras.cameras[0].centerX, this.scene.cameras.cameras[0].centerY - 600, titleString, { fontSize: 50 }).setScrollFactor(0);
    title.x -= title.width / 2;
    this.scene.tweens.add({
      targets: [title, background],
      y: this.scene.cameras.cameras[0].centerY - 430,
      duration: 1000,
      ease: 'Sine.easeInOut',
      repeat: 0,
      hold: 2000,
      yoyo: true
    })
    //this.scene.add(objectPicked);
    this.add(objectPicked);
    this.scene.time.delayedCall(4000, () => { objectPicked.destroy(); title.destroy(); background.destroy() });
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
    if (this.playerData.scrollDash) {
      this.controls.dashControl();
    }
    if (this.playerData.scrollBoxes) {
      this.controls.boxControl();
    }
    this.controls.movementcontrol(dt);
    if (this.body.onFloor()) {
      this.doubleJumped = false;
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

  progressObject(n){
    this.playerData.progressObject(n);
  }



  handleMovement(conditionUp, conditionLeft, conditionRight, dt) {


    let somePressed = false;

    if (conditionUp) {
      if (!this.jumpPressed) {
        if (this.body.onFloor()) {
          this.jumpPressed = true;
          this.stillJumping = true;
          this.jumpTimer = 0;
          // this.body.setAccelerationY(this.playerData.vAcc);
          this.sprite.play('jump', true);
          
          this.cancelDash();
        }
        else if (this.playerData.doubleJump) {
          if (!this.doubleJumped) {
            this.doubleJumped = true;
            this.jumpPressed = true;
            this.stillJumping = true;
            this.jumpTimer = 0;
            this.sprite.play('jump', true);
            this.cancelDash();
          }

        }
      }
      if (this.stillJumping) {
        if (this.jumpTimer >= this.maxJumpTime) {
          this.stillJumping = false;
          this.body.setVelocityY(-900);
          this.jumpTimer = 0;
        }
        else {
          this.jumpTimer += dt;
        }
      }

      //this.anims.chain(['jump', 'jumpfinal']);
      somePressed = true;
    }
    else {
      this.jumpPressed = false;
      if (this.stillJumping) {
        this.body.setVelocityY(-this.jumpTimer * 10 - 200);
        this.jumpTimer = 0;
        this.stillJumping = false;
      }
    }
    if(this.dashing) return;
    if (conditionLeft) {
      //this.body.setAccelerationY(-this.playerData.vAcc);
      if (this.body.onFloor()) {
        this.sprite.play('walk', true);
      } else {
        this.sprite.play('jump', true);
      }
      this.body.setVelocityX(-this.playerData.scrollSpeed);
      this.scaleX = -1;
      this.body.offset.x = 20;
      this.lastInput = -1;
      somePressed = true;
    }
    if (conditionRight) {
      //this.body.setAccelerationY(-this.playerData.vAcc);
      if (this.body.onFloor()) {
        this.sprite.play('walk', true);
      } else {
        this.sprite.play('jump', true);
      }
      this.body.setVelocityX(this.playerData.scrollSpeed);
      this.scaleX = 1;
      this.body.offset.x = -22;
      this.lastInput = 1;
      somePressed = true;
    }
    if (!conditionLeft && !conditionRight) {
      this.body.setVelocityX(0);
    }
    if (!somePressed) {
      if (this.body.onFloor()) {
        this.sprite.play('stand', true);
        this.body.setAccelerationY(0);
      } else {
        this.sprite.play('jump', true);
      }
    }
  }

  cancelDash(){
    if(this.dashing){
      this.dashing = false;
      this.body.setVelocityX(0);
    }
  }

  checkForDash(ControlCondition) {
    if (ControlCondition) {
      if (this.dashPressed) return;
      this.dashPressed = true;
    }
    else {
      this.dashPressed = false;
    }
    if (this.dashing) return;
    if (this.body.onFloor()) this.dashed = false;
    if (this.dashed) return;
    if (ControlCondition) {
      this.initiateDash()
    }
  }

  initiateDash() {
    this.dashing = true;
    this.dashed = true;
    this.body.setVelocity(this.playerData.dashVelocity * this.lastInput, 0);
    this.body.setAcceleration(0, 0);
    this.body.setAllowGravity(false);
    this.scene.time.delayedCall(300, () => { this.endDash() });
  }

  endDash() {
    this.dashing = false;
    this.body.setVelocityX(0);
    this.body.setAllowGravity(true);
  }


  handleBoxCreations(condition) {

    if (condition) {
      if (this.boxPressed) {
        return;
      }
      else {
        this.boxPressed = true;
      }
      if (this.boxCreated) {
        this.stopBox();
        this.boxCreated = false;
      }
      else {
        this.createBox();
        this.boxCreated = true;
      }
    }
    else {
      this.boxPressed = false;
    }
  }

  createBox() {
    this.platforms.length += 1;
    for (let i = this.platforms.length - 1; i > 0; i--) {
      this.platforms[i] = this.platforms[i - 1];
    }
    this.platforms[0] = new PlayerPlatform(this.scene, this.body.center.x + 10, this.body.center.y + 10, this.lastInput, this);
    this.boxesGroup.add(this.platforms[0]);
    if (this.platforms.length > this.maxPlatforms) {
      this.platforms.pop().destroy();
    }
  }

  stopBox() {
    this.platforms[0].stop();
  }

  handleControls() {
    this.keyboardControls = {

      movementcontrol: (dt) => {
        this.handleMovement(this.cursors.space.isDown, this.cursors.left.isDown, this.cursors.right.isDown, dt);
      },
      boxControl: () => {
        this.handleBoxCreations(this.keyX.isDown)
      },
      dashControl: () => {
        this.checkForDash(this.keyC.isDown);
      },
    };
    this.padControls = {
      movementcontrol: (dt) => {
        const pad = this.scene.input.gamepad.getPad(0);
        if (pad == undefined) return;
        this.handleMovement(pad.A, pad.leftStick.x < 0, pad.leftStick.x > 0, dt);
      },
      dashControl: () => {
        const pad = this.scene.input.gamepad.getPad(0);
        this.checkForDash(pad.R2 > 0);
      },
      boxControl: () => {
        const pad = this.scene.input.gamepad.getPad(0);
        this.handleBoxCreations(pad.Y);
      },
    };

  }
}

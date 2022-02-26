export default class PlayerTopDown extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */

    constructor(scene, x, y) {
      super(scene, x, y, 'character', 'idle1.png');
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setCollideWorldBounds();
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.body.allowGravity = false;
      this.immunity = 0;
      this.createAnimations();
    }

    setPlayerData(playerData) {
      this.speed = playerData.speed;
      this.vSpeed = playerData.vSpeed;
      this.health = playerData.health;
      this.label = this.scene.add.text(10, 10, "" + this.health);
    }
    
    getPlayerData(){
      return {speed:this.speed,vSpeed:this.vSpeed,health:this.health};
    }

    updateHealth() {
      this.label.text = 'Health: ' + this.health;
    }

    preUpdate(t,dt) {
      super.preUpdate(t,dt);
      if (this.cursors.up.isDown) {
        this.body.setVelocityY(-this.vSpeed);
        this.anims.play('idle-up');
      }
      else if (this.cursors.down.isDown) {
        this.body.setVelocityY(this.vSpeed);
        this.anims.play('idle-down');
      }
      else {
        this.body.setVelocityY(0);
      }
      if (this.cursors.left.isDown) {
        this.body.setVelocityX(-this.speed);
        this.anims.play('idle-left');
      }
      else if (this.cursors.right.isDown) {
        this.body.setVelocityX(this.speed);
        this.anims.play('idle-right');
      }
      else {
        this.body.setVelocityX(0);
      }
      if (this.immunity > 0)
        this.immunity -= dt;

      this.label.text = 'Health: ' + this.health;
    }
    hurt(damage){
      if (this.immunity <= 0){
        this.health -= damage;
        this.immunity = 1500;
      }

    }
    
    createAnimations() {
      this.scene.anims.create({key: 'idle-right', frames: [{ key: 'character', frame: 'idle1.png'}], duration: -1});
      this.scene.anims.create({key: 'idle-left', frames: [{ key: 'character', frame: 'idle2.png'}], duration: -1});
      this.scene.anims.create({key: 'idle-up', frames: [{ key: 'character', frame: 'idle3.png'}], duration: -1});
      this.scene.anims.create({key: 'idle-down', frames: [{ key: 'character', frame: 'idle4.png'}], duration: -1});
    }
  }
  
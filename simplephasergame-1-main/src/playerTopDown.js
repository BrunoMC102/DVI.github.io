export default class PlayerTopDown extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */


     
    constructor(scene, x, y) {
      super(scene, x, y, 'player');
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setCollideWorldBounds();
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.body.allowGravity = false;
      this.immunity = 0;
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
      }
      else if (this.cursors.down.isDown) {
        this.body.setVelocityY(this.vSpeed);
      }
      else {
        this.body.setVelocityY(0);
      }
      if (this.cursors.left.isDown) {
        this.body.setVelocityX(-this.speed);
      }
      else if (this.cursors.right.isDown) {
        this.body.setVelocityX(this.speed);
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
    
  }
  
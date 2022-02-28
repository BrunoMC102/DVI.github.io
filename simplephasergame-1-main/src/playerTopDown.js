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
      this.body.setSize(this.body.width * 0.5, this.body.height * 0.8);
      this.body.offset.y = 20;
      this.body.offset.x = 25;
      this.projectiles = this.scene.physics.add.group({
        classType: Phaser.Physics.Arcade.Image
      })
      this.damage = 10;
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
        this.anims.play('idle-side');
        this.scaleX = 1;
        this.body.offset.x = 25;
      }
      else if (this.cursors.right.isDown) {
        this.body.setVelocityX(this.speed);
        this.anims.play('idle-side');
        this.scaleX = -1;
        this.body.offset.x = 70;
      }
      else {
        this.body.setVelocityX(0);
      }
      if (this.immunity > 0)
        this.immunity -= dt;

      if(Phaser.Input.Keyboard.JustDown(this.cursors.space)){
        this.fire();
      }
      this.label.text = 'Health: ' + this.health;
    }
    hurt(damage){
      if (this.immunity <= 0){
        this.health -= damage;
        this.immunity = 1500;
      }

    }
    
    createAnimations() {
      this.scene.anims.create({key: 'idle-side', frames: [{ key: 'character', frame: 'idle1.png'}], duration: -1});
      this.scene.anims.create({key: 'idle-down', frames: [{ key: 'character', frame: 'idle2.png'}], duration: -1});
      this.scene.anims.create({key: 'idle-up', frames: [{ key: 'character', frame: 'idle3.png'}], duration: -1});
    }


    /*pColliders(){
      if (this.scene.enemies != undefined){
        this.scene.enemies.forEach( a => {this.scene.physics.add.collider(this.projectiles, a, () => {this.hurt(-100)})});
      }
    }*/

    fire(){
      
        this.projectile = this.projectiles.get(this.x,this.y,'flecha');

        if (this.scene.enemies != undefined){
          this.scene.enemies.forEach( a => {this.scene.physics.add.collider(this.projectile, a, () => {
            this.projectile.destroy();
            a.hurt(this.damage)})});
        }

        if (this.scene.layers != undefined){
          this.scene.layers.forEach( a => {this.scene.physics.add.collider(this.projectile, a, () => {
            this.projectile.destroy();
            })});
        }
        this.projectile.setCollideWorldBounds(true);
        this.projectile.body.onWorldBounds = true;
        this.projectile.body.world.on('worldbounds', () => {
          this.projectile.destroy();
          
        },this);


        this.projectile.body.allowGravity = false;
        let v = this.body.velocity.normalize().scale(1000);
        if (v.x == 0 && v.y == 0){
          this.body.facing;
          this.projectile.setVelocity(1000,0);
        }
        else
          this.projectile.setVelocity(v.x,v.y);
      }
    
      
  }
  
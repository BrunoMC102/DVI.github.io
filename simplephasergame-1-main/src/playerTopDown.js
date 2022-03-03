export default class PlayerTopDown extends Phaser.GameObjects.Container {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */

    constructor(scene, x, y) {
      super(scene, x, y);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setCollideWorldBounds();
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.body.allowGravity = false;
      this.immunity = 0;
      this.createAnimations();
      
      this.body.offset.x = -20;
      this.body.offset.y = -27;
      this.projectiles = this.scene.physics.add.group({
        classType: Phaser.Physics.Arcade.Image
      })
      this.sprite = new Phaser.GameObjects.Sprite(scene,0, 0,'character','idle1.png');
      this.add(this.sprite);
      this.body.setSize(this.body.width * 0.7, this.body.height * 1.2);
      this.damage = 10;
      this.projectileBaseSpeed = 500;
      this.projectileSpeed = this.projectileBaseSpeed;
      this.projectileMaxSpeed = 1000;
      
    }

    setPlayerData(playerData) {
      this.speed = playerData.speed;
      this.vSpeed = playerData.vSpeed;
      this.jumpSpeed = playerData.jumpSpeed;
      this.health = playerData.health;
      this.label = this.scene.add.text(10, 10, "" + this.health);
      this.plabel = this.scene.add.text(10, 30, "");
    }
    
    getPlayerData(){
      return {speed:this.speed,vSpeed:this.vSpeed,health:this.health,jumpSpeed: this.jumpSpeed};
    }

    updateHealth() {
      this.label.text = 'Health: ' + this.health;
    }
    preUpdate(t,dt) {
      if (this.cursors.up.isDown) {
        this.body.setVelocityY(-this.vSpeed);
        this.sprite.anims.play('idle-up');
      }
      else if (this.cursors.down.isDown) {
        this.body.setVelocityY(this.vSpeed);
        this.sprite.anims.play('idle-down');
      }
      else {
        this.body.setVelocityY(0);
      }
      if (this.cursors.left.isDown) {
        this.body.setVelocityX(-this.speed);
        this.sprite.anims.play('idle-side');
        this.sprite.scaleX = 1;
        //this.body.offset.x = 25;
      }
      else if (this.cursors.right.isDown) {
        this.body.setVelocityX(this.speed);
        this.sprite.anims.play('idle-side');
        this.sprite.scaleX = -1;
        //this.body.offset.x = 70;
      }
      else {
        this.body.setVelocityX(0);
      }
      if (this.immunity > 0)
        this.immunity -= dt;
      this.label.text = 'Health: ' + this.health;
      
      if(this.cursors.space.isDown){
        if (this.projectileSpeed < this.projectileMaxSpeed)
          this.projectileSpeed += dt/2
        else{
          this.projectileSpeed = this.projectileMaxSpeed
        }
        this.plabel.text = 'Projectile: ' + Math.floor((this.projectileSpeed-this.projectileBaseSpeed)*100/(this.projectileMaxSpeed-this.projectileBaseSpeed)) + '%';
      }
      if(Phaser.Input.Keyboard.JustUp(this.cursors.space)){
        this.fire();
        this.projectileSpeed = this.projectileBaseSpeed;
        this.plabel.text = '';
      }
      
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
          this.scene.enemies.forEach( a => {this.scene.physics.add.overlap(this.projectile, a, (o1, o2) => {
            o1.destroy();
            o2.hurt(this.damage)})});
        }

        if (this.scene.layers != undefined){
          this.scene.layers.forEach( a => {this.scene.physics.add.collider(this.projectile, a, (o1,o2) => {
            o1.destroy();
            })});
        }
        
        this.projectile.setCollideWorldBounds(true);
        this.projectile.body.onWorldBounds = true;
        this.projectile.body.world.on('worldbounds', (o1) => {
          o1.destroy();
          o1.gameObject.destroy();
        },this);


        this.projectile.body.allowGravity = false;
        let v = this.body.velocity.normalize().scale(this.projectileSpeed);
        if (v.x == 0 && v.y == 0){
          this.body.facing;
          this.projectile.setVelocity(this.projectileSpeed,0);
          this.projectile.setVelocity(this.getDirectionX() * this.projectileSpeed, this.getDirectionY() * this.projectileSpeed);
        }
        else
          this.projectile.setVelocity(v.x,v.y);
      }
      
          
        

      getDirectionX(){
        if(this.body.facing == Phaser.Physics.Arcade.FACING_RIGHT)
          return 1;
        if(this.body.facing == Phaser.Physics.Arcade.FACING_LEFT)
          return -1;
        return 0;
      }

      getDirectionY(){
        if(this.body.facing == Phaser.Physics.Arcade.FACING_UP)
          return -1;
        if(this.body.facing == Phaser.Physics.Arcade.FACING_DOWN)
          return 1;
        return 0;
      }
}
  
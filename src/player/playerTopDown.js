
import ProjectileBar from "../projectileBar.js";

export default class PlayerTopDown extends Phaser.GameObjects.Container {
  
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
      this.body.setCollideWorldBounds();
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.body.allowGravity = false;
      this.immunity = 0;

      this.createAnimations();
      this.playerData = data;
      this.playerData.player = this;
      this.body.offset.x = -23;
      this.body.offset.y = -27;
      this.projectiles = this.scene.physics.add.group({
        classType: Phaser.Physics.Arcade.Image
      })
      this.sprite = new Phaser.GameObjects.Sprite(scene,0, 0,'character','idle1.png');
      this.add(this.sprite);
      this.body.setSize(this.body.width * 0.75, this.body.height * 1.2);
      
      //Informacion del jugador por pantalla
      this.health_label = this.scene.add.text(10, 10, "");
      this.money_label = this.scene.add.text(10, 30, "");
      this.arrow_label = this.scene.add.text(10, 50, "");
      this.hPotion_label = this.scene.add.text(10, 70, "");
      this.mPotion_label = this.scene.add.text(10, 90, "");

      //Barra proyectiles
      this.projectileBar = new ProjectileBar(scene,0,70);
      this.add(this.projectileBar);
      this.projectileBar.setVisible(false);
      
      this.projectileCharging = false;
      this.origTint = this.sprite.tint;
      this.setPlayerData();
    }

    setPlayerData(playerData) {
      this.speed = 300;
      this.vSpeed = 300;
      this.jumpSpeed = -400;
      this.health = 6;
      this.damage = 10;
      
      
      this.money = 0; // dinero del jugador
      this.healthPotions = 0; // pociones de vida
      this.manaPotions = 0; // pociones de mana

      //Informacion proyectiles
      this.projectileBaseSpeed = 500;
      this.projectileSpeed = this.projectileBaseSpeed;
      this.projectileMaxSpeed = 1000;
      this.arrows = 100;
      this.flickerTime = 0;
    }
    
    
    updateHealth() {
      this.label.text = 'Health: ' + this.playerData.health;
    }
    preUpdate(t,dt) {


      
      if (this.cursors.up.isDown) {
        this.body.setVelocityY(-this.playerData.vSpeed);
        this.sprite.anims.play('idle-up');
      }
      else if (this.cursors.down.isDown) {
        this.body.setVelocityY(this.playerData.vSpeed);
        this.sprite.anims.play('idle-down');
      }
      else {
        this.body.setVelocityY(0);
      }
      if (this.cursors.left.isDown) {
        this.body.setVelocityX(-this.playerData.speed);
        this.sprite.anims.play('idle-side');
        this.sprite.scaleX = 1;
        //this.body.offset.x = 25;
      }
      else if (this.cursors.right.isDown) {
        this.body.setVelocityX(this.playerData.speed);
        this.sprite.anims.play('idle-side');
        this.sprite.scaleX = -1;
        //this.body.offset.x = 70;
      }
      else {
        this.body.setVelocityX(0);
      }

      //Handle movement controller
      const pad = this.scene.input.gamepad.getPad(0);
      if(pad != undefined){
        const dir = new Phaser.Math.Vector2(pad.leftStick.x,pad.leftStick.y);
        this.body.setVelocity(dir.normalize().scale(this.speed).x,dir.normalize().scale(this.playerData.speed).y);
      }

      if (this.immunity > 0)
        this.immunity -= dt;
      else
        this.displayColor = () => {};
      
      //Handle shooting keyboard
      if(this.arrows > 0){
        if(this.cursors.space.isDown){
          if (this.playerData.projectileSpeed < this.playerData.projectileMaxSpeed)
          this.playerData.projectileSpeed += dt/2
          else{
            this.playerData.projectileSpeed = this.playerData.projectileMaxSpeed
          }
          this.projectileBar.actualiza((this.playerData.projectileSpeed-this.playerData.projectileBaseSpeed)*100/(this.playerData.projectileMaxSpeed-this.playerData.projectileBaseSpeed));
          this.projectileBar.setVisible(true);
        }
        if(Phaser.Input.Keyboard.JustUp(this.cursors.space)){
          this.fire();
          this.playerData.projectileSpeed = this.playerData.projectileBaseSpeed;
          this.projectileBar.setVisible(false);
          this.playerData.arrows--
        }

        this.displayColor();
        this.flickerTime +=dt;
      }

      //Handle shooting controller
      if(pad != undefined){
        if(this.playerData.arrows > 0){
          if(pad.R2 > 0){
            if (this.playerData.projectileSpeed < this.playerData.projectileMaxSpeed)
            this.playerData.projectileSpeed += dt/2
            else{
              this.playerData.projectileSpeed = this.playerData.projectileMaxSpeed
            }
            this.projectileBar.actualiza((this.playerData.projectileSpeed-this.playerData.projectileBaseSpeed)*100/(this.playerData.projectileMaxSpeed-this.playerData.projectileBaseSpeed));
            this.projectileBar.setVisible(true);
            this.projectileCharging = true;
          }
          if(this.projectileCharging && pad.R2 == 0){
            this.fire();
            this.playerData.projectileSpeed = this.playerData.projectileBaseSpeed;
            this.projectileBar.setVisible(false);
            this.playerData.arrows--
            this.projectileCharging = false;
          }
        }
      }
      
      //Actualizacion informacion en pantalla
      this.health_label.text = 'Health: ' + this.playerData.health;
      this.money_label.text = 'Money: ' + this.playerData.money;
      this.arrow_label.text = 'Arrows: ' + this.playerData.arrows;
      this.mPotion_label.text = 'Mana Potions: ' + this.playerData.manaPotions;
      this.hPotion_label.text = 'Health Potions: ' + this.playerData.healthPotions;

    }

    

    hurt(damage){
      if (this.immunity <= 0){
        this.playerData.health -= damage;
        this.immunity = 1500;
        this.displayColor = this.flickering;
        this.flickerTime = -200;
        this.sprite.tint = 0xff0000;
      }
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

        this.playerData.wallColl();
        
        
        this.projectile.setCollideWorldBounds(true);
        this.projectile.body.onWorldBounds = true;
        this.projectile.body.world.on('worldbounds', (o1) => {
          o1.destroy();
          o1.gameObject.destroy();
        },this);

        const dimension = Math.min(this.projectile.body.width,this.projectile.body.height);
        this.projectile.body.setSize(dimension,dimension);

        this.projectile.body.allowGravity = false;
        
        let v = this.body.velocity.normalize().scale(this.playerData.projectileSpeed);
        if (v.x == 0 && v.y == 0){
          this.body.facing;
          this.projectile.setVelocity(this.playerData.projectileSpeed,0);
          this.projectile.setVelocity(this.getDirectionX() * this.playerData.projectileSpeed, this.getDirectionY() * this.playerData.projectileSpeed);
        }
        else
          this.projectile.setVelocity(v.x,v.y);
          let pad = this.scene.input.gamepad.getPad(0);

        
        if(pad != undefined){
          const dir = new Phaser.Math.Vector2(pad.rightStick.x,pad.rightStick.y);
          if (dir.x != 0 || dir.y != 0)
            this.projectile.setVelocity(dir.normalize().scale(this.playerData.projectileSpeed).x,dir.normalize().scale(this.playerData.projectileSpeed).y);
        }
        this.projectile.setRotation(this.projectile.body.velocity.angle());
      }
      
          
      

      setSpectral(){
        this.playerData.wallColl = ()=>{};
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

      flickering(){
        if(this.flickerTime >= 0){
          if(this.flickerTime < 200 ){
            this.sprite.tint = this.origTint;
            this.sprite.alpha = 1;
          }
          else {
            this.sprite.alpha = 0.3;
          }
          if(this.flickerTime > 400)
            this.flickerTime = 0;
        }
      }

      displayColor(){}
}
  

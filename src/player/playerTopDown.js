import PlayerProyectile from "../proyectile/playerProyectile.js";
import ProjectileBar from "./projectileBar.js";
import ManaBar from "./manaBar.js";
import SwordContainer from "./swordContainer.js";

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

      this.playerData = data;
      this.playerData.player = this;
      this.body.offset.x = -20;
      this.body.offset.y = -20;
      this.createGroups();
      this.WallCollGroup_noEff.add(this);
      this.VoidCollGroup_noEff.add(this);
      this.body.pushable = false;

      this.sprite = this.scene.add.sprite(0, 0,'character','idle-side.png');
      this.add(this.sprite);
      this.sprite.anims.play('idle-side');
      this.body.setSize(this.body.width * 0.60, this.body.height * 1);
      
      //Informacion del jugador por pantalla
      this.health_label = this.scene.add.text(10, 10, "");
      this.money_label = this.scene.add.text(10, 30, "");
      this.arrow_label = this.scene.add.text(10, 50, "");
      this.hPotion_label = this.scene.add.text(10, 70, "");
      this.mPotion_label = this.scene.add.text(10, 90, "");
      this.mana_label = this.scene.add.text(10, 110, "");
      //Barra proyectiles
      this.projectileBar = new ProjectileBar(scene,0,70);
      this.add(this.projectileBar);
      this.projectileBar.setVisible(false);
      this.sword = new SwordContainer(scene,0,0,this);
      this.add(this.sword);
      //Barra mana
      this.manaBar = new ManaBar(scene,115,140);
      
      
      this.projectileCharging = false;
      this.origTint = this.sprite.tint;
      this.flickerTime = 0;
      this.handleControls();
      if(this.playerData.control) this.controls = this.padControls;
      else this.controls = this.keyboardControls;
      scene.input.keyboard.on('keydown',  () => { this.controls = this.keyboardControls; this.playerData.control = false});
      
      scene.input.gamepad.on(Phaser.Input.Gamepad.Events.BUTTON_DOWN, () => {this.controls = this.padControls; this.playerData.control = true});
      this.R2_pressed = false;
    }
    
    
   
    preUpdate(t,dt) {


      this.controls.movementcontrol();
      
      //Handle movement controller
      
      if (this.immunity > 0)
        this.immunity -= dt;
      else
        this.displayColor = () => {};
      
      if(this.playerData.weapon == 0){
        this.controls.swordControl();
      }
      //Handle shooting keyboard
      if(this.playerData.weapon == 1){
        if(this.playerData.arrows > 0){
          this.controls.projectileControl(dt);
        }
      }

      this.displayColor();
      this.flickerTime +=dt;
      
      
      //Actualizacion informacion en pantalla
      this.health_label.text = 'Health: ' + this.playerData.health;
      this.money_label.text = 'Money: ' + this.playerData.money;
      this.arrow_label.text = 'Arrows: ' + this.playerData.arrows;
      this.mPotion_label.text = 'Mana Potions: ' + this.playerData.manaPotions;
      this.hPotion_label.text = 'Health Potions: ' + this.playerData.healthPotions;
      this.mana_label.text = 'Mana: ' + this.playerData.mana;
      this.manaBar.actualiza(this.playerData.mana, this.playerData.maxMana);

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
        let vx,vy;
        let v = this.body.velocity.normalize().scale(this.playerData.projectileSpeed);
        if (v.x == 0 && v.y == 0){
          
          vx = this.getDirectionX() * this.playerData.projectileSpeed
          vy = this.getDirectionY() * this.playerData.projectileSpeed
        }
        else{
          vx = v.x
          vy = v.y
        }
        let pad = this.scene.input.gamepad.getPad(0);
        if(pad != undefined){
          const dir = new Phaser.Math.Vector2(pad.rightStick.x,pad.rightStick.y);
          if (dir.x != 0 || dir.y != 0){
            vx = dir.normalize().scale(this.playerData.projectileSpeed).x;
            vy = dir.normalize().scale(this.playerData.projectileSpeed).y;
          }
        }


        this.projectile = new PlayerProyectile(this.scene,this.x,this.y,vx,vy);
        this.playerData.projectileGroups.forEach(element => {
            element().grupo.add(this.projectile);
        });
        

      }
      
          
      

      setSpectral(){
        this.playerData.setSpectral();
      }
      
      setBouncy(){
        
        this.playerData.setBouncy();
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
      
      createGroups(){
        this.WallCollGroup = this.scene.add.group();
        this.scene.physics.add.collider(this.WallCollGroup, this.scene.wallLayer, (o1,o2) => {o1.dest()});
        this.EnemiesCollGroup = this.scene.add.group();
        this.scene.physics.add.overlap(this.EnemiesCollGroup, this.scene.enemies, (o1,o2) => {
           o2.hurt(this.playerData.damage);
           this.playerData.projectileEffects.forEach(element => {element(o2)});
           o2.knockback(o1.body.velocity.x,o1.body.velocity.y,400);
           o1.dest()});

        this.WallCollGroup_noEff = this.scene.add.group();
        this.scene.physics.add.collider(this.WallCollGroup_noEff, this.scene.wallLayer, ()=>{});
        this.VoidCollGroup_noEff = this.scene.add.group();
        this.scene.physics.add.collider(this.VoidCollGroup_noEff, this.scene.voidLayer, ()=>{});
      }
      giveMana(){
        if(this.playerData.mana >= this.playerData.maxMana) return;
        this.playerData.mana++;

      }

      handleControls(){
        this.keyboardControls = {
          projectile: "spacebar",
          movementcontrol: () => {
            if (this.cursors.up.isDown) {
              this.body.setVelocityY(-this.playerData.vSpeed);
              this.sprite.anims.play('walk-up',true);
            }
            else if (this.cursors.down.isDown) {
              this.body.setVelocityY(this.playerData.vSpeed);
              this.sprite.anims.play('walk-down',true);
            }
            else if (this.cursors.left.isDown) {
              this.body.setVelocityX(-this.playerData.speed);
              this.sprite.anims.play('walk-side',true);
              this.sprite.scaleX = -1;
            }
            else if (this.cursors.right.isDown) {
              this.body.setVelocityX(this.playerData.speed);
              this.sprite.anims.play('walk-side',true);
              this.sprite.scaleX = 1;
            }
            else {
              this.body.setVelocityX(0);
              this.body.setVelocityY(0);
              const parts = this.sprite.anims.currentAnim.key.split('-');
              parts[0] = 'idle';
              this.sprite.anims.play(parts.join('-'));
            }    
          },
          projectileControl: (dt) => {
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
          },
          swordControl:() =>{
            if(Phaser.Input.Keyboard.JustDown(this.cursors.space)){
              this.sword.attack();
            }
          }
        };
        this.padControls = {

          projectile: "R1",
        
          movementcontrol: () => {
            const pad = this.scene.input.gamepad.getPad(0);
            if(pad == undefined) return;

            const dir = new Phaser.Math.Vector2(pad.leftStick.x,pad.leftStick.y);
            this.body.setVelocity(dir.normalize().scale(this.playerData.speed).x,dir.normalize().scale(this.playerData.speed).y);
            if(dir.x == 0 && dir.y == 0){
              this.sprite.stop();
              return;
            }
            if(Math.abs(dir.x) > Math.abs(dir.y)){
              this.sprite.anims.play('walk-side',true);
              if (dir.x > 0) this.sprite.scaleX = 1;
              else this.sprite.scaleX = -1;
              return;
            }
            if (dir.y > 0) this.sprite.anims.play('idle-down',true);
            else this.sprite.anims.play('idle-up',true);
          },

          projectileControl: (dt) =>{
            const pad = this.scene.input.gamepad.getPad(0);
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
          },
          swordControl:()=>{
            if(pad.R2 > 0){
              if(this.R2_pressed) return;
              this.sword.attack();
              this.R2_pressed = true;
            }
            else{
              if(!this.R2_pressed) return;
              this.R2_pressed = false
            }
          }

        };
      }

}
  

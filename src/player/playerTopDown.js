import PlayerProyectile from "../proyectile/playerProyectile.js";
import ProjectileBar from "./projectileBar.js";
import ManaBar from "./manaBar.js";
import SwordContainer from "./swordContainer.js";
import Bow from "./bow.js";
import Spell from "../proyectile/spell.js";

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
    this.key1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.key3 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.keyC = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    
    this.body.allowGravity = false;
    this.immunity = 0;

    this.playerData = data;
    this.playerData.player = this;
    this.body.offset.x = -20;
    this.body.offset.y = -20;
    this.createGroups();
    this.WallCollGroup_noEff.add(this);
    this.VoidCollGroup_noEff.add(this);
    this.playerWithProjectilesCollider.add(this);
    this.body.pushable = false;

    this.sprite = this.scene.add.sprite(0, 0, 'character', 'idle-side.png');
    this.add(this.sprite);
    this.sprite.anims.play('idle-side');
    this.body.setSize(this.body.width * 0.60, this.body.height * 1);
    this.isDead = false;

    //Informacion del jugador por pantalla
    this.health_label = this.scene.add.text(10, 10, "");
    this.money_label = this.scene.add.text(10, 30, "");
    this.arrow_label = this.scene.add.text(10, 50, "");
    this.hPotion_label = this.scene.add.text(10, 70, "");
    this.mPotion_label = this.scene.add.text(10, 90, "");
    this.mana_label = this.scene.add.text(10, 110, "");
    //Barra proyectiles
    this.projectileBar = new ProjectileBar(scene, 0, 70);
    this.add(this.projectileBar);
    this.projectileBar.setVisible(false);
    this.sword = new SwordContainer(scene, 0, 0, this);
    this.bow = new Bow(scene,0,0,this);
    this.add(this.sword);
    this.add(this.bow);

    if(this.playerData.weapon == 0){
      this.sword.setVisible(true);
    }
    else if(this.playerData.weapon == 1){
      this.bow.setVisible(true);
    }
    //Barra mana
    this.manaBar = new ManaBar(scene, 115, 140);


    this.projectileCharging = false;
    this.origTint = this.sprite.tint;
    this.flickerTime = 0;
    this.dashing = false;
    this.inDashDelay = false;
    this.handleControls();
    if (this.playerData.control) this.controls = this.padControls;
    else this.controls = this.keyboardControls;
    scene.input.keyboard.on('keydown', () => { this.controls = this.keyboardControls; this.playerData.control = false });

    scene.input.gamepad.on(Phaser.Input.Gamepad.Events.BUTTON_DOWN, () => { this.controls = this.padControls; this.playerData.control = true });
    this.R2_pressed = false;
    this.lastVelocity = new Phaser.Math.Vector2(0,0);
  }




  preUpdate(t, dt) {

    if(!this.dashing){

      this.controls.movementcontrol();

      if (this.playerData.weapon == 0) {
        this.controls.swordControl();
      }
      
      if (this.playerData.weapon == 1) {
        if (this.playerData.arrows > 0) {
          this.controls.projectileControl(dt);
        }
      }

      if(this.playerData.weapon == 2){
        if(this.playerData.currentManaCost <= this.playerData.mana){
          this.controls.spellControl();
        }
      }
      this.controls.dashControl();

    }
    else
      this.dash();
    
    if (this.immunity > 0)
      this.immunity -= dt;
    else
      this.displayColor = () => {};

    
    this.controls.selectWeapon();
    this.displayColor();
    this.flickerTime += dt;


    if(this.body.velocity.x != 0 || this.body.velocity.y != 0){
      this.lastVelocity = new Phaser.Math.Vector2(this.body.velocity.x, this.body.velocity.y);
    }
    //Actualizacion informacion en pantalla
    this.health_label.text = 'Health: ' + this.playerData.health;
    this.money_label.text = 'Money: ' + this.playerData.money;
    this.arrow_label.text = 'Arrows: ' + this.playerData.arrows;
    this.mPotion_label.text = 'Mana Potions: ' + this.playerData.manaPotions;
    this.hPotion_label.text = 'Health Potions: ' + this.playerData.healthPotions;
    this.mana_label.text = 'Mana: ' + this.playerData.mana;
    this.manaBar.actualiza(this.playerData.mana, this.playerData.maxMana);

    if (this.playerData.health <= 0 && !this.isDead) {
      this.isDead = true;
      this.sprite.anims.play('death');
    }
    
  }



  hurt(damage) {
    if(this.playerData.health <= 0){
      
      this.scene.finishGame();
      

    }else if (this.immunity <= 0) {
      this.playerData.health -= damage;
      this.immunity = 1500;
      this.displayColor = this.flickering;
      this.flickerTime = -200;
      this.sprite.tint = 0xff0000;
    }
  }



  fire() {
    const projectileVector = this.controls.projectileAngle();
    this.projectile = new PlayerProyectile(this.scene, this.x, this.y, projectileVector.x, projectileVector.y);
    this.playerData.projectileGroups.forEach(element => {
      element().grupo.add(this.projectile);
    });
  }

  spellFire(){
    const projectileVector = this.controls.projectileAngle();
    this.projectile = new Spell(this.scene, this.x, this.y, projectileVector.x, projectileVector.y,10, this.playerData.damage);
  }

  dash(){
    if(this.dashing){
      this.body.velocity = this.dashVelocity;
    }
  }

  initiateDash(){
    this.dashVelocity = this.lastVelocity;
    this.dashVelocity.normalize().scale(this.playerData.dashSpeed);
    this.dashing = true;
    this.inDashDelay = true;
    if (this.playerData.dashInvincibilityPower)
      this.playerWithProjectilesCollider.remove(this);
    this.scene.time.delayedCall(130, ()=>{
      if(this.playerData.dashInvincibilityPower)
        this.playerWithProjectilesCollider.remove(this);
      this.dashing = false; 
    })
    this.scene.time.delayedCall(400, ()=>{
      this.playerWithProjectilesCollider.add(this);
      this.inDashDelay = false; 
    })
    
  }

  setSpectral() {
    this.playerData.setSpectral();
  }

  setBouncy() {

    this.playerData.setBouncy();
  }

  getDirectionX() {
    if (this.body.facing == Phaser.Physics.Arcade.FACING_RIGHT)
      return 1;
    if (this.body.facing == Phaser.Physics.Arcade.FACING_LEFT)
      return -1;
    return 0;
  }

  getDirectionY() {
    if (this.body.facing == Phaser.Physics.Arcade.FACING_UP)
      return -1;
    if (this.body.facing == Phaser.Physics.Arcade.FACING_DOWN)
      return 1;
    return 0;
  }

  flickering() {
    if (this.flickerTime >= 0) {
      if (this.flickerTime < 200) {
        this.sprite.tint = this.origTint;
        this.sprite.alpha = 1;
      }
      else {
        this.sprite.alpha = 0.3;
      }
      if (this.flickerTime > 400)
        this.flickerTime = 0;
    }
  }

  displayColor() { }

  createGroups() {
    this.WallCollGroup = this.scene.add.group();
    this.scene.physics.add.collider(this.WallCollGroup, this.scene.wallLayer, (o1, o2) => {o1.dest()});
    this.EnemiesCollGroup = this.scene.add.group();
    this.scene.physics.add.overlap(this.EnemiesCollGroup, this.scene.enemies, (o1, o2) => {
      o2.hurt(this.playerData.damage);
      this.playerData.projectileEffects.forEach(element => { element(o2) });
      o2.knockback(o1.body.velocity.x, o1.body.velocity.y, 400);
      o1.dest()
    });

    this.WallCollGroup_noEff = this.scene.add.group();
    this.scene.physics.add.collider(this.WallCollGroup_noEff, this.scene.wallLayer, () => { });
    this.VoidCollGroup_noEff = this.scene.add.group();
    this.scene.physics.add.collider(this.VoidCollGroup_noEff, this.scene.voidLayer, () => { });
    this.playerWithProjectilesCollider = this.scene.add.group();
    this.scene.physics.add.overlap(this.playerWithProjectilesCollider, this.scene.projectiles, (o1,o2) => {
      o1.hurt(o2.damage);
      o2.destroy();
      });
  }
 

  giveMana() {
    if (this.playerData.mana >= this.playerData.maxMana) return;
    this.playerData.mana++;

  }

  handleControls() {
    this.keyboardControls = {
      projectile: "spacebar",
      movementcontrol: () => {
        if (this.cursors.up.isDown || this.cursors.down.isDown || this.cursors.left.isDown || this.cursors.right.isDown) {
          if (this.cursors.up.isDown) {
            this.body.setVelocityY(-this.playerData.vSpeed);
            this.sprite.anims.play('walk-up', true);
          }
          else if (this.cursors.down.isDown) {
            this.body.setVelocityY(this.playerData.vSpeed);
            this.sprite.anims.play('walk-down', true);
          }
          else {
            this.body.setVelocityY(0);
          }
          if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.playerData.speed);
            this.sprite.anims.play('walk-side', true);
            this.sprite.scaleX = -1;
          }
          else if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.playerData.speed);
            this.sprite.anims.play('walk-side', true);
            this.sprite.scaleX = 1;
          }
          else {
            this.body.setVelocityX(0);
          }
        }
        else {
          this.body.setVelocityX(0);
          this.body.setVelocityY(0);
          if (this.playerData.health > 0 && !this.isDead) {
            const parts = this.sprite.anims.currentAnim.key.split('-');
            parts[0] = 'idle';
            this.sprite.anims.play(parts.join('-'));
          }
        }
      },
      projectileControl: (dt) => {
        if (this.cursors.space.isDown) {
          if (this.playerData.projectileSpeed < this.playerData.projectileMaxSpeed)
            this.playerData.projectileSpeed += dt / 2
          else {
            this.playerData.projectileSpeed = this.playerData.projectileMaxSpeed
          }
          this.projectileBar.actualiza((this.playerData.projectileSpeed - this.playerData.projectileBaseSpeed) * 100 / (this.playerData.projectileMaxSpeed - this.playerData.projectileBaseSpeed));
          this.projectileBar.setVisible(true);
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursors.space)) {
          this.fire();
          this.playerData.projectileSpeed = this.playerData.projectileBaseSpeed;
          this.projectileBar.setVisible(false);
          this.playerData.arrows--
        }
      },
      swordControl: () => {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
          this.sword.attack();
        }
      },
      swordAngle: () => {
        return new Phaser.Math.Vector2(this.body.velocity.x, this.body.velocity.y);
      },
      selectWeapon: () => {
        if (Phaser.Input.Keyboard.JustDown(this.key1)) {
          this.playerData.weapon = 0;
          this.sword.setVisible(true);
          this.bow.setVisible(false);
        }
        if (Phaser.Input.Keyboard.JustDown(this.key2)) {
          this.playerData.weapon = 1;
          this.sword.setVisible(false);
          this.bow.setVisible(true);
        }
        if (Phaser.Input.Keyboard.JustDown(this.key3)) {
          this.playerData.weapon = 2;
          this.sword.setVisible(false);
          this.bow.setVisible(false);
        }
      },
      projectileAngle: () => {
        
        let v = new Phaser.Math.Vector2(this.body.velocity.x,this.body.velocity.y).normalize().scale(this.playerData.projectileSpeed);
        if (v.x == 0 && v.y == 0) 
          return new Phaser.Math.Vector2(this.getDirectionX() * this.playerData.projectileSpeed, this.getDirectionY() * this.playerData.projectileSpeed)
        
        else 
          return v
      },
      dashControl: () =>{
        if(this.inDashDelay) return;
        if(Phaser.Input.Keyboard.JustDown(this.keyC)){
          this.initiateDash();
        }
      },
      spellControl: () => {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
          this.spellFire();
          this.playerData.mana -= this.playerData.currentManaCost;
        }
      }
    };
    this.padControls = {

      projectile: "R1",

      movementcontrol: () => {
        const pad = this.scene.input.gamepad.getPad(0);
        if (pad == undefined) return;

        const dir = new Phaser.Math.Vector2(pad.leftStick.x, pad.leftStick.y);
        this.body.setVelocity(dir.normalize().scale(this.playerData.speed).x, dir.normalize().scale(this.playerData.speed).y);
        if (dir.x == 0 && dir.y == 0) {
          this.sprite.stop();
          return;
        }
        if (Math.abs(dir.x) > Math.abs(dir.y)) {
          this.sprite.anims.play('walk-side', true);
          if (dir.x > 0) this.sprite.scaleX = 1;
          else this.sprite.scaleX = -1;
          return;
        }
        if (dir.y > 0) this.sprite.anims.play('walk-down', true);
        else this.sprite.anims.play('walk-up', true);
      },

      projectileControl: (dt) => {
        const pad = this.scene.input.gamepad.getPad(0);
        if (pad.R2 > 0) {
          if (this.playerData.projectileSpeed < this.playerData.projectileMaxSpeed)
            this.playerData.projectileSpeed += dt / 2
          else {
            this.playerData.projectileSpeed = this.playerData.projectileMaxSpeed
          }
          this.projectileBar.actualiza((this.playerData.projectileSpeed - this.playerData.projectileBaseSpeed) * 100 / (this.playerData.projectileMaxSpeed - this.playerData.projectileBaseSpeed));
          this.projectileBar.setVisible(true);
          this.projectileCharging = true;
        }
        if (this.projectileCharging && pad.R2 == 0) {
          this.fire();
          this.playerData.projectileSpeed = this.playerData.projectileBaseSpeed;
          this.projectileBar.setVisible(false);
          this.playerData.arrows--
          this.projectileCharging = false;
        }
      },
      swordControl: () => {
        const pad = this.scene.input.gamepad.getPad(0);
        if (pad == undefined) return
        if (pad.R2 > 0) {
          if (this.R2_pressed) return;
          this.sword.attack();
          this.R2_pressed = true;
        }
        else {
          if (!this.R2_pressed) return;
          this.R2_pressed = false
        }
      },
      swordAngle: () => {
        const pad = this.scene.input.gamepad.getPad(0);
        if (pad == undefined) return new Phaser.Math.Vector2(0, 0);
        const dir = new Phaser.Math.Vector2(pad.rightStick.x, pad.rightStick.y);
        return dir;

      },
      selectWeapon: () => {

      },
      projectileAngle: () => {
        let pad = this.scene.input.gamepad.getPad(0);
        if (pad != undefined) {
          const dir = new Phaser.Math.Vector2(pad.rightStick.x, pad.rightStick.y);
          if (dir.x != 0 || dir.y != 0) {
            this.controls.lastProjectileUsed = dir.normalize().scale(this.playerData.projectileSpeed);
            return dir.normalize().scale(this.playerData.projectileSpeed);
          }
          return this.controls.lastProjectileUsed;
        }
      },

      lastProjectileUsed: new Phaser.Math.Vector2(this.playerData.projectileSpeed, 0)
    };
  }

}


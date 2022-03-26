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

    //Creacion de teclas
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.key1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.key3 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.keyC = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.keyF = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.keyG = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);

    //Propiedades del body
    this.body.allowGravity = false;
    this.body.pushable = false;


    //Handle datos jugador
    this.playerData = data;
    this.playerData.player = this;

    //Ajustes collider
    this.body.offset.x = -20;
    this.body.offset.y = -20;
    this.body.setSize(this.body.width * 0.60, this.body.height * 1);


    //Creacion de grupos y colliders
    this.createGroups();
    this.WallCollGroup_noEff.add(this);
    this.VoidCollGroup_noEff.add(this);
    this.playerWithProjectilesCollider.add(this);


    //Handle Sprite del jugador
    this.sprite = this.scene.add.sprite(0, 0, 'character', 'idle-side.png');
    this.add(this.sprite);
    this.sprite.anims.play('idle-side');


    //Creacion Informacion del jugador por pantalla
    this.array_hearts = [];
    this.separation = 0;
    this.createUiBar();
    this.money_label =this.scene.add.text(45,85,"x" + this.playerData.money, {fontSize: "22px"});
    this.arrow_label = this.scene.add.text(105,85, "x" + this.playerData.arrows, {fontSize: "22px"});
    this.hPotion_label = this.scene.add.text(25,140,"x"+ this.playerData.healthPotions, {fontSize: "22px"});
    this.mPotion_label = this.scene.add.text(80, 140,"x" + this.playerData.manaPotions, {fontSize: "22px"});
    //Barra mana
    this.manaBar = new ManaBar(scene, 105, 50);
    this.mana_label =  this.scene.add.text(210 ,40,''+this.playerData.mana, {fontSize: "22px"});

    


    //Creacion armas del jugador
    this.sword = new SwordContainer(scene, 0, 0, this);
    this.bow = new Bow(scene, 0, 0, this);
    this.add(this.sword);
    this.add(this.bow);
    if (this.playerData.weapon == 0) {
      this.sword.setVisible(true);
    }
    else if (this.playerData.weapon == 1) {
      this.bow.setVisible(true);
    }

    //Barra proyectiles
    this.projectileBar = new ProjectileBar(scene, 0, 70);
    this.add(this.projectileBar);
    this.projectileBar.setVisible(false);


    //Creacion de controles 
    this.handleControls();
    if (this.playerData.isPadControlling) this.controls = this.padControls;
    else this.controls = this.keyboardControls;
    scene.input.keyboard.on('keydown', () => { this.controls = this.keyboardControls; this.playerData.isPadControlling = false });
    scene.input.gamepad.on(Phaser.Input.Gamepad.Events.BUTTON_DOWN, () => { this.controls = this.padControls; this.playerData.isPadControlling = true });


    //---Variables usadas---

    //Variables en proyectiles disparados
    this.projectileCharging = false;

    //Variables inmunidad
    this.immunity = 0;
    this.origTint = this.sprite.tint;
    this.flickerTime = 0;

    //Variables Dash
    this.dashing = false;
    this.inDashDelay = false;

    //Variables controles
    this.R2_pressed = false;
    this.lastVelocity = new Phaser.Math.Vector2(0, 0);
    this.trianglePressed = false;
    this.L2Pressed = false;

    //Variables generales
    this.isDead = false;

    //Audio
    this.swordAudio = this.scene.sound.add("slide");
    this.hit = this.scene.sound.add("hit");
    this.upgradeAudio = this.scene.sound.add("upgrade");
    this.flechaAudio = this.scene.sound.add("disparoFlecha");
    this.healthPotionAudio = this.scene.sound.add("potionAudio");

  }


  preUpdate(t, dt) {

    if (!this.dashing) {
      this.controls.movementcontrol();
      if (this.playerData.weapon == 0)
        this.controls.swordControl();

      if (this.playerData.weapon == 1) {
        if (this.playerData.arrows > 0)
          this.controls.projectileControl(dt);
      }

      if (this.playerData.weapon == 2) {
        if (this.playerData.currentManaCost <= this.playerData.mana)
          this.controls.spellControl();
      }
      this.controls.dashControl();
    }
    else
      this.dash();


    if (this.immunity > 0)
      this.immunity -= dt;
    else
      this.displayColor = () => { };


    this.controls.selectWeapon();
    this.displayColor();
    this.flickerTime += dt;

    if (this.body.velocity.x != 0 || this.body.velocity.y != 0) {
      this.lastVelocity = new Phaser.Math.Vector2(this.body.velocity.x, this.body.velocity.y);
    }
    this.controls.healthRecovery();
    this.controls.manaRecovery();
    //Actualizacion informacion en pantalla
    //this.health_label.text = 'Health: ' + this.playerData.health;
    this.updateUi();
    if (this.playerData.health <= 0 && !this.isDead) {
      this.isDead = true;
      this.sprite.anims.play('death');
      this.scene.finishGame();
    }


    this.handlePlayerAnimation();
  }



  //Metodos UI
  createUiBar(){
      for (let i = 0; i < this.playerData.health; i++){
        this.array_hearts[i] = this.scene.add.sprite(20 + this.separation ,20,'vida');
        this.separation += 30;
      }
      this.scene.add.sprite(40,85,"monedas");
    
      this.scene.add.sprite(100,80, "flecha");
    
      this.scene.add.sprite(20,130, "pocionVida");

      this.scene.add.sprite(75,130,'pocionMana');
      
  }

  updateUi() {
    const j = this.array_hearts.length;

    if (this.playerData.health != j) {
      if (this.playerData.health > j) {

        for (let i = j; i < this.playerData.health; i++) {
          this.array_hearts[i] = this.scene.add.sprite(20 + this.separation, 20, 'vida');
          this.separation += 30;

        }
      }
      else {
        for (let i = j; i > this.playerData.health; i--) {
          this.array_hearts[i - 1].destroy();
          this.array_hearts.pop();
          this.separation -= 30;
        }
      }
    }
    this.money_label.text = 'x' + this.playerData.money;
    this.arrow_label.text = 'x' + this.playerData.arrows;
    this.mPotion_label.text = 'x' + this.playerData.manaPotions;
    this.hPotion_label.text = 'x' + this.playerData.healthPotions;
    this.mana_label.text = '' + this.playerData.mana;
    this.manaBar.actualiza(this.playerData.mana, this.playerData.maxMana);

  }



  hurt(damage) {
    if (this.immunity <= 0) {
      this.hit.play();
      this.playerData.health -= damage;
      this.immunity = 1500;
      this.displayColor = this.flickering;
      this.flickerTime = -200;
      this.sprite.tint = 0xff0000;
    }
  }


  //Metodos disparo
  fire() {
    this.flechaAudio.play();
    const projectileVector = this.controls.projectileAngle();
    this.projectile = new PlayerProyectile(this.scene, this.x, this.y, projectileVector.x, projectileVector.y);
    this.playerData.projectileGroups.forEach(element => {
      element().grupo.add(this.projectile);
    });
  }

  spellFire() {
    const projectileVector = this.controls.projectileAngle();
    this.projectile = new Spell(this.scene, this.x, this.y, projectileVector.x, projectileVector.y, 10, this.playerData.damage);
  }


  //Metodos Dash
  dash() {
    if (this.dashing) {
      this.body.velocity = this.dashVelocity;
    }
  }

  initiateDash() {
    this.dashVelocity = this.lastVelocity;
    this.dashVelocity.normalize().scale(this.playerData.dashSpeed);
    this.dashing = true;
    this.inDashDelay = true;
    if (this.playerData.dashInvincibilityPower)
      this.playerWithProjectilesCollider.remove(this);
    this.scene.time.delayedCall(130, () => {
      if (this.playerData.dashInvincibilityPower)
        this.playerWithProjectilesCollider.remove(this);
      this.dashing = false;
    })
    this.scene.time.delayedCall(400, () => {
      this.playerWithProjectilesCollider.add(this);
      this.inDashDelay = false;
    })

  }

  //Metodos PowerUp
  setSpectral() {
    this.playerData.setSpectral();
  }

  setBouncy() {

    this.playerData.setBouncy();
  }

  useHealthPotions(){
    if(this.playerData.healthPotions> 0){
    this.healthPotionAudio.play();
    this.playerData.healthPotions--;
    this.playerData.health++;
    }
  }
  useManaPotions(){
    if(this.playerData.manaPotions> 0){
    this.healthPotionAudio.play();
    this.playerData.manaPotions--;
    this.playerData.mana+= 25;
    }
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

  //Metodos parpadeo inmunidad
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

  //Creacion Grupos
  createGroups() {
    this.WallCollGroup = this.scene.add.group();
    this.scene.physics.add.collider(this.WallCollGroup, this.scene.wallLayer, (o1, o2) => { o1.dest() });
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
    this.scene.physics.add.overlap(this.playerWithProjectilesCollider, this.scene.projectiles, (o1, o2) => {
      o1.hurt(o2.damage);
      o2.destroy();
    });
  }


  giveMana() {
    if (this.playerData.mana >= this.playerData.maxMana) return;
    this.playerData.mana++;

  }

  givePasivoPowerUp(texture, titleString) {
    this.upgradeAudio.play();
    const objectPicked = new Phaser.GameObjects.Image(this.scene, 0, -50, texture);
    const background = new Phaser.GameObjects.Image(this.scene,this.scene.cameras.cameras[0].centerX, this.scene.cameras.cameras[0].centerY - 600, 'emptySign');
    background.scaleX = 2.5;
    this.scene.add.existing(background);
    //background.x -= background.width/2
    const title = this.scene.add.text(this.scene.cameras.cameras[0].centerX, this.scene.cameras.cameras[0].centerY - 600, titleString, { fontSize: 50});
    title.x -= title.width / 2;
    this.scene.tweens.add({
      targets: [title,background],
      y:this.scene.cameras.cameras[0].centerY - 430,
      duration: 1000,
      ease: 'Sine.easeInOut',
      repeat: 0,
      hold: 2000,
      yoyo: true
  })
    //this.scene.add(objectPicked);
    this.add(objectPicked);
    this.scene.time.delayedCall(4000, () => { objectPicked.destroy(); title.destroy(); background.destroy()});
  }

  //Animacion player
  handlePlayerAnimation() {
    if (this.isDead) {
      this.sprite.anims.play('death', true);
      return;
    }
    if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
      const parts = this.sprite.anims.currentAnim.key.split('-');
      parts[0] = 'idle';
      this.sprite.anims.play(parts.join('-'));
      return;
    }
    if (Math.abs(this.body.velocity.x) >= Math.abs(this.body.velocity.y)) {
      this.sprite.anims.play('walk-side', true);
      if (this.body.velocity.x > 0) this.sprite.scaleX = 1;
      else this.sprite.scaleX = -1;
      return;
    }
    if (this.body.velocity.y > 0) this.sprite.anims.play('walk-down', true);
    else this.sprite.anims.play('walk-up', true);
  }

  //Controles player
  handleControls() {
    this.keyboardControls = {
      projectile: "spacebar",
      movementcontrol: () => {
        let velocityVector = new Phaser.Math.Vector2(0, 0);
        if (this.cursors.up.isDown) {
          velocityVector.y -= 1;
        }
        if (this.cursors.down.isDown) {
          velocityVector.y += 1;
        }
        if (this.cursors.left.isDown) {
          velocityVector.x -= 1;
        }
        if (this.cursors.right.isDown) {
          velocityVector.x += 1;
        }
        velocityVector.normalize().scale(this.playerData.speed);
        this.body.setVelocity(velocityVector.x, velocityVector.y);
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
          this.swordAudio.play();
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

        let v = new Phaser.Math.Vector2(this.body.velocity.x, this.body.velocity.y).normalize().scale(this.playerData.projectileSpeed);
        if (v.x == 0 && v.y == 0)
          return new Phaser.Math.Vector2(this.getDirectionX() * this.playerData.projectileSpeed, this.getDirectionY() * this.playerData.projectileSpeed)

        else
          return v
      },
      dashControl: () => {
        if (this.inDashDelay) return;
        if (Phaser.Input.Keyboard.JustDown(this.keyC)) {
          this.initiateDash();
        }
      },
      healthRecovery: () => {
        if (Phaser.Input.Keyboard.JustDown(this.keyF)) {
          this.useHealthPotions();
        }
      },
      manaRecovery: () => {
        if (Phaser.Input.Keyboard.JustDown(this.keyG)) {
          this.useManaPotions();
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
        const pad = this.scene.input.gamepad.getPad(0);
        if (pad.Y) {
          if (this.trianglePressed) return;
          this.trianglePressed = true;
          this.playerData.weapon = (this.playerData.weapon + 1) % 3;
          let newWeapon = this.playerData.weapon;
          if (newWeapon == 0) {
            this.sword.setVisible(true);
            this.bow.setVisible(false);
          }
          else if (newWeapon == 1) {
            this.sword.setVisible(false);
            this.bow.setVisible(true);
          }
          else {
            this.sword.setVisible(false);
            this.bow.setVisible(false);
          }
        }
        else {
          if (!this.trianglePressed) return;
          this.trianglePressed = false;
        }
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
      dashControl: () => {
        const pad = this.scene.input.gamepad.getPad(0);
        if (pad.L2 > 0) {
          if(this.L2Pressed) return;
          this.L2Pressed = true;
          if (this.inDashDelay) return;
          this.initiateDash();
        }
        else{
          if(!this.L2Pressed) return;
          this.L2Pressed = false;
        }
      },
      spellControl: () => {
        const pad = this.scene.input.gamepad.getPad(0);
        if (pad.R2 > 0) {
          if(this.R2_pressed) return;
          this.R2_pressed = true;
          this.spellFire();
          this.playerData.mana -= this.playerData.currentManaCost;
        }
        else{
          if(!this.R2_pressed) return;
          this.R2_pressed = false;
        }
      },
      lastProjectileUsed: new Phaser.Math.Vector2(this.playerData.projectileSpeed, 0)
    };

  }

}


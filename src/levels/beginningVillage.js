import SceneManager from '../managers/sceneManager.js';
import Chest from '../objetos_recogibles/chest.js';
import PasivePowerUpList from '../objetos_recogibles/pasivos/pasivePowerUpList.js';
import Player from '../player/player.js';
import PlayerData from '../player/playerData.js';
import PlayerTopDown from '../player/playerTopDown.js';
import LevelScroll1 from './levelsScroll/levelScroll1.js';
import LevelScroll2 from './levelsScroll/levelScroll2.js';
import LevelScroll3 from './levelsScroll/levelScroll3.js';
import LevelScroll4 from './levelsScroll/levelScroll4.js';

/**
 .
 * @extends Phaser.Scene
 */
const itemsData = [
  {
    name: 'pocionVida',
    price: 3,
    x: 3798,
    y: 1555
  },
  {
    name: 'pocionMana',
    price: 3,
    x: 3876,
    y: 1555
  },
  {
    name: 'vida',
    price: 10,
    x: 4000,
    y: 1555
  },
  {
    name: 'chestUnopened',
    object: 'chest',
    timesPurchased: 1,
    price: 15,
    x: 3485,
    y: 1555
  }
]

export default class BeginningVillage extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'beginningVillage' });
  }

  init(data) {
    this.coordinates = data.coordinates;
    this.playerData = data.playerData;
    this.powerUpList = data.powerUpList;
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    const map = this.make.tilemap({ key: 'tilemapVillage', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('cottage', 'cottages');
    const tileset2 = map.addTilesetImage('decorations-medieval', 'decorationMedieval');
    const tileset3 = map.addTilesetImage('fence_medieval', 'fenceMedieval');
    const tileset4 = map.addTilesetImage('terrain-v7', 'terreno');
    const tileset5 = map.addTilesetImage('trees-pale', 'trees');
    const tileset6 = map.addTilesetImage('thatched-roof', 'roofNormal');
    const tileset7 = map.addTilesetImage('doors', 'doors');
    const tileset8 = map.addTilesetImage('windows', 'windows');

    const bottomLayer = map.createLayer('BottomLayer', [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8]).setCollisionByProperty({ collides: true });
    const bottomLayer2 = map.createLayer('BottomLayer2', [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8]).setCollisionByProperty({ collides: true });

    const midLayer = map.createLayer('MidLayer', [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8]).setCollisionByProperty({ collides: true });
    this.enemies = this.add.group();
    this.player = new PlayerTopDown(this, this.coordinates.x, this.coordinates.y, this.playerData);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, 5120, 3840);
    this.player.body.setCollideWorldBounds(false);
    this.general = this.add.sprite(4193.94, 2590.91, "npcs", "general_3.png");
    this.blacksmith = this.add.sprite(3878, 1500, "npcs", "herrero_3.png");
    this.npcs = this.add.group();
    this.npcs.add(this.blacksmith);
    this.npcs.add(this.general);
    this.physics.add.existing(this.general);
    this.zona = this.add.zone(4193, 2600, 200, 200);
    this.physics.world.enable(this.zona);
    this.zona.body.setAllowGravity(false)
    this.zona.body.setImmovable(false);

    this.general.body.allowGravity = false;
    this.general.body.immovable = true;

    //const npcs = map.createFromObjects('npcs');
    //for (const objeto of this.scene.map.getObjectLayer('npcs').objects) {
    //if (objeto.type === 'blacksmith') {
    //this.add.sprite(objeto.x, objeto.y,'blacksmith');
    //}
    //if (objeto.type === 'general') {
    //  this.add.sprite(objeto.x, objeto.y,'general');
    //  

    //}
    const topLayer = map.createLayer('TopLayer', [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8]).setCollisionByProperty({ collides: true });
    const Roofs = map.createLayer('Roofs', [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7, tileset8]).setCollisionByProperty({ collides: true });

    this.sceneChange = [this.add.zone(2560, 1225, 300, 320), this.add.zone(2565, 1250, 425, 225)];
    this.physics.world.enable(this.sceneChange);
    this.sceneChange[0].body.setAllowGravity(false);
    this.sceneChange[1].body.setAllowGravity(false);

    this.physics.add.collider(this.player, midLayer);
    this.physics.add.collider(this.player, topLayer);
    this.physics.add.collider(this.player, this.general);
    this.villageSound = this.sound.add("villagetheme", { loop: true });
    this.villageSound.play();
    this.changingScene = false;
    this.cameras.main.fadeIn(1000);
    this.scene.manager.getScenes(false).forEach(s => {
      if (s.generated != undefined) {
        this.scene.manager.remove(s)
      }
    })
    this.scene.manager.remove('Scroll1');
    this.scene.manager.remove('Scroll2');
    this.scene.manager.remove('Scroll3');
    this.scene.manager.remove('Scroll4');
    this.scene.manager.add('Scroll1', LevelScroll1);
    this.scene.manager.add('Scroll2', LevelScroll2);
    this.scene.manager.add('Scroll3', LevelScroll3);
    this.scene.manager.add('Scroll4', LevelScroll4);

    this.bg = this.add.rectangle(0, 960, this.scale.width * 2, 600, "0x914f1d").setScrollFactor(0).setDepth(6);
    this.bg.visible = false;
    this.dialog = this.add.bitmapText(10, 660, 'atari', 'Welcome knight my name is Roger,\nI am the third general of the Radagon Squad.\nYou may noticed that the village is in great danger\nafter the return of Radhan the wizard.\nPlease Knight enter the dungeon and slay him\nto protect our village from his evil spell.', 16)
      .setFontSize(48)
      .setDepth(8).setScrollFactor(0);
    this.dialog.visible = false;
    this.dialogCreated = false;
    this.createShop();
  }

  createShop() {

    this.bgshop = this.add.rectangle(0, 960, this.scale.width * 2, 600, "0x914f1d").setScrollFactor(0).setDepth(6);

    this.shopDialog = this.add.bitmapText(10, 700, 'atari', '', 16)
      .setFontSize(48)
      .setDepth(8).setScrollFactor(0);
    this.okText = this.add.bitmapText(1100, 700, 'atari', 'Yes!', 16)
      .setFontSize(48)
      .setDepth(8).setScrollFactor(0);

    this.noText = this.add.bitmapText(1100, 800, 'atari', 'No', 16)
      .setFontSize(48)
      .setDepth(8).setScrollFactor(0);
    this.infoText = this.add.bitmapText(10, 850, 'atari', '', 16)
      .setFontSize(48)
      .setDepth(8).setScrollFactor(0);
    this.closeShop();
    this.yesKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
    this.noKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.items = [];
    this.itemsPrice = [];
    this.itemsZones = [];
    let i = 0;


    itemsData.forEach(item => {
      const { x, y, name, object, timesPurchased, price } = item;
      if (object == undefined) {
        this.items[i] = this.physics.add.staticImage(x, y, name);
      } else {
        if (object === 'chest') {
          this.items[i] = new Chest(this, this.player, x, y);
        }
      }
      this.items[i].name = name;
      this.items[i].timesPurchased = timesPurchased;
      this.itemsPrice[i] = price;
      this.itemsZones[i] = this.add.zone(x, y, 50, 150);
      this.physics.world.enable(this.itemsZones[i]);
      this.itemsZones[i].body.setAllowGravity(false)
      this.itemsZones[i].body.setImmovable(false);
      i++;
    })

  }

  createBoxShop(i, created) {
    const objeto = this.items[i];
    const objetoPrecio = this.itemsPrice[i];
    if (!created && Phaser.Input.Keyboard.JustDown(this.eKey)) {
      this.created = true;
      this.player.setBlocked(true);
      this.openShop();
      let stringobjeto = "";
      let stringmonedas = "";
      stringobjeto = this.choseText(objeto);
      if (objetoPrecio == 1) stringmonedas = "coin";
      else stringmonedas = "coins";
      this.shopDialog.setText('Do you want ' + stringobjeto + '\nfor the amount of ' + objetoPrecio + ' ' + stringmonedas);
    }
    if (created) {
      if (Phaser.Input.Keyboard.JustDown(this.yesKey)) {
        if (objeto.timesPurchased === undefined || objeto.timesPurchased > 0) {
          if (this.player.playerData.money >= objetoPrecio) {
            this.spentMoney(objeto, objetoPrecio);
          } else {
            this.infoText.setText("You don't have enough coins to buy this item\n come back later knight");
          }

        } else this.infoText.setText('You have already purchase this item Knight\n come back later');
      }
      if (Phaser.Input.Keyboard.JustDown(this.noKey)) {
        this.closeShop();
        this.created = false;
        this.player.setBlocked(false);
      }
    }

  }

  choseText(objeto) {
    let stringobjeto = "";
    switch (objeto.name) {
      case 'pocionVida': stringobjeto = "a Health Potion"; break;
      case 'pocionMana': stringobjeto = "a Mana Potion"; break;
      case 'vida': stringobjeto = "a heart slot \nto upgrade your max heart slots"; break;
      case 'chestUnopened': stringobjeto = 'a random pasive upgrade'; break;
    }
    return stringobjeto;
  }

  spentMoney(objeto, objetoPrecio) {
    this.player.playerData.money -= objetoPrecio;
    switch (objeto.name) {
      case 'pocionVida': this.player.playerData.healthPotions++; break;
      case 'pocionMana': this.player.playerData.manaPotions++; break;
      case 'vida': this.player.playerData.maxhealth++; break;
      case 'chestUnopened': 
        const item = objeto.giveShopItem(); 
        this.time.delayedCall(600, _=> item.givePower());
        item.destroy();
        objeto.timesPurchased--; 
        break;
    }

  }

  openShop() {
    this.bgshop.visible = true;
    this.shopDialog.visible = true;
    this.okText.visible = true;
    this.noText.visible = true;
    this.infoText.visible = true;
  }
  closeShop() {
    this.bgshop.visible = false;
    this.shopDialog.visible = false;
    this.okText.visible = false;
    this.noText.visible = false;
    this.infoText.visible = false;
    this.infoText.setText('Press Y if you want to buy this item\n or press N to leave');
    this.created = false;
  }


  update(d, dt) {
    if ((this.physics.overlap(this.player, this.sceneChange[0]) || this.physics.overlap(this.player, this.sceneChange[1])) && this.changingScene == false) {
      this.changingScene = true;
      this.sound.stopAll();
      
      this.player.setBlocked(true);
      this.cameras.main.fadeOut(1000);
      this.time.delayedCall(1450, () => {

        let m = this.scene.manager.getScenes(false);
        const creador = new SceneManager();
        let newScenes = creador.generateMap();
        newScenes.forEach(e => {
          this.scene.manager.add(e.levelkey, e);
        })
        this.scene.start('initialLevel', {playerData: this.playerData, powerUpList: this.powerUpList, direction:-1});
       
      });
    }

    if (this.physics.overlap(this.player, this.zona)) {
      this.startDialog();

    }
    else {
      this.bg.visible = false;
      this.dialog.visible = false;
    }


    if (this.physics.overlap(this.player, this.itemsZones[0])) {
      this.createBoxShop(0, this.created);
    }
    else if (this.physics.overlap(this.player, this.itemsZones[1])) {
      this.createBoxShop(1, this.created);
    }
    else if (this.physics.overlap(this.player, this.itemsZones[2])) {
      this.createBoxShop(2, this.created);

    }
    else if (this.physics.overlap(this.player, this.itemsZones[3])) {
      this.createBoxShop(3, this.created);

    } else {
      this.closeShop();
      this.created = false;
    }





  }
  /*
  if (this.physics.overlap(this.player, this.sceneChange[3])) {
    this.scene.start('levelTopDown4', {coordinates: {x: 100, y: 500}, playerData:this.playerData});
  }*/


  choseDialog(pressedButton){
    let text = "";
    switch(pressedButton){
      case 0:  text = 'After you go Knight I want to talk you about two more things:\nMy great friend Hewg the BlackSmith is waiting you in his shop\nif you want to buy him some items.\nThese items may help you in your journey in the dungeon.\nHe has cheap prices so do not spare with him.';break;
      case 1: text = 'Also I want you to talk about one interesting thing of the dungeon.\nAccording to one of my best explorers'+
      'in the very beginning of the dungeon four different doors were embedded in the walls.'+
      'He dediced to enter in the first one but he was not brave enough to walk through all the caves.'+
      'The last thing he told me was that he heard a key ringing in the cave.'+
      'Yoy may want to find out what is this all about';break;
      default: text = 'I believe in you Knight. Save our Village!!'
    }
    return text;
  }


  startDialog() {
    if(!this.dialogCreated){
    this.player.setBlocked(true);
    this.bg.visible = true;
    this.dialog.visible = true;
    this.pressedButton = 0;
    this.dialogCreated = true;
    }
    this.input.keyboard.on('keydown-SPACE', () => { 
      const dialog = this.choseDialog(this.pressedButton)
      this.dialog.setText(dialog);
      this.pressedButton++;
    });

  }

  showHitbox(layer) {
    const debugGraphics = this.add.graphics().setAlpha(0.7);

    layer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    });
  }
}
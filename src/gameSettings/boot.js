import PlayerData from "../player/playerData.js";
/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    this.load.image('platform', 'platform.png');
    this.load.image('base', 'base.png');
    this.load.image('star', 'star.png');
    this.load.image('player', 'player.png');
    this.load.image('enemy', 'enemy_white.png');
    this.load.image('flecha','flecha.png')
    this.load.image('pocionVida','potion.png');
    this.load.image('monedas', 'coins.png');
    this.load.image('vida', 'heart.png');
    
    this.load.image('scroll1', 'castle_tileset_part1.png');
    this.load.image('scroll2', 'castle_tileset_part2.png');
    this.load.image('scroll3', 'castle_tileset_part3.png');
    this.load.image('cottages', 'cottage.png');
    this.load.image('decorationMedieval', "decorations-medieval.png");
    this.load.image('fenceMedieval', "fence_medieval.png");
    this.load.image('terreno', "terrain-v7.png");
    this.load.image('trees', "trees-pale.png");
    this.load.image('roofNormal', "thatched-roof.png");
    this.load.image('windows','windows.png');
    this.load.image('doors','doors.png');
    this.load.image('moleStand', 'attack-7.png');
    this.load.image('goblinKingStand', 'idle-1.png');
    this.load.image('dungeon', 'Dungeon64.png');
    this.load.image('mana', 'mana.png');
    this.load.image('chestUnopened', '77.png');
    this.load.image('pocionMana', 'manaPotion.png');

    this.load.setPath('assets/json/');
    this.load.tilemapTiledJSON('tilemapJose', 'PruebaScrollJose.json');
    this.load.tilemapTiledJSON('tilemap1', 'Dungeon1.json');
    this.load.tilemapTiledJSON('tilemap2', 'Dungeon2.json');
    this.load.tilemapTiledJSON('tilemap3', 'Dungeon3.json');
    this.load.tilemapTiledJSON('tilemap4', 'Dungeon4.json');
    this.load.tilemapTiledJSON('tilemap5', 'Dungeon5.json');
    this.load.tilemapTiledJSON('tilemapVillage', 'PruebaPoblado2.json');

    this.load.setPath('assets/atlas/');
    //knight
    this.load.atlas('character', 'atlas.png', 'atlas.json');
    this.load.atlas('characterScroll', 'movement.png', 'movement.json');
    // enemies
    this.load.atlas('brainmole', 'brainmole.png', 'brainmole.json');
    this.load.atlas('goblinKing', 'goblinKing.png', 'goblinKing.json');
    this.load.atlas('minotaur', 'minotaur.png', 'minotaur.json');


    this.load.atlas('chest', 'chest.png', 'chest.json')


    //musica
    this.load.setPath('assets/music/');
    this.load.audio('tonedeath','NoHope.mp3');
    this.load.audio('villagetheme', 'villagetheme.mp3');
    this.load.audio('dungeontheme', 'dungeontheme.ogg');

    
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que reprsesenta el
   * nivel del juego
   */
  create() {
    //Para probar enemigo descomentar esto y comentar el de abajo
    //this.scene.start('lebel');
    this.createAnimations();
    //Para jugar en el modo vista lateral descomentar level
    this.scene.start('beginningVillage', {coordinates: {x: 1312, y: 2708}, playerData: new PlayerData()});
    //this.scene.start('levelScroll', {coordinates: {x: 0, y: 500}});
    //this.scene.start('level');
  }

  createAnimations() {
    //Top Down
    //Idle
    this.anims.create({key: 'idle-side', frames: [{ key: 'character', frame: 'idle-side.png'}], duration: -1});
    this.anims.create({key: 'idle-down', frames: [{ key: 'character', frame: 'idle-down.png'}], duration: -1});
    this.anims.create({key: 'idle-up', frames: [{ key: 'character', frame: 'idle-up.png'}], duration: -1});

    //WalkSide
    this.anims.create({
      key: 'walk-side',
      frames: this.anims.generateFrameNames('character', {start: 1, end: 9, prefix: 'walk-side-', suffix: '.png'}),
      frameRate: 12,
      repeat: -1
    });

    //WalkDown
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNames('character', {start: 1, end: 7, prefix: 'walk-down-', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
    });

    //WalkUp
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNames('character', {start: 1, end: 7, prefix: 'walk-up-', suffix: '.png'}),
      frameRate: 10,
      repeat: -1
    });
    
    //Death
    this.anims.create({
      key: 'death',
      frames: this.anims.generateFrameNames('character', {start: 1, end: 4, prefix: 'death-', suffix: '.png'}),
      frameRate: 1,
      duration: -1
    });

    //ScrollLateral
    this.anims.create({key: 'stand', frames: [{ key: 'characterScroll', frame: 'walk-143.png'}], duration: -1});
    //Walk 
    this.anims.create({
    key: 'walk', 
    frames: this.anims.generateFrameNames('characterScroll',{ start: 143, end: 151 ,prefix: 'walk-',suffix: '.png'}),
    frameRate: 15,
    repeat: -1});

    //Jump
    this.anims.create({
    key: 'jump', 
    frames: this.anims.generateFrameNames('characterScroll',{ start: 39, end: 45 ,prefix: 'jump-',suffix: '.png'}),
    frameRate: 10 ,
    repeat: 0});
    this.anims.create({key: 'jumpfinal', frames: [{ key: 'characterScroll', frame: 'jump-43.png'}], duration: -1});
    
    
  //BrainMole animations
    this.anims.create({
    key:'mole',
    frames: this.anims.generateFrameNames('brainmole',{start: 7, end: 10, prefix: 'attack-', suffix: '.png'}),
    frameRate:10,
    repeat: -1    
  })

  // goblinKing animations
  this.anims.create({
    key:'goblinKing_idle',
    frames: this.anims.generateFrameNames('goblinKing',{start: 1, end: 4, prefix: 'idle-', suffix: '.png'}),
    frameRate:10,
    repeat: -1    
  })

  this.anims.create({
    key:'goblinKing_walking',
    frames: this.anims.generateFrameNames('goblinKing',{start: 1, end: 6, prefix: 'walking-', suffix: '.png'}),
    frameRate:10,
    repeat: -1    
  })

  this.anims.create({
    key:'goblinKing_attack',
    frames: this.anims.generateFrameNames('goblinKing',{start: 1, end: 13, prefix: 'attack-', suffix: '.png'}),
    frameRate:10,
    repeat: -1    
  })

  this.anims.create({
    key:'goblinKing_death',
    frames: this.anims.generateFrameNames('goblinKing',{start: 1, end: 11, prefix: 'death-', suffix: '.png'}),
    frameRate:10,
    repeat: 0    
  })
    //Minotaur
    this.anims.create({
      key:'minotaurSpinAttack',
      frames: this.anims.generateFrameNames('minotaur',{start: 1, end: 9, prefix: 'Spin-Attack_', suffix: '.png'}),
      frameRate:10,
      repeat: 0    
    })
    this.anims.create({
      key:'minotaurWalk',
      frames: this.anims.generateFrameNames('minotaur',{start: 1, end: 8, prefix: 'Walk_', suffix: '.png'}),
      frameRate:15,
      repeat: 0    
    })
    this.anims.create({
      key:'minotaurPrepare',
      frames: this.anims.generateFrameNames('minotaur',{start: 1, end: 5, prefix: 'Prepare_', suffix: '.png'}),
      frameRate:7,
      repeat: 0    
    })
    this.anims.create({
      key:'minotaurDeath',
      frames: this.anims.generateFrameNames('minotaur',{start: 1, end: 6, prefix: 'death_', suffix: '.png'}),
      frameRate:10,
      repeat: 0    
    })
    this.anims.create({key: 'minotaur_idle', frames: [{ key: 'minotaur', frame: 'idle.png'}], duration: -1});
    this.anims.create({
      key:'minotaurfastWalk',
      frames: this.anims.generateFrameNames('minotaur',{start: 1, end: 8, prefix: 'Walk_', suffix: '.png'}),
      frameRate:25,
      repeat: 0    
    })
    //Chest
    this.anims.create({
      key:'openChest',
      frames: this.anims.generateFrameNames('chest',{start: 77, end: 81, suffix: '.png'}),
      frameRate: 8,
      repeat: 0    
    })
    }
}


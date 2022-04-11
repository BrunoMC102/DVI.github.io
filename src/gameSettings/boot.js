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
    this.load.image('flecha', 'flecha.png')
    this.load.image('pocionVida', 'potion.png');
    this.load.image('monedas', 'coins.png');
    this.load.image('vida', 'Fullheart.png');
    this.load.image('sword', 'sword.png');
    this.load.image('scroll1', 'castle_tileset_part1.png');
    this.load.image('scroll2', 'castle_tileset_part2.png');
    this.load.image('scroll3', 'castle_tileset_part3.png');
    this.load.image('cottages', 'cottage.png');
    this.load.image('decorationMedieval', "decorations-medieval.png");
    this.load.image('fenceMedieval', "fence_medieval.png");
    this.load.image('terreno', "terrain-v7.png");
    this.load.image('trees', "trees-pale.png");
    this.load.image('roofNormal', "thatched-roof.png");
    this.load.image('windows', 'windows.png');
    this.load.image('doors', 'doors.png');
    this.load.image('moleStand', 'attack-7.png');
    this.load.image('goblinKingStand', 'idle-1.png');
    this.load.image('dungeon', 'Dungeon64.png');
    this.load.image('mana', 'mana.png');
    this.load.image('chestUnopened', 'chest.png');
    this.load.image('pocionMana', 'manaPotion.png');
    this.load.image('emptySign', 'EmptySign.png');
    this.load.image('menuBackground', 'menuBackground.png');
    this.load.image('background', 'background.png');
    this.load.image('icono', 'icono.png');
    this.load.image('bow', 'bow.png');
    this.load.image('iceStand', 'standIce.png');
    this.load.image('shadow', 'shadow.png');



    this.load.setPath('assets/json/');
    this.load.tilemapTiledJSON('tilemapJose', 'PruebaScrollJose.json');
    this.load.tilemapTiledJSON('tilemap1', 'Dungeon1.json');
    this.load.tilemapTiledJSON('tilemap1-4_Doors', 'Dungeon1-4_Doors.json');
    this.load.tilemapTiledJSON('tilemap2', 'Dungeon2.json');
    this.load.tilemapTiledJSON('tilemap3', 'Dungeon3.json');
    this.load.tilemapTiledJSON('tilemap4', 'Dungeon4.json');
    this.load.tilemapTiledJSON('tilemap5', 'Dungeon5.json');
    this.load.tilemapTiledJSON('tilemapBig', 'DungeonBig.json');
    this.load.tilemapTiledJSON('tilemapVillage', 'PruebaPoblado2.json');

    this.load.setPath('assets/atlas/');
    //knight
    this.load.atlas('character', 'atlas.png', 'atlas.json');
    this.load.atlas('characterScroll', 'movement.png', 'movement.json');
    //npcs
    this.load.atlas('npcs', 'npc.png', 'npc.json');
    // enemies
    this.load.atlas('brainmole', 'brainmole.png', 'brainmole.json');
    this.load.atlas('goblinKing', 'goblinKing.png', 'goblinKing.json');
    this.load.atlas('minotaur', 'minotaur.png', 'minotaur.json');
    this.load.atlas('iceElemental', 'iceElemental.png', 'iceElemental.json');

    this.load.atlas('chest', 'chest.png', 'chest.json')
    this.load.atlas('bot', 'bot.png', 'bot.json')
    this.load.atlas('pulse', 'pulse.png', 'pulse.json')
    this.load.atlas('wave', 'wave.png', 'wave.json')
    this.load.atlas('bolt', 'bolt.png', 'bolt.json')
    this.load.atlas('archer', 'archer.png', 'archer.json')
    this.load.atlas('mimicChest', 'mimicChest.png', 'mimicChest.json')
    this.load.atlas('wizardBoss', 'wizardBoss.png', 'wizardBoss.json')
    this.load.atlas('magicBall', 'magicBall.png', 'magicBall.json')
    this.load.atlas('meteor', 'meteor.png', 'meteor.json')
    this.load.atlas('fireBall', 'fireBall.png', 'fireBall.json')
    this.load.atlas('fireColumn', 'fireColumn.png', 'fireColumn.json')



    //musica
    this.load.setPath('assets/music/');
    this.load.audio('slide', 'golpeEspada.wav');
    this.load.audio('hit', 'hit.mp3');
    this.load.audio('upgrade', 'upgrade.mp3');
    this.load.audio('disparoFlecha', 'disparoFlecha.mp3');
    this.load.audio('potionAudio', 'potionAudio.mp3');
    this.load.audio('splash', 'splash.wav');
    this.load.audio('tonedeath', 'NoHope.mp3');
    this.load.audio('villagetheme', 'villagetheme.mp3');
    this.load.audio('dungeontheme', 'dungeontheme.ogg');
    this.load.audio('mainMenuTrack', 'mainMenuTrack.ogg');

    //fuentes
    this.load.setPath('assets/fonts/');
    this.load.bitmapFont('atari','atari.png', 'atari.xml');
    
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
    this.scene.start('mainMenu');
    //this.scene.start('levelScroll', {coordinates: {x: 0, y: 500}});
    //this.scene.start('level');
  }

  createAnimations() {
    //Top Down
    //Idle
    this.anims.create({ key: 'idle-side', frames: [{ key: 'character', frame: 'idle-side.png' }], duration: -1 });
    this.anims.create({ key: 'idle-down', frames: [{ key: 'character', frame: 'idle-down.png' }], duration: -1 });
    this.anims.create({ key: 'idle-up', frames: [{ key: 'character', frame: 'idle-up.png' }], duration: -1 });

    //WalkSide
    this.anims.create({
      key: 'walk-side',
      frames: this.anims.generateFrameNames('character', { start: 1, end: 9, prefix: 'walk-side-', suffix: '.png' }),
      frameRate: 12,
      repeat: -1
    });

    //WalkDown
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNames('character', { start: 1, end: 7, prefix: 'walk-down-', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    });

    //WalkUp
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNames('character', { start: 1, end: 7, prefix: 'walk-up-', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    });

    //Death
    this.anims.create({
      key: 'death',
      frames: this.anims.generateFrameNames('character', { start: 1, end: 4, prefix: 'death-', suffix: '.png' }),
      frameRate: 1,
      duration: -1
    });

    //ScrollLateral
    this.anims.create({ key: 'stand', frames: [{ key: 'characterScroll', frame: 'walk-143.png' }], duration: -1 });
    //Walk 
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('characterScroll', { start: 143, end: 151, prefix: 'walk-', suffix: '.png' }),
      frameRate: 15,
      repeat: -1
    });

    //Jump
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNames('characterScroll', { start: 39, end: 45, prefix: 'jump-', suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({ key: 'jumpfinal', frames: [{ key: 'characterScroll', frame: 'jump-43.png' }], duration: -1 });


    //BrainMole animations
    this.anims.create({
      key: 'mole',
      frames: this.anims.generateFrameNames('brainmole', { start: 7, end: 10, prefix: 'attack-', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })

    // goblinKing animations
    this.anims.create({
      key: 'goblinKing_idle',
      frames: this.anims.generateFrameNames('goblinKing', { start: 1, end: 4, prefix: 'idle-', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'goblinKing_walking',
      frames: this.anims.generateFrameNames('goblinKing', { start: 1, end: 6, prefix: 'walking-', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'goblinKing_attack',
      frames: this.anims.generateFrameNames('goblinKing', { start: 1, end: 13, prefix: 'attack-', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'goblinKing_death',
      frames: this.anims.generateFrameNames('goblinKing', { start: 1, end: 11, prefix: 'death-', suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    })
    //Minotaur
    this.anims.create({
      key: 'minotaurSpinAttack',
      frames: this.anims.generateFrameNames('minotaur', { start: 1, end: 9, prefix: 'Spin-Attack_', suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'minotaurWalk',
      frames: this.anims.generateFrameNames('minotaur', { start: 1, end: 8, prefix: 'Walk_', suffix: '.png' }),
      frameRate: 15,
      repeat: 0
    })
    this.anims.create({
      key: 'minotaurPrepare',
      frames: this.anims.generateFrameNames('minotaur', { start: 1, end: 5, prefix: 'Prepare_', suffix: '.png' }),
      frameRate: 7,
      repeat: 0
    })
    this.anims.create({
      key: 'minotaurDeath',
      frames: this.anims.generateFrameNames('minotaur', { start: 1, end: 6, prefix: 'death_', suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({ key: 'minotaur_idle', frames: [{ key: 'minotaur', frame: 'idle.png' }], duration: -1 });
    this.anims.create({
      key: 'minotaurfastWalk',
      frames: this.anims.generateFrameNames('minotaur', { start: 1, end: 8, prefix: 'Walk_', suffix: '.png' }),
      frameRate: 25,
      repeat: 0
    })
    //Chest
    this.anims.create({
      key: 'openChest',
      frames: this.anims.generateFrameNames('chest', { start: 77, end: 81, suffix: '.png' }),
      frameRate: 8,
      repeat: 0
    })
    //Bot
    this.anims.create({
      key: 'walking_bot',
      frames: this.anims.generateFrameNames('bot', { start: 0, end: 7, suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'bot_fire',
      frames: this.anims.generateFrameNames('bot', { start: 8, end: 11, suffix: '.png' }),
      frameRate: 40,
      repeat: 0
    })

    this.anims.create({
      key: 'bot_awake',
      frames: this.anims.generateFrameNames('bot', { start: 12, end: 16, suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'bot_charging',
      frames: this.anims.generateFrameNames('bot', { start: 17, end: 20, suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'bot_dash',
      frames: this.anims.generateFrameNames('bot', { start: 21, end: 27, suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'bot_death',
      frames: this.anims.generateFrameNames('bot', { start: 28, end: 33, suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'pulseFire',
      frames: this.anims.generateFrameNames('pulse', { start: 1, end: 4, prefix: 'pulse', suffix: '.png' }),
      frameRate: 25,
      repeat: -1
    })
    this.anims.create({
      key: 'pulseDie',
      frames: this.anims.generateFrameNames('pulse', { start: 1, end: 7, prefix: 'hits-5-', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'waveFire',
      frames: this.anims.generateFrameNames('wave', { start: 1, end: 4, prefix: 'waveform', suffix: '.png' }),
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: 'waveDie',
      frames: this.anims.generateFrameNames('wave', { start: 1, end: 7, prefix: 'hits-3-', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'boltFire',
      frames: this.anims.generateFrameNames('bolt', { start: 1, end: 4, prefix: 'bolt', suffix: '.png' }),
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: 'boltDie',
      frames: this.anims.generateFrameNames('bolt', { start: 1, end: 7, prefix: 'hits-3-', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'archerMove',
      frames: this.anims.generateFrameNames('archer', { start: 1, end: 6, prefix: 'run', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'archerjump',
      frames: this.anims.generateFrameNames('archer', { start: 1, end: 5, prefix: 'jump', suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'archeridle',
      frames: this.anims.generateFrameNames('archer', { start: 1, end: 6, prefix: 'idle', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'archerDie',
      frames: this.anims.generateFrameNames('archer', { start: 1, end: 7, prefix: 'die', suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    })

    this.anims.create({
      key: 'archerfire',
      frames: this.anims.generateFrameNames('archer', { start: 1, end: 7, prefix: 'fire', suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    })


    // ice elemental animations
    this.anims.create({
      key: 'iceElemental_idle',
      frames: this.anims.generateFrameNames('iceElemental', { start: 1, end: 5, suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'iceElemental_attack',
      frames: this.anims.generateFrameNames('iceElemental', { start: 81, end: 97, suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'iceElemental_move',
      frames: this.anims.generateFrameNames('iceElemental', { start: 9, end: 12, suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'iceElemental_death',
      frames: this.anims.generateFrameNames('iceElemental', { start: 54, end: 61, suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'mimicChestAttack',
      frames: this.anims.generateFrameNames('mimicChest', { start: 1, end: 4, suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'mimicChestIdle',
      frames: this.anims.generateFrameNames('mimicChest', { start: 5, end: 8, suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'mimicChestSideAttack',
      frames: this.anims.generateFrameNames('mimicChest', { start: 9, end: 12, suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'mimicChestDie',
      frames: this.anims.generateFrameNames('mimicChest', { start: 13, end: 18, suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'wizardAttack1',
      frames: this.anims.generateFrameNames('wizardBoss', { start: 0, end: 7, prefix: 'attack',  suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'wizardSpell',
      frames: this.anims.generateFrameNames('wizardBoss', { start: 4, end: 5, prefix: 'attack',  suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'wizardFinishSpell',
      frames: this.anims.generateFrameNames('wizardBoss', { start: 4, end: 7, prefix: 'attack',  suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'wizardAttack2',
      frames: this.anims.generateFrameNames('wizardBoss', { start: 0, end: 7, prefix: 'attack_2_', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'wizardIdle',
      frames: this.anims.generateFrameNames('wizardBoss', { start: 0, end: 5, prefix: 'idle', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'wizardDie',
      frames: this.anims.generateFrameNames('wizardBoss', { start: 0, end: 6, prefix: 'die', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'wizardRun',
      frames: this.anims.generateFrameNames('wizardBoss', { start: 0, end: 7, prefix: 'run', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'wizardHit',
      frames: this.anims.generateFrameNames('wizardBoss', { start: 0, end: 3, prefix: 'hit', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'magicBallAnimation',
      frames: this.anims.generateFrameNames('magicBall', { start: 1, end: 60, suffix: '.png' }),
      frameRate: 40,
      repeat: -1
    })
    this.anims.create({
      key: 'meteorAnimation',
      frames: this.anims.generateFrameNames('meteor', { start: 1, end: 60, suffix: '.png' }),
      frameRate: 40,
      repeat: -1
    })
    this.anims.create({
      key: 'fireBallAnimation',
      frames: this.anims.generateFrameNames('fireBall', { start: 1, end: 60, suffix: '.png' }),
      frameRate: 40,
      repeat: -1
    })
    this.anims.create({
      key: 'fireColumnIdle',
      frames: this.anims.generateFrameNames('fireColumn', { start: 4, end: 9,prefix: 'fire_column_medium_', suffix: '.png' }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'fireColumnCreate',
      frames: this.anims.generateFrameNames('fireColumn', { start: 1, end: 9,prefix: 'fire_column_medium_', suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'fireColumnDie',
      frames: this.anims.generateFrameNames('fireColumn', { start: 4, end: 14, prefix: 'fire_column_medium_' , suffix: '.png' }),
      frameRate: 10,
      repeat: 0
    })
  }
}


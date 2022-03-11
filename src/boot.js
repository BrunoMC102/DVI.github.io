import PlayerData from "./player/playerData.js";
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
    
    this.load.image('dungeon', 'Dungeon64.png');

    this.load.setPath('assets/json/');
    this.load.tilemapTiledJSON('tilemapJose', 'PruebaScrollJose.json');
    this.load.tilemapTiledJSON('tilemap1', 'Dungeon1.json');
    this.load.tilemapTiledJSON('tilemap2', 'Dungeon2.json');
    this.load.tilemapTiledJSON('tilemap3', 'Dungeon3.json');
    this.load.tilemapTiledJSON('tilemap4', 'Dungeon4.json');
    this.load.tilemapTiledJSON('tilemap5', 'Dungeon5.json');

    this.load.setPath('assets/atlas/');
    this.load.atlas('character', 'atlas.png', 'atlas.json');
    this.load.atlas('brainmole', 'brainmole.png', 'brainmole.json');

    this.load.atlas('characterScroll', 'movement.png', 'movement.json');
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
    this.scene.start('levelTopDown', {coordinates: {x: 0, y: 500}, playerData: new PlayerData()});
    //this.scene.start('levelScroll', {coordinates: {x: 0, y: 500}});
    //this.scene.start('level');
  }

    createAnimations() {
    //Top Down
    //Idle
    this.anims.create({key: 'idle-side', frames: [{ key: 'character', frame: 'idle1.png'}], duration: -1});
    this.anims.create({key: 'idle-down', frames: [{ key: 'character', frame: 'idle2.png'}], duration: -1});
    this.anims.create({key: 'idle-up', frames: [{ key: 'character', frame: 'idle3.png'}], duration: -1});

    //Walk
    this.anims.create({
      key: 'walk-side',
      frames: this.anims.generateFrameNames('character', {start: 1, end: 9, prefix: 'walk-side', suffix: '.png'}),
      frameRate: 15,
      repeat: -1
    });

    //Lateral
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
    
    
  //Enemy BrainMole
   this.anims.create({
    key:'mole',
    frames: this.anims.generateFrameNames('brainmole',{start: 7, end: 10, prefix: 'attack-', suffix: '.png'}),
    frameRate:10,
    repeat: -1


  })
  }

   
}

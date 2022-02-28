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
    
    this.load.image('scroll1', 'castle_tileset_part1.png');
    this.load.image('dungeon', 'Dungeon64.png');

    this.load.setPath('assets/json/');
    this.load.tilemapTiledJSON('tilemapJose', 'PruebaScrollJose.json');
    this.load.tilemapTiledJSON('tilemap1', 'Dungeon1.json');
    this.load.tilemapTiledJSON('tilemap2', 'Dungeon2.json');

    this.load.setPath('assets/atlas/');
    this.load.atlas('character', 'atlas.png', 'atlas.json');

    this.load.atlas('characterScroll', 'texture.png', 'texture.json');
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que reprsesenta el
   * nivel del juego
   */
  create() {
    //Para probar enemigo descomentar esto y comentar el de abajo
    //this.scene.start('lebel');

    //Para jugar en el modo vista lateral descomentar level
    this.scene.start('levelTopDown', {coordinates: {x: 0, y: 500}, playerData: {vSpeed: 300, speed: 300, health:6}});
    //this.scene.start('levelScroll', {coordinates: {x: 0, y: 500}});
    //this.scene.start('level');
  }

}
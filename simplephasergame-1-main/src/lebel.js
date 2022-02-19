import Enemy from './enemy.js';
import Player from './player.js';
import PlayerTopDown from './playerTopDown.js';
/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Lebel extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  a = null;
  constructor() {
    super({ key: 'lebel' });
    
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    //this.stars = 10;
    
    this.player = new PlayerTopDown(this, 200, 300);

    this.a = new Enemy(this, this.player, this.bases, 450, 200);
  
    
    //this.spawn();
  }

  /**
   * Genera una estrella en una de las bases del escenario
   * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
   * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
   */
  spawn(from = null) {
    Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
  }

  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
  /*starPickt (base) {
    this.player.point();
      if (this.player.score == this.stars) {
        this.scene.start('end');
      }
      else {
        const s = this.bases.children.entries;
        this.spawn(s.filter(o => o !== base));

      } //Hola

  }*/

  update(d,dt){
    //this.a.moveU();
    //new Platform(this, this.player, this.bases, Math.random()*900, Math.random()*500);
  }
    
    
    
  

}
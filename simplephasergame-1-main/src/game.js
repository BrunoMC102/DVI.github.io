import Boot from './boot.js';
import End from './end.js';
import Level from './level.js';
import Lebel from './lebel.js';
import LevelTopDown from './levelTopDown.js';
import LevelScroll from './levelScroll.js';


/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 960,
    scale: {
        // mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,

    scene: [Boot, Level, Lebel, LevelTopDown,LevelScroll, End],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400},
            debug: false
        }
    }
};

new Phaser.Game(config);

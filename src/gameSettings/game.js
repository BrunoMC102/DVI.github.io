import Boot from './boot.js';
import End from '../end.js';
import Level from '../levels/levelsTopDown/level.js';
import LevelTopDown from '../levels/levelsTopDown/levelTopDown.js';
import LevelTopDown2 from '../levels/levelsTopDown/levelTopDown2.js';
import LevelTopDown3 from '../levels/levelsTopDown/levelTopDown3.js';
import LevelTopDown4 from '../levels/levelsTopDown/levelTopDown4.js';
import LevelScroll from '../levels/levelsScroll/levelScroll.js';

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
    input: {
        gamepad: true
    },
    scene: [Boot, Level, LevelTopDown, LevelTopDown2, LevelTopDown3, LevelTopDown4, LevelScroll, End],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400},
            debug: false
        }
    }
};

new Phaser.Game(config);

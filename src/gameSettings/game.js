import Boot from './boot.js';
import End from '../end.js';
import LevelScroll from '../levels/levelsScroll/levelScroll.js';
import BeginningVillage from '../levels/beginningVillage.js';
import MainMenu from '../mainMenu.js';
import InitialLevel from '../levels/levelsTopDown/initialLevel.js';
import SceneManager from '../managers/sceneManager.js';
import Minimap from '../managers/minimap.js';
import PauseMenu from '../pauseMenu.js';
import LevelScrollFinal from '../levels/levelsScroll/levelScrollFinal.js';
import LevelScroll1 from '../levels/levelsScroll/levelScroll1.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */

let a = [Boot, LevelScroll, BeginningVillage, MainMenu, LevelScrollFinal, LevelScroll1, End];
let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 960,
    scale: {
        mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    input: {
        gamepad: true
    },

    scene: a,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2200},
            debug: true
        }
    }
};

new Phaser.Game(config);
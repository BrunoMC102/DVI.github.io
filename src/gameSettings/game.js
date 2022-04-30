import Boot from './boot.js';
import End from '../end.js';
import LevelScroll from '../levels/levelsScroll/levelScroll.js';
import BeginningVillage from '../levels/beginningVillage.js';
import MainMenu from '../mainMenu.js';
import InitialLevel from '../levels/levelsTopDown/initialLevel.js';
import SceneManager from '../managers/sceneManager.js';
import Minimap from '../managers/minimap.js';
import PauseMenu from '../pauseMenu.js';
import LevelScroll1 from '../levels/levelsScroll/levelScroll1.js';
import LevelScroll2 from '../levels/levelsScroll/levelScroll2.js';

import LevelScroll3 from '../levels/levelsScroll/levelScroll3.js';
import LevelScroll4 from '../levels/levelsScroll/levelScroll4.js';

import LevelBigNoDoors from '../levels/levelsTopDown/Dungeon Big/levelTopDownBigNoDoors.js';


/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */

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

    scene: [Boot, LevelScroll, BeginningVillage, MainMenu, LevelScroll2, LevelScroll1,LevelScroll4 ,End, LevelBigNoDoors, LevelScroll3],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2200 },
            debug: true,
            fps: 120
        }
    }
};

new Phaser.Game(config);
import Boot from './boot.js';
import End from '../end.js';
import Level from '../levels/levelsTopDown/level.js';
import LevelTopDown from '../levels/levelsTopDown/levelTopDown.js';
import LevelTopDown2 from '../levels/levelsTopDown/levelTopDown2.js';
import LevelTopDown3 from '../levels/levelsTopDown/levelTopDown3.js';
import LevelTopDown4 from '../levels/levelsTopDown/levelTopDown4.js';
import LevelTopDown5 from '../levels/levelsTopDown/levelTopDown5.js';
import LevelScroll from '../levels/levelsScroll/levelScroll.js';
import BeginningVillage from '../levels/beginningVillage.js';
import MainMenu from '../mainMenu.js';
import LevelPrueba1 from '../levels/levelsTopDown/levelPrueba1.js';
import LevelPrueba2 from '../levels/levelsTopDown/levelPrueba2.js';
import InitialLevel from '../levels/levelsTopDown/initialLevel.js';
import SceneManager from '../managers/sceneManager.js';
import Minimap from '../managers/minimap.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let creadorMapas = new SceneManager()

let a = [Boot, Level, LevelScroll,BeginningVillage,MainMenu , End];
creadorMapas.finalLevels[0].setLevels(creadorMapas.finalLevels.map(e => {return {grid:e.grid, doors: e.doors, iden: e.iden}}));
let c = a.concat(creadorMapas.finalLevels);
creadorMapas.finalLevels.push();
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

    scene: c,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400},
            debug: true
        }
    }
};

new Phaser.Game(config);
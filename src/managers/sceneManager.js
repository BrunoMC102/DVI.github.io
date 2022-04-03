import End from "../end.js"
import Boot from "../gameSettings/boot.js"
import BeginningVillage from "../levels/beginningVillage.js"
import LevelScroll from "../levels/levelsScroll/levelScroll.js"
import InitialLevel from "../levels/levelsTopDown/initialLevel.js"
import Level from "../levels/levelsTopDown/level.js"
import LevelEnd from "../levels/levelsTopDown/levelEnd.js"
import LevelEnd1 from "../levels/levelsTopDown/levelEnd1.js"
import LevelEnd2 from "../levels/levelsTopDown/levelEnd2.js"
import LevelEnd3 from "../levels/levelsTopDown/LevelEnd3.js"
import LevelPrueba1 from "../levels/levelsTopDown/levelPrueba1.js"
import LevelPrueba2 from "../levels/levelsTopDown/levelPrueba2.js"
import LevelTopDown from "../levels/levelsTopDown/levelTopDown.js"
import LevelTopDown1A from "../levels/levelsTopDown/levelTopDown1A.js"
import LevelTopDown2 from "../levels/levelsTopDown/levelTopDown2.js"
import LevelTopDown3 from "../levels/levelsTopDown/levelTopDown3.js"
import LevelTopDown4 from "../levels/levelsTopDown/levelTopDown4.js"
import LevelTopDown5 from "../levels/levelsTopDown/levelTopDown5.js"
import MainMenu from "../mainMenu.js"


export default class SceneManager {


    constructor() {
        this.sceneList = [LevelPrueba1, LevelPrueba2, LevelTopDown, LevelTopDown2, LevelTopDown3, LevelTopDown4, LevelTopDown5, LevelTopDown1A];
        this.endSceneList = [LevelEnd,LevelEnd2,LevelEnd1, LevelEnd3];
        this.levelCont = 0;
        this.generateMap();
    }

    generateMap() {
        this.levelList = this.createRandomizedList(this.sceneList);
        this.endLevelList = this.createRandomizedList(this.endSceneList);
        this.finalLevels = [];
        
            
            const escenaPadre = new InitialLevel();
            escenaPadre.grid = { x: 0, y: 0 };
            this.finalLevels.push(escenaPadre);
            this.addLevel(1, 0, 0, false, 1);
            this.addLevel(-1,0,0, false, 3);
            this.addLevel(0, 1, 0, false, 2);
            this.addLevel(0,-1,0, false, 0);
        

    }

    addLevel(x, y, profundidad, finished, sentido) {

        let i = -1;
        let imposible = false;
        let extractionList
        if (!finished)
            extractionList = this.levelList;
        else
            extractionList = this.endLevelList;

        let levelHijo = null;
        const thisKey = this.levelCont.toString();


        while (true) {
            if (!finished) {
                i += 1;
                if (i >= extractionList.length) {
                    if (imposible) {
                        extractionList = this.createRandomizedList(this.endSceneList);
                    }
                    else {
                        extractionList = this.createRandomizedList(this.sceneList);
                        i = 0;
                        imposible = true;
                    }
                }
            }
            else {
                i += 1;
                if (i >= extractionList.length) {
                    if (imposible) {
                        extractionList = this.createRandomizedList(this.sceneList);
                    }
                    else {
                        extractionList = this.createRandomizedList(this.endSceneList);
                        i = 0;
                        imposible = true;
                    }
                }
            }
            if (levelHijo != null) {
                //levelHijo.destroy();
            }
            levelHijo = new extractionList[i](thisKey);
            if(sentido == 0){
                if(!levelHijo.doors.south) continue;
            }
            else if(sentido == 1){
                if(!levelHijo.doors.west) continue;
            }
            else if(sentido == 2){
                if(!levelHijo.doors.north) continue;
            }
            else{
                if(!levelHijo.doors.east) continue;
            }
            
            const westLevel = this.finalLevels.find((e) => { e.grid.x == x - 1 && e.grid.y == y });
            if (westLevel != undefined) {
                if (levelHijo.doors.west != westLevel.doors.east) continue;
            }
            const southLevel = this.finalLevels.find((e) => { e.grid.x == x && e.grid.y == y + 1 });
            if (southLevel != undefined) {
                if (levelHijo.doors.south != southLevel.doors.north) continue;
            }
            const eastLevel = this.finalLevels.find((e) => { e.grid.x == x + 1 && e.grid.y == y });
            if (eastLevel != undefined) {
                if (levelHijo.doors.east != eastLevel.doors.west) continue;
            }
            const nortLevel = this.finalLevels.find((e) => { e.grid.x == x && e.grid.y == y - 1 });
            if (nortLevel != undefined) {
                if (levelHijo.doors.east != nortLevel.doors.west) continue;
            }
            break;
        }

        levelHijo.grid = { x: x, y: y };
        if (extractionList == this.levelList) {
            this.levelList.splice(i, 1);
            if (this.levelList.length == 0) {
                this.levelList = this.createRandomizedList(this.sceneList);
            }
        }

        let finalizar = finished;
        if (!finished) {
            if (Math.random() < profundidad * 0.2 - 0.8) {
                finalizar = true;
            }
        }
        this.levelCont += 1;
        this.finalLevels.push(levelHijo);
        const westLevel = this.finalLevels.find((e) => { return (e.grid.x == (x - 1) && e.grid.y == y)});
        if (levelHijo.doors.west) {
            if (westLevel != undefined) {
                levelHijo.changeSceneManager.west = westLevel.levelkey;
                westLevel.changeSceneManager.east = thisKey;
            }
            else {
                this.addLevel(x - 1, y, profundidad + 1, finalizar, 3);
            }
        }
        const southLevel = this.finalLevels.find((e) => { return (e.grid.x == x && e.grid.y == (y + 1)) });
        if (levelHijo.doors.south) {
            if (southLevel != undefined) {
                levelHijo.changeSceneManager.south = southLevel.levelkey;
                southLevel.changeSceneManager.north = thisKey;
            }
            else {
                this.addLevel(x, y + 1, profundidad + 1, finalizar, 2);
            }
        }
        const eastLevel = this.finalLevels.find((e) => {return (e.grid.x == (x + 1) && e.grid.y == y) });
        if (levelHijo.doors.east) {
            if (eastLevel != undefined) {
                levelHijo.changeSceneManager.east = eastLevel.levelkey;
                eastLevel.changeSceneManager.west = thisKey;
            }
            else {
                this.addLevel(x + 1, y, profundidad + 1, finalizar, 1);
            }
        }
        const nortLevel = this.finalLevels.find((e) => {return (e.grid.x == x && e.grid.y == (y - 1)) });
        if (levelHijo.doors.north) {
            if (nortLevel != undefined) {
                levelHijo.changeSceneManager.north = nortLevel.levelkey;
                nortLevel.changeSceneManager.south = thisKey;
            }
            else {
                this.addLevel(x, y - 1, profundidad + 1, finalizar, 0);
            }
        }
    }

    createRandomizedList(list) {
        const auxList = list.slice();
        let randomList = [];
        while (auxList.length != 0) {
            let index = Math.floor(Math.random() * auxList.length);
            randomList.push(auxList[index]);
            auxList.splice(index, 1);
        }
        return randomList;
    }
}
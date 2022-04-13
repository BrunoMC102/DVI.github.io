
import InitialLevel from "../levels/levelsTopDown/initialLevel.js"
import LevelEnd from "../levels/levelsTopDown/levelEnd.js"
import LevelEnd1 from "../levels/levelsTopDown/levelEnd1.js"
import LevelEnd2 from "../levels/levelsTopDown/levelEnd2.js"
import LevelEnd3 from "../levels/levelsTopDown/LevelEnd3.js"
import LevelTopDown1A from "../levels/levelsTopDown/Dungeon 1/levelTopDown1A.js"
import LevelTopDown1B_E from "../levels/levelsTopDown/Dungeon 1/levelTopDown1B-E.js"
import LevelTopDown1B_N from "../levels/levelsTopDown/Dungeon 1/levelTopDown1B-N.js"
import LevelTopDown1B_S from "../levels/levelsTopDown/Dungeon 1/levelTopDown1B-S.js"
import LevelTopDown1B_O from "../levels/levelsTopDown/Dungeon 1/levelTopDown1B-O.js"
import LevelTopDown1C_NE from "../levels/levelsTopDown/Dungeon 1/levelTopDown1C-NE.js"
import LevelTopDown1C_NS from "../levels/levelsTopDown/Dungeon 1/levelTopDown1C-NS.js"
import LevelTopDown1C_NO from "../levels/levelsTopDown/Dungeon 1/levelTopDown1C-NO.js"
import LevelTopDown1C_SE from "../levels/levelsTopDown/Dungeon 1/levelTopDown1C-ES.js"
import LevelTopDown1C_SO from "../levels/levelsTopDown/Dungeon 1/levelTopDown1C-SO.js"
import LevelTopDown1C_EO from "../levels/levelsTopDown/Dungeon 1/levelTopDown1C-EO.js"
import LevelTopDown1D_E from "../levels/levelsTopDown/Dungeon 1/levelTopDown1D-E.js"
import LevelTopDown1D_N from "../levels/levelsTopDown/Dungeon 1/levelTopDown1D-N.js"
import LevelTopDown1D_O from "../levels/levelsTopDown/Dungeon 1/levelTopDown1D-O.js"
import LevelTopDown1D_S from "../levels/levelsTopDown/Dungeon 1/levelTopDown1D-S.js"

import LevelBig from "../levels/levelsTopDown/levelBig.js"
import ChestRoomE from "../levels/levelsTopDown/chestRoomE.js"
import ChestRoomN from "../levels/levelsTopDown/chestRoomN.js"
import ChestRoomS from "../levels/levelsTopDown/chestRoomS.js"
import ChestRoomW from "../levels/levelsTopDown/chestRoomW.js"


export default class SceneManager {


    constructor() {
        this.sceneList = [LevelTopDown1A, LevelTopDown1C_NE, LevelTopDown1B_E, LevelTopDown1B_N, LevelTopDown1B_O, LevelTopDown1B_S, LevelTopDown1C_NS, LevelTopDown1C_NO, LevelTopDown1C_SE, LevelTopDown1C_SO, LevelTopDown1C_EO, LevelTopDown1D_E, LevelTopDown1D_N, LevelTopDown1D_S, LevelTopDown1D_O, 
                          
                          LevelBig];
        this.profundidadMinima = 1;
        this.profundidadMaxima = 3;

        this.endSceneList = [LevelEnd, LevelEnd2, LevelEnd1, LevelEnd3];
        this.chestLevelList = [ChestRoomE, ChestRoomN, ChestRoomS, ChestRoomW];
        this.levelCont = 0;
    }

    generateMap() {
        this.levelList = this.createRandomizedList(this.sceneList);
        this.endLevelList = this.createRandomizedList(this.endSceneList);
        this.finalLevels = [];

        const escenaPadre = new InitialLevel();
        escenaPadre.grid = { x: 0, y: 0 };
        this.finalLevels.push(escenaPadre);
        this.addLevel(1, 0, 1, false, 1);
        const westLevel = this.finalLevels.find((e) => {return (e.grid.x == -1) && e.grid.y == 0});

        if (westLevel == undefined) {
            this.addLevel(-1, 0, 1, false, 3);
        }

        const southLevel = this.finalLevels.find((e) => {return (e.grid.x == 0 && e.grid.y == 1)});

        if (southLevel == undefined) {
            this.addLevel(0, 1, 1, false, 2);
        }

        const nortLevel = this.finalLevels.find((e) => {return (e.grid.x == 0 && e.grid.y == -1)});

        if (nortLevel == undefined) {
            this.addLevel(0, -1, 1, false, 0);
        }

        this.finalLevels = this.addChestLevel(this.finalLevels);

        return this.finalLevels;

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
                        i = 0;
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
                        i = 0;
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
            if (sentido == 0) {
                if (!levelHijo.doors.south) continue;
            }
            else if (sentido == 1) {
                if (!levelHijo.doors.west) continue;
            }
            else if (sentido == 2) {
                if (!levelHijo.doors.north) continue;
            }
            else {
                if (!levelHijo.doors.east) continue;
            }

            const westLevel = this.finalLevels.find((e) => { return e.grid.x == (x - 1) && e.grid.y == y });
            if (westLevel != undefined) {
                if (levelHijo.doors.west != westLevel.doors.east) continue;
            }
            const southLevel = this.finalLevels.find((e) => { return e.grid.x == x && e.grid.y == (y + 1) });
            if (southLevel != undefined) {
                if (levelHijo.doors.south != southLevel.doors.north) continue;
            }
            const eastLevel = this.finalLevels.find((e) => { return e.grid.x == (x + 1) && e.grid.y == y });
            if (eastLevel != undefined) {
                if (levelHijo.doors.east != eastLevel.doors.west) continue;
            }
            const nortLevel = this.finalLevels.find((e) => { return e.grid.x == x && e.grid.y == (y - 1)});
            if (nortLevel != undefined) {
                if (levelHijo.doors.north != nortLevel.doors.south) continue;
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
            if (Math.random() < (profundidad * (1 / (this.profundidadMaxima - (this.profundidadMinima - 1))) - ((1 / (this.profundidadMaxima - (this.profundidadMinima - 1))) * (this.profundidadMinima - 1)))) {
                finalizar = true;
            }
        }
        this.levelCont += 1;
        this.finalLevels.push(levelHijo);
        const westLevel = this.finalLevels.find((e) => { return (e.grid.x == (x - 1) && e.grid.y == y) });
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
        const eastLevel = this.finalLevels.find((e) => { return (e.grid.x == (x + 1) && e.grid.y == y) });
        if (levelHijo.doors.east) {
            if (eastLevel != undefined) {
                levelHijo.changeSceneManager.east = eastLevel.levelkey;
                eastLevel.changeSceneManager.west = thisKey;
            }
            else {
                this.addLevel(x + 1, y, profundidad + 1, finalizar, 1);
            }
        }
        const nortLevel = this.finalLevels.find((e) => { return (e.grid.x == x && e.grid.y == (y - 1)) });
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


    addChestLevel(list) {
        const oneDoors = list.filter(e => { return e.doorNumbers == 1 });
        const moreDoors = list.filter(e => { return e.doorNumbers != 1 });
        let index = Math.floor(Math.random() * oneDoors.length);
        let salaSustituir = oneDoors[index];
        oneDoors.splice(index, 1);
        const chestLevel = this.swapChestLevel(this.chestLevelList, salaSustituir, true);

        if(oneDoors.length <= 0) return;

        index = Math.floor(Math.random() * oneDoors.length);
        salaSustituir = oneDoors[index];
        oneDoors.splice(index, 1);
        const mimicLevel = this.swapChestLevel(this.chestLevelList, salaSustituir, false);

        oneDoors.push(chestLevel);
        oneDoors.push(mimicLevel);
        return moreDoors.concat(oneDoors);
    }

    swapChestLevel(list, salaSustituir, isReal){
        const chestList = this.createRandomizedList(list);
        let chestLevel
        for(let i = 0; i < chestList.length; i++){
            chestLevel = new chestList[i](salaSustituir.levelkey, isReal);
            if(this.doorsEqual(chestLevel.doors,salaSustituir.doors)) break;
        }
        chestLevel.changeSceneManager = salaSustituir.changeSceneManager;
        chestLevel.grid = salaSustituir.grid;
        return chestLevel
    }
    swapLevel(list, salaSustituir){
        const chestList = this.createRandomizedList(list);
        let chestLevel
        for(let i = 0; i < chestList.length; i++){
            chestLevel = new chestList[i](salaSustituir.levelkey);
            if(this.doorsEqual(chestLevel.doors,salaSustituir.doors)) break;
        }
        chestLevel.changeSceneManager = salaSustituir.changeSceneManager;
        chestLevel.grid = salaSustituir.grid;
        return chestLevel
    }
    doorsEqual(doors1, doors2){
        return (doors1.north == doors2.north && doors1.south == doors2.south && doors1.west == doors2.west && doors1.east == doors2.east)
    }
}
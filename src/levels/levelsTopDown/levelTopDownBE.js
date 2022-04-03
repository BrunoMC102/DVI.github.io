import LevelParent from './levelParent.js';

export default class LevelTopDownBE extends LevelParent {

    constructor(key) {
      super(key, {
        north: true,
        south: true,
        west: true,
        east: false
      });
      this.iden = '3E';
    }
  
   
  
    
  
    setTileSet() {
      const map = this.make.tilemap({ key: 'tilemap1-4_Doors', tileWidth: 64, tileHeight: 64 });
      const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
      this.groundLayer = map.createLayer('Ground', tileset);
      this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
      this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
    }
  }
import LevelParent from './levelParent.js';

export default class LevelTopDownBN extends LevelParent {

    constructor(key) {
      super(key, {
        north: false,
        south: true,
        west: true,
        east: true
      });
      this.iden = '3N';
    }
  
   
  
    
    
  
    setTileSet() {
      const map = this.make.tilemap({ key: 'tilemap1-4_Doors', tileWidth: 64, tileHeight: 64 });
      const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
      this.groundLayer = map.createLayer('Ground', tileset);
      this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
      this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
    }
  }
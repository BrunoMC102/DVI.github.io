import LevelBigParent from './levelBigParent.js';


export default class LevelTopDownBigN extends LevelBigParent {

  constructor(key) {
    super(key, {
      north: true,
      south: false,
      west: false,
      east: false
    });
  }

  setTileSet() {
    const map = this.make.tilemap({ key: 'DungeonBigN', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
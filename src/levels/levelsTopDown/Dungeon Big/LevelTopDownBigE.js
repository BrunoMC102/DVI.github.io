import LevelBigParent from './levelBigParent.js';


export default class LevelTopDownBigE extends LevelBigParent {

  constructor(key) {
    super(key, {
      north: false,
      south: false,
      west: false,
      east: true
    });
  }

  setTileSet() {
    const map = this.make.tilemap({ key: 'DungeonBigE', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
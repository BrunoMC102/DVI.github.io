import LevelBigParent from './levelBigParent.js';


export default class LevelTopDownBigW extends LevelBigParent {

  constructor(key) {
    super(key, {
      north: false,
      south: false,
      west: true,
      east: false
    });
  }

  setTileSet() {
    const map = this.make.tilemap({ key: 'DungeonBigW', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
    this.groundLayer = map.createLayer('Ground', tileset);
    this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
  }
}
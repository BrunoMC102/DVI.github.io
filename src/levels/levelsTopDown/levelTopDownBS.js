import LevelParent from './levelParent.js';

export default class LevelTopDownBS extends LevelParent {

    constructor(key) {
      super(key, {
        north: true,
        south: false,
        west: true,
        east: true
      });
      this.iden = '3S';
    }
  
   
  
    createOthers(){
      new Chest(this, this.player, 450, 300);
      new Coin(this, this.player, 450, 200);
      new HealthPotion(this, this.player, 600, 200);
      new Health(this, this.player, 750, 200);
      new Arrow(this, this.player, 900, 200);
    }
  
    createEnemies(){
      return [new Minotaur(this, this.player, 500, 500), new Enemy(this, this.player, 700, 500)];
    }
    
  
    setTileSet() {
      const map = this.make.tilemap({ key: 'tilemap1-4_Doors', tileWidth: 64, tileHeight: 64 });
      const tileset = map.addTilesetImage('Dungeon64', 'dungeon');
      this.groundLayer = map.createLayer('Ground', tileset);
      this.voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
      this.wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });
    }
  }
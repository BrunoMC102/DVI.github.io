import PlayerTopDown from './playerTopDown.js';

export default class LevelTopDown extends Phaser.Scene {

  constructor() {
    super({ key: 'levelTopDown' });
  }

  create(data) {
    const map = this.make.tilemap({ key: 'tilemap', tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage('Dungeon64', 'dungeon');

    const groundLayer = map.createLayer('Ground', tileset);
    const voidLayer = map.createLayer('Void', tileset).setCollisionByProperty({ collides: true });
    const wallLayer = map.createLayer('Walls', tileset).setCollisionByProperty({ collides: true });

    //this.showWallHitbox(wallLayer, voidLayer);

    this.bases = this.add.group();

    this.playerData = this.cache.json.get('playerData');
    this.player = new PlayerTopDown(this, data.coordinates.x, data.coordinates.y);
    this.player.setPlayerData(this.playerData);

    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, voidLayer);
  }

  update() {
    //Si player pasa del pixel 1200 (el puente para ir a la habitacion de la derecha) entocnes empieza la nueva escena y se pasan las coordenadas donde empezara player
    if (this.player.x > 1200) {
      this.scene.start('lebel', {coordinates: {x: 100, y: 500}});
    }
  }

  showWallHitbox(wallLayer, voidLayer) {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    wallLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243,234,48,255),
      faceColor: new Phaser.Display.Color(40,39,37,255)
    });

    voidLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243,234,48,255),
      faceColor: new Phaser.Display.Color(40,39,37,255)
    });
  }
}
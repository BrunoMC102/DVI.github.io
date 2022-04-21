export default class Sword extends Phaser.GameObjects.Container {

    constructor(scene, x, y, player) {
        super(scene, x, y);
        this.setVisible(true);
        this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, 'sword');
        this.sprite.x = this.sprite.width / 2 - 5;
        this.sprite.y = this.sprite.height / 2 - 10;
        this.hitBoxes = [];
        this.add(this.sprite);
        let h = this.sprite.height;
        this.player = player;
        this.enemiesDamaged = [];
        this.createGroups();
        for (let i = 0; i < this.sprite.width; i += h) {
            this.createRectangleHitbox(i, h);
        }


    }


    createGroups() {
        this.EnemiesCollGroup = this.scene.add.group();
        this.scene.physics.add.overlap(this.EnemiesCollGroup, this.scene.enemies, (o1, o2) => {
            let encontrado = false
            this.enemiesDamaged.forEach(enemie => {
                if (enemie == o2)
                    encontrado = true;
            })
            if (encontrado) return;
            o2.hurt(this.player.playerData.damage);
            o2.knockback(o2.centerX() - this.player.x, o2.centerY() - this.player.y, 400)
            this.enemiesDamaged.push(o2)
        });

    }
    activateHitbox() {
        this.hitBoxes.forEach(a => { this.EnemiesCollGroup.add(a) })
        this.enemiesDamaged = [];
    }
    removeHitbox() {
        this.hitBoxes.forEach(a => this.EnemiesCollGroup.remove(a))
    }


    createRectangleHitbox(posX, dimension) {
        const a = new Phaser.GameObjects.Rectangle(this.scene, posX, 0, dimension, dimension, 0, 0);
        this.scene.add.existing(a);
        this.scene.physics.add.existing(a, false);
        a.body.pushable = false;
        a.body.allowGravity = false;
        this.add(a);
        this.hitBoxes.push(a);
    }




}
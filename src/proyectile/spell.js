import Basic_projectile from "./basic_projectile.js";


export default class Spell extends Basic_projectile{


    constructor(scene,x,y,vx,vy,dur,damage,enemy){
        super(scene,x,y,'mana',vx,vy,dur,damage);
        this.body.setBounce(1,1);
        this.scene.physics.add.overlap(this, this.scene.enemies, (o1,o2) => {
            if(enemy != undefined){
                if(o2 == enemy) return;
            }
            o2.spreadSpell(this.damage);
            o2.hurt(this.damage);
            
            o1.destroy();
        })
        this.scene.physics.add.collider(this, this.scene.wallLayer, (o1,o2) => {})

        
    }
    

}
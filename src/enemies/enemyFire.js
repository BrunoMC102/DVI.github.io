import ShootingEnemyParent from './shootingEnemyParent.js';
import Fire from '../proyectile/fire.js';


export default class EnemyFire extends ShootingEnemyParent{
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemy');
    this.Pv = 300;
    this.fireDirection = new Phaser.Math.Vector2(0,1);
    //this.shootTime = 1;
    this.firecont = new Phaser.GameObjects.Container(scene,this.sprite.width/2,this.sprite.height/2)
    this.add(this.firecont)
    this.firing = false;
    this.fuego;
    this.shootTime = 12;
    this.v = 75
  }
  creador(){
    let a 
    for(let i = 1; i < 6; i++){
        a = new Fire(this.scene,75*i,0,8);
        this.fuego = a;
        this.firecont.add(a);
        this.addtoGroups(a);
    }
  }

    attack(d,dt){
        if (this.firing){
            let dx = this.player.x - this.centerX();
            let dy = this.player.y - this.centerY();
            let ang =  this.firecont.rotation
            if(ang < 0) ang += (2*Math.PI);
            let dir = ang - new Phaser.Math.Vector2(dx,dy).angle();
            let f 
            if (dir < 0) dir += 2* Math.PI; 
            if (dir > Math.PI) f = 1
            else f = -1
            this.firecont.rotation += f/700;
            
        }
        super.attack(d,dt);
        
    }  
    
    moveU(){
        this.scene.physics.moveToObject(this, this.player, this.v);
    }

    fire(){
        this.v = this.v/2
        this.creador()
        let dx = this.player.x - this.centerX();
        let dy = this.player.y - this.centerY();
        const ang = new Phaser.Math.Vector2(dx,dy).normalize().angle()
        this.firecont.setRotation(ang);
        this.dir = 1;
        this.firing = true;
        
        this.scene.time.delayedCall(8000, ()=>{
            this.firing = false;
            this.v *= 2
        })
    }
    addtoGroups(projectile){
        this.playerOverlapGroup.add(projectile);
    }
}
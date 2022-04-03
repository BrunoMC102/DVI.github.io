export default class Minimap extends Phaser.GameObjects.Container{
    constructor(scene,x,y,levels, grid){
        super(scene,x,y)
        this.rectSize = 30;
        this.offset = 10;
        levels.forEach(element => {
            this.createRectangle(element.grid.x,element.grid.y, element.doors, element.iden, grid)
        });
        this.scene.add.existing(this);
        
    }

    createRectangle(x,y, doors, iden, grid){
        let color = 0x808080;
        if(x == grid.x && y == grid.y) color = 0xffffff;
        let rectangle = new Phaser.GameObjects.Rectangle(this.scene, x*(this.rectSize+this.offset),y*(this.rectSize+this.offset), this.rectSize, this.rectSize, color);
        this.add(rectangle);
        //let text = this.scene.add.text(x*(this.rectSize+this.offset),y*(this.rectSize+this.offset)-50, iden, {fontSize:20});
        //this.add(text);
        if(doors.north){
            rectangle = new Phaser.GameObjects.Rectangle(this.scene,x*(this.rectSize+this.offset),y*(this.rectSize+this.offset)-(this.rectSize/2)-this.offset/8, this.offset, this.offset/2, 0x0);
            this.add(rectangle);
        }
        
        if(doors.south){
            rectangle = new Phaser.GameObjects.Rectangle(this.scene,x*(this.rectSize+this.offset),y*(this.rectSize+this.offset)+(this.rectSize/2)+this.offset/4, this.offset, this.offset/2, 0x0);
            this.add(rectangle);
        }
        if(doors.west){
            //rectangle = new Phaser.GameObjects.Rectangle(this.scene,x*(this.rectSize+this.offset)-this.offset/2,y*(this.rectSize+this.offset)+this.rectSize/2-this.offset/2, this.offset/2, this.offset, 0x0);
            rectangle = new Phaser.GameObjects.Rectangle(this.scene,x*(this.rectSize+this.offset)-(this.rectSize/2)-this.offset/8,y*(this.rectSize+this.offset), this.offset/2, this.offset, 0x0);
            this.add(rectangle);
        }
        if(doors.east){
            //rectangle = new Phaser.GameObjects.Rectangle(this.scene,x*(this.rectSize+this.offset)+this.rectSize ,y*(this.rectSize+this.offset) + this.rectSize/2-this.offset/2, this.offset/2, this.offset, 0x0);
            rectangle = new Phaser.GameObjects.Rectangle(this.scene,x*(this.rectSize+this.offset)+(this.rectSize/2)+this.offset/4,y*(this.rectSize+this.offset), this.offset/2, this.offset, 0x0);
            this.add(rectangle);
        }
    }
}
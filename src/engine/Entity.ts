import { Vector, Box, Component, Collision, Canvas } from '../Engine';
import { Sprite, Tilemap, Collider } from '../Components';


let entities: Entity[] = [];


interface Template {
    components?: Component[];
}


/*---------------------------
  Default Export Class
---------------------------*/
export class Entity{
    //dimensional information
    private x:number; 
    private y:number; 
    private width:number; 
    private height:number;

    public uuid:number;

    // stores velocity vector
    public velocity:Vector = new Vector(0, 0);


    private collision: Collision;


    private components:Component[] = [];


    constructor([x, y, width, height]: number[], options: Template){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.components = options.components;

        this.uuid = Math.random();
        entities.push(this);
    }


    // updates position based on velocity or collision data
    private update(){
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        for(let component of this.components) {
            if(component.update) component.update();
        }

        if(this.collision) this.handleCollision();
    };

    // renders entity based on position and dimension data
    // if sprite is not set, renders rectangle
    private render(canvas: any){
        let sprite = <Sprite> this.getComponent(Sprite);
        if(sprite){
            if(sprite.loaded) sprite.render(canvas, this.box);
            return;
        }

        canvas.ctx.save();
        canvas.ctx.fillStyle = 'black';
        canvas.rectangle(this.box.list);
        canvas.ctx.restore();
    };


    // runs collision detector and corrects position if colliding
    private handleCollision(){
        this.collision = null;

        let other = this.collision.other;
        let norm_vel = this.velocity.normalized;

        if(norm_vel.x == -1) this.x = other.x - this.width;
        if(norm_vel.y == -1) this.y = other.y - this.height;
        if(norm_vel.x ==  1) this.x = other.x + other.width;
        if(norm_vel.y ==  1) this.y = other.y + other.height;
    };


    getComponent(type:any):Component{
        //@ts-ignore
        let component:Component = this.components.find((comp:Component) => {
            return (comp instanceof type);
        });
        return component;
    }
    
    setCollision(collision:Collision){
        this.collision = collision;
    }

    addComponent(type:any, args:[]){
        this.components.push(new type(...args));
    }

    destroy(){
        for(let i in entities){
            if(entities[i].uuid == this.uuid){
                delete entities[i];
            }
        }
    }

    get box():Box{
        return new Box([
            this.x, this.y, this.width, this.height
        ]);
    }
    get position():Vector{
        return new Vector(
            this.x, this.y
        );
    }
    get dimensions():Vector{
        return new Vector(
            this.width, this.height
        );
    }

    static Update(){
        for(let entity of entities) entity.update();
    }
    static Render(canvas: Canvas){
        for(let entity of entities) entity.render(canvas);
    }
    static get Boxes():Box[]{
        let data:Box[] = [];
        for(let entity of entities) data.push(entity.box);
        return data;
    }
    static get list():Entity[]{
        return entities;
    }
}

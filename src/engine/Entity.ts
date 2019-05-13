import { Vector, Box, Canvas, Collision } from '../Engine';
import { Sprite, Tilemap, Collider } from '../Components';


let entities: Entity[] = [];


/*---------------------------
  Default Export Class
---------------------------*/
export class Entity{
    //dimensional information
    private x:number; 
    private y:number; 
    private width:number; 
    private height:number;

    public id:number;

    private type:string;

    // stores velocity vector
    public velocity:Vector = new Vector(0, 0);

    private collider:Collider;

    private onCollisionEnters:Function[];
    private onCollisionExits:Function[];
    private onCollisions:Function[];

    public sprite:Sprite;

    constructor([x, y, width, height]: number[], options: any){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.type = options.type || 'static';

        let colliderSize:Vector;
        if(options.bounds){
            colliderSize = options.bounds;
        }
        else{
            colliderSize = new Vector(this.width, this.height);
        }
        if(!this.isStatic) {
            this.collider = new Collider(colliderSize, this);
        }

        this.id = Math.random();
        entities.push(this);
    }


    // updates position based on velocity or collision data
    private update(){
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        for(let collision of this.collider.getCollisions()){
            this.handleCollision(collision);
        }
    };

    // renders entity based on position and dimension data
    // if sprite is not set, renders rectangle
    private render(canvas: any){
        if(this.sprite){
            if(this.sprite.loaded) this.sprite.render(canvas, this.box);
            return;
        }

        canvas.ctx.save();
        canvas.ctx.fillStyle = 'black';
        canvas.rectangle(this.box.list);
        canvas.ctx.restore();
    };


    // runs collision detector and corrects position if colliding
    private handleCollision(collision:Collision){
        if(collision.exit){
            for(let fn of this.onCollisionExits){
                fn(collision);
            }
            return;
        }
        if(collision.enter){
            for(let fn of this.onCollisionEnters){
                fn(collision);
            }
        }
        for(let fn of this.onCollisions){
            fn(collision);
        }


        if(this.type != 'dynamic') return;
        if(collision.entity.type != 'static') return;

        let other = collision.entity;
        let norm_vel = this.velocity.normalized;

        if(norm_vel.x == -1) this.x = other.x - this.width;
        if(norm_vel.y == -1) this.y = other.y - this.height;
        if(norm_vel.x ==  1) this.x = other.x + other.width;
        if(norm_vel.y ==  1) this.y = other.y + other.height;
    };


    onCollisionEnter(fn:Function){
        this.onCollisionEnters.push(fn);
    }
    onCollisionExit(fn:Function){
        this.onCollisionExits.push(fn);
    }
    onCollision(fn:Function){
        this.onCollisions.push(fn);
    }

    destroy(){
        for(let i in entities){
            if(entities[i].id == this.id){
                delete entities[i];
            }
        }
    }

    get box():Box{
        return new Box([
            this.x, this.y, this.width, this.height
        ]);
    }
    get bounds():Box{
        return new Box([
            (this.x + this.width) / 2 - this.collider.size.x / 2,
            (this.y + this.height) / 2 - this.collider.size.y / 2,
            this.collider.size.x,
            this.collider.size.y
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
    get colliderSize():Vector{
        return new Vector(
            this.collider.size.x, 
            this.collider.size.y
        );
    }

    get isStatic():boolean{
        return (this.type == 'static');
    }
    get isKinematic():boolean{
        return (this.type == 'kinematic');
    }
    get isDynamic():boolean{
        return (this.type == 'dynamic');
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

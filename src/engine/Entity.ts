import { Vector, Box, Collision, Canvas } from '../Engine';
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

    public uuid:number;

    private isStatic:boolean;
    private isDynamic:boolean;
    private isKinematic:boolean;

    // stores velocity vector
    public velocity:Vector = new Vector(0, 0);

    private collision: Collision;
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

        this.uuid = Math.random();
        entities.push(this);
    }


    // updates position based on velocity or collision data
    private update(){
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if(this.collision) this.handleCollision();
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
    private handleCollision(){


        let other = this.collision.other;
        let norm_vel = this.velocity.normalized;

        if(norm_vel.x == -1) this.x = other.x - this.width;
        if(norm_vel.y == -1) this.y = other.y - this.height;
        if(norm_vel.x ==  1) this.x = other.x + other.width;
        if(norm_vel.y ==  1) this.y = other.y + other.height;
    };


    setCollision(collision:Collision){
        this.collision = collision;
    }

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

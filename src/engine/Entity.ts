import { Vector, Box, Canvas, Collision } from '../Engine';
import { Sprite, Tilemap, Collider } from '../Components';


let entities: Entity[] = [];


/*---------------------------
  Default Export Class
---------------------------*/
export class Entity{
    //dimensional information
    
    public box:Box;

    private lastPosition:Vector;

    public id:number;
    public tag:string;

    private type:string;

    // stores velocity vector
    public velocity:Vector = new Vector(0, 0);

    private collider:Collider;

    private onCollisionEnters:Function[] = [];
    private onCollisionExits:Function[]  = [];
    private onCollisions:Function[]      = [];

    public sprite:Sprite;

    constructor(box:Box, options: any){
        this.box = box || new Box([0, 0, 32, 32]);

        this.type = options.type || 'static';
        this.tag = options.tag || Math.random().toString();

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
        if(this.isStatic) return;

        this.lastPosition = new Vector(this.x, this.y);

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.collider.update();

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
        canvas.ctx.strokeStyle = 'black';
        canvas.ctx.strokeRect(...this.box.list);
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

        let other = collision.entity.bounds;
        // let norm_vel = this.velocity.normalized;
        // console.log(norm_vel);

        // if(norm_vel.x == -1){
        //     this.x = other.x + other.width;
        //     this.velocity.x = 0;
        // }
        // if(norm_vel.y == -1){
        //     this.y = other.y + other.height;
        //     this.velocity.y = 0;
        // }
        // if(norm_vel.x ==  1){
        //     this.x = other.x - this.width;
        //     this.velocity.x = 0;
        // }
        // if(norm_vel.y ==  1){
        //     this.y = other.y - this.height;
        //     this.velocity.y = 0;
        // }

        let last_x = this.lastPosition.x; 
        let last_y = this.lastPosition.y;

        if( last_y + this.height > other.y && 
        last_y < other.y + other.height ){
            this.correct_x(last_x, other);
        }
        else if( last_x + this.width > other.x && 
        last_x < other.x + other.width ){
            this.correct_y(last_y, other);
        }
    }

    private correct_x(last_x:number, other:Box){
        console.log("correcting x");
        if( last_x + this.width < other.x ){
            this.x = other.x - this.width;
        }
        else if( last_x > other.x + other.width ) {
            this.x = other.x + other.width;
        }
    }
    private correct_y(last_y:number, other:Box){
        if( last_y + this.height < other.y ){
            this.y = other.y - this.height;
        }
        else if( last_y > other.y + other.height ) {
            this.y = other.y + other.height;
        }
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
            if(entities[i].id == this.id){
                delete entities[i];
            }
        }
    }

    setPosition(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    get bounds():Box{
        if(this.isStatic) return this.box;
        return new Box([
            this.x + this.width / 2 - this.collider.size.x / 2,
            this.y + this.height / 2 - this.collider.size.y / 2,
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

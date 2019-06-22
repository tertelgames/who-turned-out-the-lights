import Box from './Box';
import BoxCollider from './BoxCollider';
import Canvas from './Canvas';
import Game from './Game';
import Sprite from './Sprite';
import Vector from './Vector';


type Options = {
    type?:'static'|'dynamic'|'kinematic';
    sprite?:Sprite;
}


let entities:{[key:number]: Entity} = {};

export default class Entity {
    private static id_count:number = 0;


    readonly id:number;
    readonly boxCollider:BoxCollider;
    readonly type:'static'|'dynamic'|'kinematic';


    public velocity:Vector = new Vector(0, 0);
    public bounds:Box;
    public sprite:Sprite;


    constructor(x:number, y:number, w:number, h:number, options:Options = {}) {
        this.id = Entity.id_count++;
        entities[this.id] = this;

        this.bounds = new Box(x, y, w, h);

        this.type = options.type || 'static';
        this.sprite = options.sprite || null;
        
        if (this.type != 'static') {
            this.boxCollider = new BoxCollider(this);
        }
    }


    update() {
        this.bounds.x += this.velocity.x;
        this.bounds.y += this.velocity.y;
    }

    render(canvas:Canvas) {
        canvas.draw.rectangle(...this.bounds.toArray());
    }


    delete() {
        delete entities[this.id];
    }


    static Update() {
        Entity.List.forEach((entity:Entity) => {
            entity.update();
        });
    }
    static Render(canvas:Canvas) {
        Entity.List.forEach((entity:Entity) => {
            entity.render(canvas);
        });
    }

    static Delete(id:number) {
        delete entities[id];
    }


    static get List():Entity[] {
        return Object.keys(entities).map((key:string) => {
            return entities[Number(key)];
        });
    }
}

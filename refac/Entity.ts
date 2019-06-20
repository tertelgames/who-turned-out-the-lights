import Box from './Box';
import BoxCollider from './BoxCollider';
import Sprite from './Sprite';


type Options = {
    type?:'static'|'dynamic'|'kinematic';
    sprite?:Sprite;
}


let entities:{[key:number]: Entity} = {};

export default class Entity {
    private static id_count:number = 0;


    readonly id:number;
    readonly boxCollider:BoxCollider;


    public bounds:Box;
    public sprite:Sprite;


    constructor(x:number, y:number, w:number, h:number, options:Options = {}) {
        this.id = Entity.id_count++;
        entities[this.id] = this;

        this.bounds = new Box(x, y, w, h);
        this.sprite = options.sprite || null;
        this.boxCollider = new BoxCollider(this);
    }


    update() {

    }

    render() {

    }


    static Update() {
        Entity.List.forEach((entity:Entity) => {
            entity.update();
        });
    }
    static Render() {
        Entity.List.forEach((entity:Entity) => {
            entity.render();
        });
    }

    static Delete(id:number) {
        delete entities[id];
    }


    static get List():Entity[] {
        return Object.keys(entities).map((key:string) => {
            return entities[key];
        });
    }
}

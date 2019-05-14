import { Box, Entity, Vector, Collision } from '../Engine';


export class Collider{
    public size:Vector
    private entity: Entity;

    private collisions:Collision[] = [];

    constructor(size:Vector, entity: Entity){
        this.size = size;
        this.entity = entity;
    }

    update(){
        for(let i in this.collisions){
            if(this.collisions[i].exit){
                this.collisions.splice(Number(i));
                break;
            }
            if(this.collisions[i].enter){
                this.collisions[i].enter = false;
            }
        }
        for(let other of Entity.list){
            if(other.id == this.entity.id) continue;
            let collision = this.getCollision(other.id);
            if(Box.overlap(other.bounds, this.entity.bounds)){
                if(!collision){
                    collision = new Collision(other);
                    collision.enter = true;
                    this.collisions.push(collision);
                    continue;
                }
            }
            if(collision) collision.exit = true;
        }
    }

    getCollisions(){
        return this.collisions;
    }
    getCollision(id:number):Collision{
        return this.collisions.find((collision:Collision) => {
            return collision.id == id;
        });
    }
}

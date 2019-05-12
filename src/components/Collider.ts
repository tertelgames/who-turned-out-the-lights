import { Box, Entity, Collision, Vector } from '../Engine';

export class Collider{
    public size:Vector
    private entity: Entity;
    constructor(size:Vector, entity: Entity){
        this.size = size;
        this.entity = entity;
    }
    update(){
        for(let other of Entity.list){
            if(Box.overlap(other.bounds, this.entity.bounds)){
                this.entity.setCollision(new Collision(
                    this.entity, other
                ));
            }
        }
    }
}

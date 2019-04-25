import { Box, Entity, Collision, Component } from '../Engine';

export class Collider implements Component{
    public bounds: Box;
    private _entity: Entity;
    constructor(bounds: Box, entity: Entity){
        this.bounds = bounds;
        this._entity = entity;
    }
    update(){
        for(let other of Entity.list){
            if(Box.overlap(other.box, this.entity.box)){
                this.entity.setCollision(new Collision(
                    this.entity, other
                ));
            }
        }
    }
    get entity(){
        return this._entity;
    }
}

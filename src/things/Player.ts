import GameObject from '../GameObject';
import { Entity, Input, Vector } from '../Engine';

export default class Player extends GameObject {
    private entity:Entity;
    private speed:number = 2;
    constructor(){
        super();
        this.entity = new Entity([50, 50, 32, 32], {
            type: 'dynamic',
            tag: 'player'
        });
    }
    update(){
        this.entity.velocity = Vector.zero;
        if(Input.Get(37)) this.entity.velocity.x -= this.speed;
        if(Input.Get(38)) this.entity.velocity.y -= this.speed;
        if(Input.Get(39)) this.entity.velocity.x += this.speed;
        if(Input.Get(40)) this.entity.velocity.y += this.speed;
    }
}

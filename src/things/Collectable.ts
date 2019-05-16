import GameObject from '../GameObject';
import { Entity, Collision } from '../Engine';
import Game from '../Game';

export default class Collectable extends GameObject {
    private entity:Entity;
    constructor(){
        super();
        this.entity = new Entity([50, 50, 16, 16], {type: 'kinematic'});
        this.entity.onCollisionExit(this.relocate.bind(this));
    }
    private relocate(col:Collision){
        if(col.tag != "player") return;
        this.entity.setPosition(
            Math.floor(Math.random() * Game.canvas.width),
            Math.floor(Math.random() * Game.canvas.height),
        );
    }
};

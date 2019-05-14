import { Entity } from '../Engine';

export class Collision{
    public id:number;
    public tag:string;
    public entity:Entity;
    public exit:boolean;
    public enter:boolean;
    constructor(entity:Entity){
        this.id = entity.id;
        this.tag = entity.tag;
        this.entity = entity;
    }
}

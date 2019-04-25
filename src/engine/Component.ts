import { Entity } from '../Engine';

export interface Component{
    update?():void;
    entity:Entity;
}

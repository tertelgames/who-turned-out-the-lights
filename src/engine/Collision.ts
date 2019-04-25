import { Box, Entity } from '../Engine';

export  class Collision{
    public main: Entity;
    public other: Entity;

    constructor(main:Entity, other:Entity){
        this.main = main;
        this.other = other;
    }
}

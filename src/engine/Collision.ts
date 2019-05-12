import { Box, Entity } from '../Engine';

export  class Collision{
    public main: Entity;
    public other: Entity;

    public enter:boolean;
    public exit:boolean;

    constructor(main:Entity, other:Entity){
        this.main = main;
        this.other = other;
    }
}

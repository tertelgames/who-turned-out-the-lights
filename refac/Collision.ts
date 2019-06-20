import Entity from './Entity';
import Game from './Game';
import Vector from './Vector';

export default class Collision {
    readonly entity:Entity;
    readonly other:Entity;
    readonly side:Vector;

    private enter:boolean;
    private exit:boolean;

    constructor(entity:Entity, other:Entity, side:Vector) {
        this.entity = entity;
        this.other = other;
        this.side = side;

        this.enter = true;
    }

    isEnter():boolean {
        return this.enter;
    }
    isExit():boolean {
        return this.exit;
    }

    setNoEnter() {
        this.enter = false;
    }
    setExit() {
        this.exit = true;
    }
    setNoExit() {
        this.exit = false;
    }


}

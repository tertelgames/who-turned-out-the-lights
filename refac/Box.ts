import Vector from './Vector';

export default class Box {
    public x:number;
    public y:number;
    public w:number;
    public h:number;

    constructor(x:number, y:number, w:number, h:number){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    toArray():[number, number, number, number] {
        return [this.x, this.y, this.w, this.h];
    }

    get center():Vector {
        return new Vector(
            (this.x + this.w) / 2,
            (this.y + this.h) / 2
        );
    }

    getCorners():Vector[] {
        return [
            new Vector(this.x, this.y),
            new Vector(this.x + this.w, this.y),
            new Vector(this.x + this.w, this.y + this.h),
            new Vector(this.x, this.y + this.h)
        ];
    }
    getSides():number[] {
        return [
            this.x,
            this.y,
            this.x + this.w,
            this.y + this.h
        ];
    }
}

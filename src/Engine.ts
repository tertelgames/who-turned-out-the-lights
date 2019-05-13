export class Vector{
    public x: number;
    public y: number;
    constructor(x: number, y: number){
        this.x = x; this.y = y;
    }
    get normalized():Vector{
        return new Vector(
            this.x / Math.abs(this.x),
            this.y / Math.abs(this.y)
        );
    };
    static get zero(){
        return new Vector(0, 0);
    }
}

export class Box{
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor([x, y, width, height]:number[]){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get list():[number, number, number, number]{
        return [
            this.x, this.y, this.width, this.height
        ]
    }
    static overlap(box1: Box, box2: Box): boolean{
        if(    ( box1.x + box1.width > box2.x  )
            && ( box1.x < box2.x + box2.width  )
            && ( box1.y + box1.height > box2.y )
            && ( box1.y < box2.y + box2.height )){
            return true;
        }
        else return false;
    }
}

export * from './engine/Entity';
export * from './engine/Canvas';
export * from './engine/Collision';
export * from './engine/Input';

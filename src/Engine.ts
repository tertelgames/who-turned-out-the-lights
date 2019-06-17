export class Vector{
    public x: number;
    public y: number;
    constructor(x: number, y: number){
        this.x = x; this.y = y;
    }
    get normalized():Vector{
        let x = 0;
        if(this.x > 0) x = 1;
        if(this.x < 0) x = -1;

        let y = 0;
        if(this.y > 0) y = 1;
        if(this.y < 0) y = -1;

        return new Vector(x, y);
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

    get right():number{
        return this.x + this.width;
    }
    get bottom():number{
        return this.y + this.height;
    }

    get list():[number, number, number, number]{
        return [
            this.x, this.y, this.width, this.height
        ]
    }

    static overlap(box1: Box, box2: Box): boolean{
        if( box1.right < box2.x  || box1.x > box2.right ||
            box1.bottom < box2.y || box1.y > box2.bottom )
        {
            return false;
        }
        else return true;
    }
}

export * from './engine/Entity';
export * from './engine/Canvas';
export * from './engine/Collision';
export * from './engine/Input';
export * from './engine/Component';

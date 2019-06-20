export default class Vector {
    public x:number;
    public y:number;


    constructor(x: number, y:number){
        this.x = x;
        this.y = y;
    }


    add(factor:Vector|number) {
        if (factor instanceof Vector) {
            this.x += factor.x;
            this.y += factor.y;
        }
        else {
            this.x += factor;
            this.y += factor;
        }
    }
    sub(factor:Vector|number) {
        if (factor instanceof Vector) {
            this.x -= factor.x;
            this.y -= factor.y;
        }
        else {
            this.x -= factor;
            this.y -= factor;
        }
    }
    mul(factor:Vector|number) {
        if (factor instanceof Vector) {
            this.x *= factor.x;
            this.y *= factor.y;
        }
        else {
            this.x *= factor;
            this.y *= factor;
        }
    }
    div(factor:Vector|number) {
        if (factor instanceof Vector) {
            this.x /= factor.x;
            this.y /= factor.y;
        }
        else {
            this.x /= factor;
            this.y /= factor;
        }
    }


    static readonly LEFT :Vector = new Vector(-1,  0);
    static readonly UP   :Vector = new Vector( 0, -1);
    static readonly RIGHT:Vector = new Vector( 1,  0);
    static readonly DOWN :Vector = new Vector( 0,  1);
}

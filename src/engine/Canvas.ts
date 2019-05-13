import { Box } from '../Engine';

export class Canvas{
    private _canvas:HTMLCanvasElement;
    public  _ctx:CanvasRenderingContext2D;
    private x:number = 0;
    private y:number = 0;

    public background:string = 'white';

    constructor([w, h]: number[]){
        this._canvas = <HTMLCanvasElement> document.createElement('canvas');

        this._canvas.width  = w;
        this._canvas.height = h;

        document.body.insertBefore(this._canvas, null);

        this._ctx = this.canvas.getContext('2d');
    }


    rectangle([x, y, width, height]:number[]){
        this.ctx.fillRect(x, y, width, height);
    }
    drawBackground(){
        this.ctx.save();
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    }
    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    setX(x:number){
        this.ctx.translate(this.x - x, 0);
        this.x = x;
    }
    setY(y:number){
        this.ctx.translate(0, this.y - y);
        this.x = y;
    }

    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }


    get width():number { 
        return this.canvas.width; 
    }
    get height():number {
        return this.canvas.height;
    }
    get ctx():CanvasRenderingContext2D{
        return this._ctx;
    }
    get canvas():HTMLCanvasElement{
        return this._canvas;
    }
}

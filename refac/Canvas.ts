import Draw from './Draw';

export default class Canvas{
    readonly canvas:HTMLCanvasElement;
    readonly ctx:CanvasRenderingContext2D;
    readonly draw:Draw;
    private x:number = 0;
    private y:number = 0;

    private background:string = 'white';

    constructor(w:number, h:number){
        this.canvas = <HTMLCanvasElement> document.createElement('canvas');

        this.canvas.width  = w;
        this.canvas.height = h;

        document.body.insertBefore(this.canvas, null);

        this.ctx = this.canvas.getContext('2d');

        this.draw = new Draw(this);
    }

    reset(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    }


    setX(x:number){
        this.ctx.translate(this.x - x, 0);
        this.x = x;
    }
    setY(y:number){
        this.ctx.translate(0, this.y - y);
        this.x = y;
    }

    setBackground(bg:string){
        this.background = bg;
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
}

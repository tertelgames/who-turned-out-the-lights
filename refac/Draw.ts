import Canvas from './Canvas';

export default class Draw {
    private canvas:Canvas;

    constructor(canvas:Canvas){
        this.canvas = canvas;
    }

    rectangle(x:number, y:number, w:number, h:number){
        this.canvas.ctx.fillRect(x, y, w, h);
    }
}

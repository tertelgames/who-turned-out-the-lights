import { Canvas, Entity } from './Engine';

export default class Game{
    private framerate:number;
    private running:boolean;
    private _canvas:Canvas;

    constructor(){
        this.framerate = 1000 / 60;
        this.running = true;
        this._canvas = new Canvas([768, 480]);

        this.update();
        this.render();
    }

    render(){
        this.canvas.clear();
        Entity.Render(this.canvas);
        if(this.running) requestAnimationFrame(this.render.bind(this));
    }

    update(){
        Entity.Update();
        if(this.running) setTimeout(this.update.bind(this), this.framerate);
    }

    start(){
        this.running = true;
        this.update();
        this.render();
    }

    stop(){
        this.running = false;
    }

    get canvas():Canvas{
        return this._canvas;
    }
};

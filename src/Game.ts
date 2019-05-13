import { Canvas, Entity, Input } from './Engine';
import GameObject from './GameObject';
import Hierarchy from './Hierarchy';

export default class Game{
    private framerate:number;
    private running:boolean;
    private _canvas:Canvas;

    constructor(){
        this.framerate = 1000 / 60;
        this._canvas = new Canvas([768, 480]);

        this.start();
    }

    render(){
        this.canvas.clear();
        this.canvas.drawBackground();
        Entity.Render(this.canvas);
        if(this.running) requestAnimationFrame(this.render.bind(this));
    }

    update(){
        Entity.Update();
        GameObject.update();
        Input.clear();
        if(this.running) setTimeout(this.update.bind(this), this.framerate);
    }

    start(){
        this.running = true;
        this.update();
        this.render();
        Hierarchy[0]();
        console.log(Entity.list);
    }

    stop(){
        this.running = false;
    }

    get canvas():Canvas{
        return this._canvas;
    }
};

import { Canvas, Entity, Input } from './Engine';
import GameObject from './GameObject';
import Hierarchy from './Hierarchy';

let framerate:number;
let running:boolean;
let canvas:Canvas;

let Game = {
    render(){
        this.canvas.clear();
        this.canvas.drawBackground();
        Entity.Render(this.canvas);
        if(running) requestAnimationFrame(this.render.bind(this));
    },

    update(){
        Entity.Update();
        Hierarchy.update();
        Input.clear();
        if(running) setTimeout(this.update.bind(this), framerate);
    },

    start(){
        running = true;
        this.update();
        this.render();
    },

    stop(){
        running = false;
    },

    get canvas():Canvas{
        return canvas;
    }
};

export default Game;

framerate = 1000 / 60;
canvas = new Canvas([768, 480]);

Game.start();

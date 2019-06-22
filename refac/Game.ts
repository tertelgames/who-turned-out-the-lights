//Game.ts

import Entity from './Entity';
import Canvas from './Canvas';
import Input from './Input';


export default class Game {
    readonly canvas:Canvas;

    private running:boolean;

    public updateRate:number = 1000 / 30;

    constructor(canvas:Canvas) {
        this.canvas = canvas;
    }


    Start() {
        this.running = true;
        this.Update();
        this.Render();
    }
    Stop() {
        this.running = false;
    }

    Update() {
        Entity.Update();

        if (this.running) {
            setTimeout(this.Update.bind(this), this.updateRate);
        }

        Input.clear();
    }
    Render() {
        this.canvas.clear();
        this.canvas.drawBackground();

        Entity.Render();

        if (this.running) {
            requestAnimationFrame(this.Render.bind(this));
        }
    }
};

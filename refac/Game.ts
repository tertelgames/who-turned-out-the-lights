//Game.ts

import Entity from './Entity';

type Updatable = {
    update();
}
type Renderable = {
    render();
}


class Game {
    private running:boolean;

    public updateRate:number = 1000 / 30;

    constructor() {
        this.Start();
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
    }
    Render() {
        Entity.Render();

        if (this.running) {
            requestAnimationFrame(this.Render.bind(this));
        }
    }
};

let game = new Game();

export default game;

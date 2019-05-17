import { Canvas } from '../Engine';

let list:Component[] = [];

export class Component {
    constructor(){
        list.push(this);
    }
    update(){

    }
    render(canvas: Canvas){

    }

    static Update(){
        list.forEach((component) => {
            component.update();
        });
    }
    static Render(canvas:Canvas){
        list.forEach((component) => {
            component.render(canvas);
        });
    }
};

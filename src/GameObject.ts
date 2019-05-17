import { Canvas } from './Engine';
import Hierarchy from './Hierarchy';

export default class GameObject{
    private id: number;
    constructor(){
        this.id = Math.random();
        Hierarchy.add(this);
    }
    update(){

    }
    render(canvas:Canvas){

    }
    destroy(){
        Hierarchy.destroy(this.id);
    }

    getId():number{
        return this.id;
    }
}

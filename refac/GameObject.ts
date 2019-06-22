import Vector from './Vector';
import Component from './Component';

export default class GameObject extends Component {
    private static gameObjects:GameObject[] = [];

    public position:Vector;

    public children:Component[];

    update(){

    }
}

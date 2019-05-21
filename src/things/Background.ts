import GameObject from '../GameObject';
import { Tilemap } from '../Components';
import map from '../tilemaps/test_level.json';

export default class Background extends GameObject {
    constructor(){
        super();
        let tilemap = new Tilemap(map);
        Tilemap.solidifyLayer(tilemap, 0);
    }
}

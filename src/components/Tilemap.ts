import { 
    Box, Vector,  Canvas, Entity
}  from '../Engine';

import { Collider, Sprite } from '../Components';

interface RawLayer{
    data:number[];
    width:number;
    height:number;
    id:number;
    visible:boolean;
}

interface Layer{
    rows:number[][];
    cols:number[][];
}

function reduceLayerData(raw_layer:RawLayer):Layer{
    let layer:Layer = {
        rows: [],
        cols: []
    };
    while(layer.rows.length < raw_layer.height){
        layer.rows.push(raw_layer.data.slice(
            layer.rows.length * raw_layer.width,
            (layer.rows.length + 1) * raw_layer.width
        ));
    }
    while(layer.cols.length < raw_layer.width){
        layer.cols.push([]);
        layer.rows[layer.cols.length - 1].forEach((tile) => {
            layer.cols[layer.cols.length - 1].push(tile);
        });
    }
    return layer;
}

function getRect(layer:Layer, row:number, col:number):Box{
    let rect:Box = new Box([0, 0, 0, 0]);

    for(rect.width = 0; layer.rows[row][col] !== 0; rect.width++);

    return rect;
}

function getLeastRects(raw_layer:RawLayer):Box[]{
    let boxes:Box[] = [];

    let checkedTiles:{[key:string]:boolean} = {};
    
    let layer = reduceLayerData(raw_layer);
    layer.rows.forEach((row, y) => {
        row.forEach((tile, x) => {

        });
    });

    return boxes;
}

export class Tilemap {
    public width:number;
    public height:number;
    public tile_dimensions:Vector;

    public layers:RawLayer[];

    public sprite:Sprite;

    constructor(map:any){
        this.width = map.width;
        this.height = map.height;
        this.tile_dimensions = new Vector(
            map.tilewidth, map.tileheight
        );

        this.layers = map.layers.map((layer:any) => {
            return {
                data    : layer.data,
                width   : layer.width,
                height  : layer.height,
                id      : layer.id,
                visible : layer.visible
            };
        });
    }

    render(canvas:Canvas){
        this.sprite.render(canvas, new Box([0, 0, this.width, this.height]));
    }

    static solidifyLayer(map: Tilemap, layerIndex:number){
        let layer:RawLayer = map.layers[layerIndex];
        let rects:Box[] = getLeastRects(layer);
    }
}

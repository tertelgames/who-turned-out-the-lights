import { 
    Box, Vector,  Canvas, Entity, Component
}  from '../Engine';

import { Collider, Sprite } from '../Components';

class Layer{
    public data:number[];
    public width:number;
    public height:number;
    public id:number;
    public visible:boolean;
    public rows:number[][] = [];
    constructor(
        data:number[],
        width:number,
        height:number,
        id:number,
        visible:boolean
    ){
        while(this.rows.length < height){
            this.rows.push(data.slice(
                this.rows.length * width,
                (this.rows.length + 1) * width
            ));
        }
        this.data = data;
        this.width = width;
        this.height = height;
        this.id = id;
        this.visible = visible;
    }
}

function rowIsFull(
    layer:Layer, 
    x:number, y:number,
    width:number, height: number, 
){
    let row = layer.rows[y + height].slice(x, x + width); 
    return !row.includes(0);
}

function getRect(layer:Layer, x:number, y:number):Box{
    let rect:Box = new Box([x, y, 0, 0]);


    while(layer.rows[y][x + rect.width]){
        rect.width++;
    }
    while(rowIsFull(layer, x, y, rect.width, rect.height)){
        rect.height ++;
        if(y + rect.height >= layer.rows.length) break;
    }

    return rect;
}

function checkTiles(layer:Layer, box:Box){
    for(let y = box.y; y < box.y + box.height; y++){
        for(let x = box.x; x < box.x + box.width; x++){
            layer.rows[y][x] = 0;
        }
    }
}

function getLeastRects(layer:Layer):Box[]{
    let boxes:Box[] = [];

    layer.rows.forEach((row, y) => {
        row.forEach((tile, x) => {
            if(tile === 0) return;
            let box:Box = getRect(layer, x, y);
            checkTiles(layer, box);
            boxes.push(box);
        });
    });

    return boxes;
}



export class Tilemap {
    public width:number;
    public height:number;
    public tile_dimensions:Vector;

    public layers:Layer[];

    public sprite:Sprite;

    constructor(map:any){
        this.width = map.width;
        this.height = map.height;
        this.tile_dimensions = new Vector(
            map.tilewidth, map.tileheight
        );

        this.layers = map.layers.map((layer:any) => {
            return new Layer( 
                layer.data,
                layer.width,
                layer.height,
                layer.id,
                layer.visible
            );
        });
    }

    render(canvas:Canvas){
        this.sprite.render(canvas, new Box([0, 0, this.width, this.height]));
    }

    static solidifyLayer(map: Tilemap, layerIndex:number){
        let layer:Layer = map.layers.slice()[layerIndex];
        let rects:Box[] = getLeastRects(layer);
        rects.forEach((box) => {
            new Entity([
                box.x * map.tile_dimensions.x,
                box.y * map.tile_dimensions.y,
                box.width * map.tile_dimensions.x,
                box.height * map.tile_dimensions.y
            ], {
                tag: 'tile',
                type: 'static'
            });
        });
    }
}

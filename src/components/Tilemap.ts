import { 
    Box, Vector, Component, Canvas, Entity
}  from '../Engine';

import { Collider, Sprite } from '../Components';


function getLeastRects(layer:number[], layerWidth:number):Box[]{
    let rects:Box[] = [];
    let checkedTiles:any = {};
    for(let stringIndex in layer){
        let index = <number><any>stringIndex;
        if(!layer[index]) continue;
        if(checkedTiles[index]) continue;
        let x:number = index % layerWidth;
        let y:number = Math.floor(index / layerWidth);
        let width:number = 0;
        let height:number = 0;
        for(let col = index; layer[col]; col++){
            if(col % layerWidth === 0) break;
            checkedTiles[col] = true;
            width++;
        }
        for(let rowStart = index; layer[rowStart]; rowStart += layerWidth){
            let row:number[] = layer.slice(rowStart, rowStart + width);
            //@ts-ignore
            if(row.includes(0)) break;
            for(let i of row) checkedTiles[i + rowStart] = true;
            break;
        }

        rects.push(new Box([
            x, y, width, height
        ]));
    }
    return rects;
}

export class Tilemap implements Component{
    public width:number;
    public height:number;
    public tile_dimensions:Vector;

    public layers:number[][];

    private _entity:Entity;

    public sprite:Sprite;

    constructor(map:any, entity?:Entity){
        this.width = map.width;
        this.height = map.height;

        if(entity) this._entity = entity;

        for(let layer of map.layers) this.layers.push(layer.data);
    }

    render(canvas:Canvas){
        this.sprite.render(canvas, new Box([0, 0, this.width, this.height]));
    }

    get entity(){
        return this._entity;
    }

    static solidifyLayer(map: Tilemap, layerIndex:number){
        let layer:number[] = map.layers[layerIndex];
        let rects:Box[] = getLeastRects(layer, map.width);
        let collider:Collider = <Collider> map.entity.getComponent("Collider");
    }
}

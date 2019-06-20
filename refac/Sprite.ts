import Box from './Box';
import Canvas from './Canvas';

export default class Sprite {
    private img:HTMLCanvasElement;
    private revImg:HTMLCanvasElement;

    private rawImage:HTMLImageElement;

    private _loaded:boolean;

    public onload:Function;

    public sprite:Sprite;

    constructor(url:string) {
        this.rawImage = new Image();
        this.rawImage.onload = this.rawImageOnload.bind(this);
        this.rawImage.src = url;
    }

    private rawImageOnload():any {
        this.img = <HTMLCanvasElement> document.createElement('canvas');
        this.img.width = this.rawImage.width;
        this.img.height = this.rawImage.height;

        this.revImg = <HTMLCanvasElement> document.createElement('canvas');
        this.revImg.width = this.rawImage.width;
        this.revImg.height = this.rawImage.height;

        let context = this.img.getContext('2d');
        context.drawImage(this.rawImage, 0, 0);
        let revContext = this.revImg.getContext('2d');
        revContext.scale(-1, 1);
        revContext.drawImage(this.rawImage, 0, 0);
        this._loaded = true;
        if(this.onload) this.onload.bind(null)();
    }

    render(canvas: Canvas, box: Box, isReversed:boolean = false) {
        let image = isReversed ? this.revImg : this.img;
        canvas.ctx.drawImage(image, ...box.toArray());
    }

    get loaded():boolean {
        return this._loaded;
    }
}

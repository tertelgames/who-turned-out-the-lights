let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 1080;
canvas.height = 720;

document.body.insertBefore(canvas, null);

let x = 0;
let y = 0;

export default {
    get ctx (){
        return ctx;
    },

    rectangle(x, y, w, h){
        ctx.fillRect(x, y, w, h);
    },
    clear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },


    get x(){
        return x;
    },
    set x(_x){
        x = _x;
    },

    get y(){
        return y;
    },
    set y(_y){
        y = _y;
    },
}

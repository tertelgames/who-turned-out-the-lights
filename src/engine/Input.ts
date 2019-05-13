let down: { [key: number]: boolean} = {};
let up:   { [key: number]: boolean} = {};
let held: { [key: number]: boolean} = {};

document.addEventListener('keydown', (e:KeyboardEvent) => {
    down[e.keyCode] = true;
    held[e.keyCode] = true;
});
document.addEventListener('keyup', (e:KeyboardEvent) => {
    up[e.keyCode] = true;
    held[e.keyCode] = false;
});

export let Input = {
    clear : () => {
        down = {};
        up = {};
    },
    Get : (key:number) => {
        return held[key];
    },
    GetDown : (key:number) => {
        return down[key];
    },
    GetUp : (key:number) => {
        return up[key];
    }
};

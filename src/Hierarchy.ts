// import Player from './things/Player';
// import Background from './things/Background';
// import Collectable from './things/Collectable';

import GameObject from './GameObject';

// export default [ 
//     () => {
//         new Background();
//         new Collectable();
//         new Player();
//     }
// ];

let list:GameObject[] = new Array();

export default {
    add: (obj:GameObject) => {
        list.push(obj);
    },
    update: () => {
        list.forEach((obj) => {
            obj.update();
        });
    },
    render: () => {
        list.forEach((obj) => {
            obj.update();
        });
    },
    destroy: (id:number) => {
        let index = list.findIndex((obj:GameObject) => {
            return obj.getId() == id;
        });
        if(index != -1) list.splice(index);
        else console.error(`No object exists with id ${id}`);
    }
};

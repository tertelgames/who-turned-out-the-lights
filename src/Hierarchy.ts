import Player from './things/Player';
import Background from './things/Background';
import Collectable from './things/Collectable';

export default [ 
    () => {
        new Background();
        new Collectable();
        new Player();
    }
];

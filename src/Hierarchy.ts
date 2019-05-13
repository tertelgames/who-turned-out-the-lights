import Player from './things/Player';
import Background from './things/Background';

export default [ 
    () => {
        new Background();
        new Player();
    }
];

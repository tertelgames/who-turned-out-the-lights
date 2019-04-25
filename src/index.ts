import { Box, Entity, Canvas } from './Engine';
import { Sprite } from './Components';
import Game from './Game';
import './images/test.jpg';

let game = new Game();

game.stop();

let myEntity = new Entity([10, 20, 30, 40], {
    components: [
        new Sprite('./images/test.jpg')
    ]
});

myEntity.velocity.x = 2;

let mySprite = <Sprite> myEntity.getComponent(Sprite);
mySprite.onload = () => {
    game.start();
};

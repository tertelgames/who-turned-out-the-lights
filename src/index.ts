import { Box, Entity, Canvas } from './Engine';
import { Sprite } from './Components';
import Game from './Game';
import './images/test.jpg';
import Player from './things/Player';
import Background from './things/Background';

Game.canvas.background = '#bbb';

new Background();
new Player();

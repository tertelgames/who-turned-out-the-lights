import { Thing, Entity } from '../Engine';

export class Player extends Entity implements Thing {
    constructor(){
        super([10, 20, 30, 40], {

        });
    }
}

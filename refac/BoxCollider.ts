import Box from './Box';
import Vector from './Vector';
import Collision from './Collision';
import Entity from './Entity';

export default class BoxCollider {
    readonly entity:Entity;


    private collisions:{[key:number]: Collision} = {};


    constructor(entity:Entity) {
        this.entity = entity;
    }


    update() {
        this.updateCollisions();
    }


    private updateCollisions() {
        this.getCollisions().forEach((collision:Collision) => {
            if (collision.isEnter()) {
                collision.setNoEnter();
            }
            if (collision.isExit()) {
                delete this.collisions[collision.other.id];
            }

            collision.setExit();
        });

        this.detectCollisions();
    }

    private detectCollisions() {
        Entity.List.forEach((other:Entity) => {
            if (other.id == this.entity.id) return;
            let collision:Collision = this.detectCollision(other);
            if (collision) {
                if (this.collisions[other.id]) {
                    this.collisions[other.id].setNoExit();
                }
                else {
                    this.collisions[other.id] = (collision);
                }
            }
        });
    }

    private detectCollision(otherEntity:Entity):Collision {
        let self:Box = this.bounds;
        let other:Box = otherEntity.bounds;

        if (self.x > other.x + other.w ||
            self.x + self.w < other.x  ||
            self.y > other.y + other.h ||
            self.y + self.h < other.y ) {
            return null;
        }

        let side:Vector;

        let corner = self.getCorners()[0];
        if (corner.x > other.center.x && corner.y > other.center.y) {
            let otherCorner:Vector = other.getCorners()[2];
            let xDif:number = Math.abs(corner.x - otherCorner.x);
            let yDif:number = Math.abs(corner.y - otherCorner.y);
            if (xDif < yDif) side = Vector.RIGHT;
            else side = Vector.DOWN;
        }
        corner = self.getCorners()[1];
        if (corner.x < other.center.x && corner.y > other.center.y) {
            let otherCorner:Vector = other.getCorners()[3];
            let xDif:number = Math.abs(corner.x - otherCorner.x);
            let yDif:number = Math.abs(corner.y - otherCorner.y);
            if (xDif < yDif) side = Vector.LEFT;
            else side = Vector.DOWN;
        }
        corner = self.getCorners()[2];
        if (corner.x < other.center.x && corner.y < other.center.y) {
            let otherCorner:Vector = other.getCorners()[0];
            let xDif:number = Math.abs(corner.x - otherCorner.x);
            let yDif:number = Math.abs(corner.y - otherCorner.y);
            if (xDif < yDif) side = Vector.LEFT;
            else side = Vector.UP;
        }
        corner = self.getCorners()[3];
        if (corner.x > other.center.x && corner.y < other.center.y) {
            let otherCorner:Vector = other.getCorners()[1];
            let xDif:number = Math.abs(corner.x - otherCorner.x);
            let yDif:number = Math.abs(corner.y - otherCorner.y);
            if (xDif < yDif) side = Vector.RIGHT;
            else side = Vector.UP;
        }

        return new Collision(this.entity, otherEntity, side);
    }


    getCollisions() {
        return Object.keys(this.collisions).map((key:string) => {
            return this.collisions[key];
        });
    }


    get bounds() {
        return this.entity.bounds;
    }
}

import {random, calculateDistance} from './util'

export default class Firework {
    x: number;
    y: number;
    sx: number;
    sy: number;
    tx: number;
    ty: number;
    ctx: any;
    distanceToTarget: any;
    distanceTraveled: number;
    coordinates: any[];
    coordinateCount: number;
    angle: number;
    speed: number;
    acceleration: number;
    brightness: any;
    targetRadius: number;

    constructor(sx: number, sy: number, tx: number, ty: number) {
        //actual coordinates
        this.x = sx;
        this.y = sy;
        //starting coordinate
        this.sx = sx;
        this.sy = sy;
        //target coordinates
        this.tx = tx;
        this.ty = ty;

        this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
        this.distanceTraveled = 0;
        //track past coordinates to creates a trail effect
        this.coordinates = [];
        this.coordinateCount = 2;
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.atan2(ty - sy, tx - sx);
        this.speed = 1;
        this.acceleration = 1.2;
        this.brightness = random(50, 70);
        this.targetRadius = 1;
    }
}

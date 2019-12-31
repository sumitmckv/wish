import {random} from "./util";

export default class Particle {
    // After explosion the scattered objects are particles. They are moving away 
    // from the common center after explosion
    x: number;
    y: number;
    angle: number = 0;
    speed: number = 0;
    brightness: any;
    hue: number = 0;
    type: number;
    friction: number = 0;
    gravity: number = 0;
    alpha: number = 0;
    decay: number = 0;
    coordinates: any[];
    coordinateCount: number;

    constructor(x: number, y: number, type: number, hue: number) {
        this.x = x;
        this.y = y;
        this.type = type;
        // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
        this.coordinates = [];
        this.coordinateCount = 6;
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
        // TODO Improve
        let variation = random(1, 5);
        switch (type) {
            case 1:
                if (variation < 2) {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(1, 15);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 4;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = random(hue - 50, hue + 50);
                    this.brightness = random(50, 80);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.01, 0.02);
                }
                else if (variation < 3) {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(1, 5);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 3;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = random(hue - 50, hue);
                    this.brightness = random(50, 80);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.015, 0.03);
                }
                else if (variation < 4) {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(1, 8);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 3;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = random(hue, hue + 50);
                    this.brightness = random(50, 80);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.015, 0.03);
                }
                else {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(1, 15);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 3;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = random(hue - 50, hue + 50);
                    this.brightness = random(10, 20);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.015, 0.3);
                }
                break;
            case 2:
                // let variation = random(1, 5);
                if (variation < 2) {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(1, 10);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 4;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = 100;
                    this.brightness = random(50, 80);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.01, 0.02);
                }
                else if (variation < 3) {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(1, 21);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 3;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = 100;
                    this.brightness = random(50, 80);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.015, 0.03);
                }
                else if (variation < 4) {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(1, 3);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 3;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = 100;
                    this.brightness = random(50, 80);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.015, 0.03);
                }
                else {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(1, 5);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 3;
                    // set the hue to a random number +-20 of the othis.hue = 100;
                    this.hue = 100;
                    this.brightness = random(10, 20);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.015, 0.3);
                }
                break;
            case 3:
                // let variation = random(1, 5);
                // var hue = 10;
                if (variation < 2) {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(10, 15);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 4;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = 60;
                    this.brightness = random(10, 20);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.01, 0.02);
                }
                else if (variation < 3) {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(11, 15);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 3;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = 10;
                    this.brightness = random(10, 20);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.015, 0.03);
                }
                else if (variation < 4) {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(11, 18);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 3;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = 90;
                    this.brightness = random(10, 20);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.015, 0.03);
                }
                else {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(11, 15);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 3;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = 120;
                    this.brightness = random(10, 20);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.015, 0.3);
                }
                break;
            case 4:
                // var variation = random(1, 5);
                if (variation < 2) {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(1, 10);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 4;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = 300;
                    this.brightness = random(50, 80);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.01, 0.02);
                }
                else if (variation < 3) {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(1, 21);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 3;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = 300;
                    this.brightness = random(50, 80);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.015, 0.03);
                }
                else if (variation < 4) {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(1, 3);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 3;
                    // set the hue to a random number +-20 of the overall hue variable
                    this.hue = 300;
                    this.brightness = random(50, 80);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.015, 0.03);
                }
                else {
                    // set a random angle in all possible directions, in radians
                    this.angle = random(0, Math.PI * 2);
                    this.speed = random(1, 5);
                    // friction will slow the particle down
                    this.friction = 0.95;
                    // gravity will be applied and pull the particle down
                    this.gravity = 3;
                    // set the hue to a random number +-20 of the othis.hue = 100;
                    this.hue = 100;
                    this.brightness = random(10, 20);
                    this.alpha = 1;
                    // set how fast the particle fades out
                    this.decay = random(0.015, 0.3);
                }
                break;
            default:
        }
    }
}

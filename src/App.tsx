import React from 'react';
import './App.css';
import {calculateDistance, random} from "./util";
import Firework from "./Fireworks";
import Particle from "./Particle";

export default class App extends React.Component{
    private readonly Gravity: number = 4;
    private readonly canvasRef: React.RefObject<HTMLCanvasElement>;
    private canvas: HTMLCanvasElement | null | undefined;
    private ctx: CanvasRenderingContext2D | null | undefined;
    private fireworks: Firework[] = [];
    private particles: Particle[] = [];
    private sound: HTMLAudioElement;
    private hue: number = 120;
    private limiterTotal: number = 20;
    private limiterTick: number = 0;
    private timerTotal: number = 10;
    private randomTime: number = 0;
    private timerTick: number = 0;
    private mousedown: boolean = false;
    private cw: number = 0;
    private ch: number = 0;
    private mx: number = 0;
    private my: number = 0;
    private readonly wish: string | null;
    private readonly name: string | null;

    constructor(props: any) {
        super(props);
        const urlStr = window.location.href;
        const url: URL = new URL(urlStr);
        const params: URLSearchParams = url.searchParams;
        this.wish = params.get("message");
        this.name = params.get("to");
        this.sound = new Audio(url.origin + url.pathname + "/firework.mp3");
        this.canvasRef = React.createRef();
    }

    componentDidMount(): void {
        this.canvas = this.canvasRef.current;

        if (this.canvas) {
            this.cw = this.canvas.width = window.innerWidth;
            this.ch = this.canvas.height = window.innerHeight;
            this.ctx = this.canvas.getContext("2d");
            setInterval(() => {
                this.run();
            }, 25);
        }
    }

    render(): React.ReactElement {
        return (
            <div className="App">
                <canvas
                    ref={this.canvasRef}
                    onMouseMove={(e) => this.handleMouseMove(e)}
                    onMouseDown={(e) => this.handleMouseToggle(e, true)}
                    onMouseUp={(e) => this.handleMouseToggle(e, false)}
                />
            </div>
        );
    }

    handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
        if (this.canvas) {
            this.mx = e.pageX - this.canvas.offsetLeft;
            this.my = e.pageY - this.canvas.offsetTop;
        }
    }

    handleMouseToggle(e: React.MouseEvent<HTMLCanvasElement>, isDown: boolean) {
        e.preventDefault();
        this.mousedown = isDown;
    }

    // update firework
    updateFirework(index: number) {
        // if(this.distanceTraveled >= this.distanceToTarget ){
        // fireworks.splice(index, 1);
        // }
        const firework = this.fireworks[0];
        if (firework.targetRadius < 8) {
            firework.targetRadius += 0.3;
        }
        else {
            firework.targetRadius = 1;
        }
        firework.speed += firework.acceleration;
        
        // This is the line where we are updating the velocity of firework, can add gravity effect here TODO
        let vx = Math.cos(firework.angle) * firework.speed, vy = Math.sin(firework.angle) * firework.speed;
        
        firework.distanceTraveled = calculateDistance(firework.sx, firework.sy, firework.x + vx, firework.y + vy);
        
        // if target point reached, explode the firework 
        // delete the Firework object, create Particle objects, play some nice sound
        if (firework.distanceTraveled >= firework.distanceToTarget) {
            firework.coordinates.pop();
            firework.coordinates.unshift([firework.tx, firework.ty]);
            //this.x = this.tx; this.y = this.ty;
            this.createParticles(firework.x, firework.y);
            this.sound.play();
            this.drawFirework(index);
            this.fireworks.splice(index, 1);
        }
        else { // if target not reached, then update  the firework coordinates
            firework.x += vx;
            firework.y += vy;
        }

        // coordinates array we use to keep a nice tail
        firework.coordinates.pop();
        firework.coordinates.unshift([firework.x, firework.y]);
    }

    drawWish() {
        if (this.ctx && this.wish && this.name) {
            this.ctx.textBaseline = 'middle';
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = "#fff";
            if (this.cw <= 400) {
                this.ctx.font = '30px san-serif';
            } else if (this.cw <= 600) {
                this.ctx.font = '40px san-serif';
            } else {
                this.ctx.font = '60px san-serif';
            }
            this.ctx.strokeText(this.wish.toUpperCase(), this.cw/2, this.ch/2.5);
            this.ctx.fillText(this.name.toUpperCase(), this.cw/2, this.ch/2);
        }
    }
    // draw firework
    drawFirework(index: number) {
        // Drawing firework is pretty simple, just draw a straight line from end of 
        // the current position to the end of tail. For firework 
        // we have small tail of 2 units, that means the line will be 2 units long only.
        // the tail we keep track using "firework.coordinates" array
        if (this.ctx) {
            const firework = this.fireworks[index];
            this.drawWish();
            this.ctx.beginPath();
            // move to the last tracked coordinate in the set, then draw a line to the current x and y
            this.ctx.moveTo(firework.coordinates[firework.coordinates.length - 1][0], firework.coordinates[firework.coordinates.length - 1][1]);
            this.ctx.lineTo(firework.x, firework.y);
            this.ctx.strokeStyle = 'hsl(' + this.hue + ', 100%, ' + firework.brightness + '%)';
            this.ctx.stroke();
            // ctx.beginPath();
            // ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI*2);
            // ctx.stroke();
        }
    }

    // update particle
    // particles are effected by gravity, and hence they move in a curved parabolic path, looks good
    // But the gravity implementation is wierd, non-sensical, and just somehow added for the effect.
    // Each particle it seems are affected by different personal gravity (why?? check ./particle),
    // TODO: Rework the gravity interactions

    updateParticle(index: number) {
        // slow down the particle
        const particle = this.particles[index];
        particle.speed *= particle.friction;
        // apply velocity
        particle.x += Math.cos(particle.angle) * particle.speed;

        // not wierd, v2 = v1 + at; but for time slices of 1 seconds t = 1, v2 = v1 + a is fine
        particle.y += Math.sin(particle.angle) * particle.speed + this.Gravity;        
        // fade out the particle
        // this.alpha -= this.decay * this.alpha;

        // This is how we see the particles changing color as they scatter in  the sky
        particle.alpha -= particle.decay;
        if (particle.type === 4 && particle.alpha <= 0.5) {
            particle.brightness += 50;
            this.hue += 200;
            if (particle.brightness >= 200)
                particle.brightness = 0;
        }
        // remove the particle once the alpha is low enough, based on the passed in index
        if (particle.alpha <= particle.decay) {
            this.particles.splice(index, 1);
        }
        // remove last item in coordinates array
        particle.coordinates.pop();
        // add current coordinates to the start of the array
        particle.coordinates.unshift([particle.x, particle.y]);
    }
    // draw particle
    drawParticle(index: number) {
        // This looks like we are drawing a line from head to tail for particle, 
        // but i can see in the ui we are getting a arc curved line, how? no idea need to understand
        if (this.ctx) {
            const particle = this.particles[index];
            this.drawWish();
            this.ctx.beginPath();
            // move to the last tracked coordinates in the set, then draw a line to the current x and y
            this.ctx.moveTo(particle.coordinates[particle.coordinates.length - 1][0], particle.coordinates[particle.coordinates.length - 1][1]);
            this.ctx.lineTo(particle.x, particle.y);
            this.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + particle.brightness + '%, ' + particle.alpha + ')';
            this.ctx.stroke();
        }
    }

    createParticles( x: number, y: number ) {
        // For each explosion we are creating 300 particles, wow, thats a lot
        let particleCount = 100;
        let type = Math.floor(random(1, 5));
        while(particleCount--){
            this.particles.push(new Particle(x, y, type, this.hue));
        }
    }

    run() {
        //requestAnimFrame(loop);
        this.hue += 0.5;
        if (this.ctx) {
            this.ctx.globalCompositeOperation = "destination-out";
            this.ctx.fillStyle =  'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(0, 0, this.cw, this.ch);

            this.ctx.globalCompositeOperation = "lighter";

            let i = this.fireworks.length;
            while(i--)
            {
                this.drawFirework(i);
                this.updateFirework(i);
            }

            // loop over each particle, draw it, update it
            i = this.particles.length;
            while( i-- ) {
                this.drawParticle(i);
                this.updateParticle(i);
            }

            if( this.timerTick >= this.timerTotal + this.randomTime ){
                if (!this.mousedown){
                    /* uniform */
                    // fireworks.push( new Firework(cw/2, ch, 100, random(0, ch/2)));
                    /* 0 to cw/2, more to*/
                    // fireworks.push( new Firework(cw/2, ch, Math.floor(Math.sqrt(random(0, cw*cw/4))), random(0, ch/2)));

                    let xPos = Math.pow(Math.floor((random(-Math.pow(this.cw/2, 1/3), Math.pow(this.cw/2, 1/3)))), 3);
                    xPos += this.cw/2;
                    this.fireworks.push( new Firework(this.cw/2, this.ch, xPos, random(0, this.ch/2)));
                    // fireworks.push( new Firework(cw/2, ch, random(-10, 100), random(0, ch/2)));

                    this.timerTick = 0;
                    this.randomTime = Math.pow(random(2, 4), 2);
                }
            } else {
                this.timerTick++;
            }


            // limit the rate at which fireworks get launched when mouse is down
            if( this.limiterTick >= this.limiterTotal ) {
                if( this.mousedown ) {
                    // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
                    this.fireworks.push( new Firework( this.cw / 2, this.ch, this.mx, this.my ) );
                    this.limiterTick = 0;
                } else {
                    this.limiterTick= this.limiterTotal;
                }
            } else {
                this.limiterTick++;
            }
        }

    }
}

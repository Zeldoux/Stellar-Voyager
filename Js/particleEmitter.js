/* class to create particle effect */
class Particle{
    constructor(pX,pY){
        this.x = pX; // set particle x position
        this.y = pY; // set particle y position 
        this.life = rnd(1000,2000) / 1000; // particle life time (random time )
        this.maxLife = this.life; // keep maxlife to get alpha 
        let angle = Math.random() * (2 * Math.PI); // 2 X PI = 360 degree for a radial
        this.vx = (rnd(10,200) / 100) * Math.cos(angle); // set vx speed (particle speed)
        this.vy = (rnd(10,200) / 100 ) * Math.sin(angle); // set vy speed 
        // can also set radius here 
        this.radius = rnd(1,5);

        // set transparency 
        this.alpha = Math.random();
    }
    update(dt){
        // update particle
        this.life -= dt; // make life decade over time (dt)
        this.x += this.vx; // make particle position (x) move with vx speed 
        this.y += this.vy; // make particle position (y) move with vy speed
        // this.vx *= 0.9; // set speed to get slower if only this one horizontal // if you increase above 1 it will increase instead of slowdown
        // this.vy *= 0.9; // set speed vy to get slower if only this one vertical // if you increase above 1 it will increase instead of slowdown // if you += 0.1 it will make it goes down (gravity effect ect... many effect possible )

    }
    draw(pCtx){
        let coef = this.life / this.maxLife // get coefficient to get the alpha coef
        // set transparency particle : 
        pCtx.globalAlpha = this.alpha * coef;
        // draw particle
        drawCircle(pCtx,this.x,this.y,this.radius); // pR correspond to the size of the circle (1) // if you change the pR to a random it make a effect of growing decreasing circle for example 
        // set back transparency to normal 
        pCtx.globalAlpha = 1;
    }
}
/* class to handle all Particle emmition */
class ParticleEmitter   {
    constructor(pX,pY){
        this.lstParticle = [];
        this.x = pX;
        this.y = pY;
    }
    /* method to add particle to the list of particle */
    add(){
        let particle = new Particle(this.x + rnd(-5,5), this.y + rnd(-5,5)); // create new particle based on the Particle class 
        this.lstParticle.push(particle) // add this new particle to the lstparticle

    }
    // method update the particle emitter 
    update(dt){
        // get last particle of the list with index and reverse for()
        for (let index = this.lstParticle.length - 1 ; index >= 0 ; index-- ){ // decrease index to travel in reverse the list from the last to the first 
            let particle= this.lstParticle[index]; // get the particle index 
            particle.update(dt); // update the particle 
            if (particle.life <= 0 ){ // check if particle life is 0
                this.lstParticle.splice(index, 1); // if it is remove the particle from the list
            }

        }
    }
    // method to draw each particle from the list 
    draw(pCtx){
        this.lstParticle.forEach(p => {
            p.draw(pCtx);
        });
    }
}
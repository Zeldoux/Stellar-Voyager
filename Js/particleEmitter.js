/* class to create particle effect */
class Particle{
    constructor(pX,pY,pType){
        switch (pType) {
            case "DEFAULT" : 
            this.x = pX; // set particle x position
            this.y = pY; // set particle y position 
            this.life = rnd(1000,2000) / 1000; // particle life time (random time )
            this.maxLife = this.life; // keep maxlife to get alpha 
            let angle = Math.random() * (2 * Math.PI); // 2 X PI = 360 degree for a radial
            this.vx = (rnd(10,200) / 100) * Math.cos(angle); // set vx speed (particle speed)
            this.vy = (rnd(10,200) / 100 ) * Math.sin(angle); // set vy speed 
            this.type = pType;
            // can also set radius here 
            this.radius = rnd(1,5);

            // set transparency 
            this.alpha = Math.random();
            
            
            break;

            case "STARS" : 
                this.x = pX;
                this.y = pY;
                this.life = rnd(2000, 2000) / 1000; // Longer lifetime
                this.maxLife = this.life;
                this.vx = (rnd(0, 10) / 100) * (Math.random() > 0.5 ? 1 : 0); // Slow horizontal movement
                this.vy = (rnd(100, 150) / 10); // Faster vertical movement for falling effect
                this.radius = rnd(1, 3); // Small radius
                this.alpha = 1; // Fully opaque
                this.type = pType;

            break;

            default:
                console.error("Bullet Constructor => Error there is no bullet type ");
            break;
        }
        
    }
    update(dt){
        // update particle
        this.life -= dt; // make life decade over time (dt)
        this.x += this.vx; // make particle position (x) move with vx speed 
        this.y += this.vy;
        
        switch(this.type){
            case"DEFAULT":
                this.life -= dt;
                this.x += this.vx; // make particle position (x) move with vx speed 
                this.y += this.vy;
            break;
            
            case "STARS":
                
            break;
            
            // make particle position (y) move with vy speed
        // this.vx *= 0.9; // set speed to get slower if only this one horizontal // if you increase above 1 it will increase instead of slowdown
        // this.vy *= 0.9; // set speed vy to get slower if only this one vertical // if you increase above 1 it will increase instead of slowdown // if you += 0.1 it will make it goes down (gravity effect ect... many effect possible )

    }
}
    draw(pCtx) {
        // Apply transparency based on particle type
        switch (this.type) {
            case "DEFAULT":
                // For DEFAULT particles, use alpha fading based on life
                let coef = this.life / this.maxLife; // get coefficient to get the alpha coef
                pCtx.globalAlpha = this.alpha * coef; // set transparency particle
                drawCircle(pCtx, this.x, this.y, this.radius); // draw particle as circle
                break;
            
            case "STARS":
                // For STARS particles, constant alpha and small size
                pCtx.globalAlpha = this.alpha; // constant alpha for stars
                drawCircle(pCtx, this.x, this.y, this.radius); // draw particle as small circle
                break;
    
            default:
                console.error("Unknown particle type");
                break;
        }
    
        // Reset alpha to normal
        pCtx.globalAlpha = 1;
    }
}
/* class to handle all Particle emmition */
class ParticleEmitter   {
    constructor(pX,pY){
        this.lstParticle = [];
        this.x = pX;
        this.y = pY;
        this.infinitParticl;
    }
    /* method to add particle to the list of particle */
    add(pType){
        let particle = new Particle(this.x + rnd(-5,5), this.y + rnd(-5,5),pType); // create new particle based on the Particle class 
        this.lstParticle.push(particle) // add this new particle to the lstparticle

    }
    // method update the particle emitter 
    update(dt){
        if (this.infinitParticl){
                // Continuously spawn new particles at the top
            for (let i = 0; i < this.spawnRate; i++) {
                this.add("STARS");
        }
        }
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
class ParticleEmitterManager {
    constructor() {
        this.emitters = [];
    }

    // Add a new particle emitter to the manager
    addEmitter(pEmitter) {
        this.emitters.push(pEmitter);
    }

    // Update all particle emitters
    update(dt) {
        this.emitters.forEach(emitter => emitter.update(dt));
    }

    // Draw all particle emitters
    draw(pCtx) {
        this.emitters.forEach(emitter => emitter.draw(pCtx));
    }
}

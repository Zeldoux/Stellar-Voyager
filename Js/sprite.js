
/* create an object creator for spriteSheets */
class Sprite {
    /* use constructor in object to make the sprite context and source */
    constructor( pSrc , pX = 0, pY = 0) {
        /* attribute to sprite context and source */
        this.img = pSrc;
        /* old version before using imgloader */
        /*
        this.img = new Image(); // attribute a new image object to the new sprite
        this.img.src = pSrc; // attribute the source of the image (suposly writed in the class construction when called ex: newsprite = new Sprite("image/imageforexample.png"))
        */

        this.x = pX; // set x position 
        this.y = pY; // set y position

        this.scaleX = 1; // set defualt scale of X 
        this.scaleY = 1; // set default scale of Y 

        this.width = pSrc.width;
        this.height = pSrc.height;
        
        /**create framenumber to retriev wich frame to display wich img (animations) */
        this.currentFrame = 0;
        // create currframe in anim 
        this.currFrameAnim = 0;
        // create a frame timer for update of the anim
        this.frameTimer = 0;


        // variable containing size of a tile of the spritesheet (x , y )
        this.tileSize = {
            x:0,
            y:0
        }
        // set boolean variable for tilesheet presence or no 
        this.tileSheet = false;
        // set a list of animations for the sprite (obviously if its a spritesheets)
        this.animations = [];
        this.currAnimations = null;
        this.img.onerror = () => {
            console.error(`Failed to load image at ${pSrc}`);
        };
        console.log("constructor finished building new sprite :",this.img );
    }
    // method to add a new animation to the anim list of the sprite
    addAnim(pName, pFrame, pSpeed, pLoop = true){// set up a "NAME", [10,11,12],0,2,true
        let anim = {
            name: pName,
            frames: pFrame, // example : [10,11,12]
            speed: pSpeed,
            loop: pLoop,
            end: false
        }
        this.animations.push(anim); // add this animations to the animations list 
        console.log(`Animation added: ${pName}, Frames: ${pFrame}, Speed: ${pSpeed}, Loop: ${pLoop}`);

    }
    // method to start the animations 
    startAnim(pName){
        
        if (this.currAnimations != null && this.currAnimations.name == pName ){ // check if there is already an animation or if its the same as the already one started 
            return;
        }
        // Search for the animation by name and set it as the current animation
        for (let i = 0; i < this.animations.length; i++) { // iterate trough all animations list 
            let animation = this.animations[i];
            if (animation.name == pName) { // find the animations from the list that contain the pName 
                this.currAnimations = animation; // set the current animations with this found animations
                this.currFrameAnim = 0; // set the current frame of the animation to 0 (reset)
                this.currentFrame = this.currAnimations.frames[this.currFrameAnim];// set the current frame to the first frame as set just before (0)
                console.log(`Animation started: ${pName}, Current Frame: ${this.currentFrame}`);
                break;
            }
        
    }
}

    /* function to turn on the tilesheet draw mod (for animation with spritesheet )*/
    setTileSheet(pSizeX,pSizeY) {
        this.tileSheet = true;
        this.tileSize.x = pSizeX;
        this.tileSize.y = pSizeY;
        this.width = pSizeX;
        this.height = pSizeY;
    }

    /* function to modify scale size of sprite */ 
    setScale(pX,pY){
        this.scaleX = pX;
        this.scaleY = pY;
    }
    /* method to check if a sprite (pSprite) collide with another */
    collideWith(pSprite){
        /* use of checkcollision function between the two psprite and (this) where (this) is the variable used for this function */
        if (checkCollision(pSprite,this)) {
            return true;// if colliding it should return true
        } else {
            return false;
        }
    }

    // Update the sprite's animation state based on the delta time (dt)
    update(dt){
        // Check if there's a current animation set
        if (this.currAnimations != null) {
            this.frameTimer += dt; // Increment the frame timer by the delta time
            if (this.frameTimer >= this.currAnimations.speed) { // If the frame timer exceeds the current animation's speed
                this.frameTimer = 0; // Reset the frame timer
                this.currFrameAnim++; // Move to the next frame in the animation sequence
                if (this.currFrameAnim > this.currAnimations.frames.length - 1 ) {  // If the current frame index exceeds the total frames in the animation(end) 
                    if (this.currAnimations.loop) { // Check if the animation should loop
                        this.currFrameAnim = 0; // Reset to the first frame if looping
                    }
                    else { // Otherwise, set to the last frame and mark the animation as ended
                        this.currFrameAnim = this.currAnimations.frames.length - 1; // set current frame animation to the sprite current animation frame length (last one)
                        this.currAnimations.end = true; // set end bool value to true ;
                    }
                }
                // Update the current frame to the new frame in the animation sequenc
                this.currentFrame = this.currAnimations.frames[this.currFrameAnim];
            }

        }
    }
    /* add to the class a function that can be call to draw the new sprite */
    draw(pCtx) {
        if (!this.tileSheet) { // only draw if this is not a tileSheet (tilesheet = false) */
        /* use the draw with his context(pCtx) and draw the image object from the this.img = new Image(); */
        pCtx.drawImage(this.img,this.x,this.y); // use constructor attribute for the drawn new sprite
        }
        /* use draw with the tilesheet set up (sizeX / sizeY ) */
        else {
            /* set up column in the tilesheet */
            let nbCol = Math.floor(this.img.width / this.tileSize.x); // img.width = total size of the spritesheet / tileSize.x = setTileSheet(250,250) so tilesize.X = 250 and .Y = 250 as set in the function */
            
            let c = 0; // column number
            let l = 0; // line number 
            l = Math.floor(this.currentFrame / nbCol); // current frame divided by number of column 
            c = this.currentFrame - (l * nbCol);
            let x = c * this.tileSize.x; // X positions of the selected part of the spritesheets 
            
            let y = l * this.tileSize.y;// Y positions of the selected part of the spritesheets
            pCtx.drawImage(this.img,x,y,this.tileSize.x,this.tileSize.y,this.x,this.y,this.tileSize.x * this.scaleX ,this.tileSize.y * this.scaleY);
        }
        
    }
}
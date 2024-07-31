
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

    addAnim(pName, pFrame, pSpeed, pLoop = true){
        let anim = {
            name: pName,
            frames: pFrame, // example : [10,11,12]
            speed: pSpeed,
            loop: pLoop,
            end: false
        }
        this.animations.push(anim);
        console.log(`Animation added: ${pName}, Frames: ${pFrame}, Speed: ${pSpeed}, Loop: ${pLoop}`);

    }
    startAnim(pName){
        
        if (this.currAnimations != null && this.currAnimations.name == pName ){
            return;
        }
        // Search for the animation by name and set it as the current animation
        for (let i = 0; i < this.animations.length; i++) {
            let animation = this.animations[i];
            if (animation.name == pName) {
                this.currAnimations = animation;
                this.currFrameAnim = 0;
                this.currentFrame = this.currAnimations.frames[this.currFrameAnim];
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
    }

    /* function to modify scale size of sprite */ 
    setScale(pX,pY){
        this.scaleX = pX;
        this.scaleY = pY;
    }


    update(dt){
        if (this.currAnimations != null) {
            this.frameTimer += dt;
            if (this.frameTimer >= this.currAnimations.speed) {
                this.frameTimer = 0;
                this.currFrameAnim++;
                if (this.currFrameAnim > this.currAnimations.frames.length - 1 ) {
                    if (this.currAnimations.loop) {
                        this.currFrameAnim = 0;
                    }
                    else {
                        this.currFrameAnim = this.currAnimations.frames.length - 1;
                        this.currAnimations.end = true;
                    }
                }
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
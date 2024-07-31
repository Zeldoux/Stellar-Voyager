
/* create an object creator for spriteSheets */
class SpriteSheet {
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
        
        /**create framenumber to retriev wich frame to display wich img (animations) */
        this.currentFrame = 0;

        this.tileSize = {
            x:0,
            y:0
        }
        this.tileSheet = false;

        this.img.onerror = () => {
            console.error(`Failed to load image at ${pSrc}`);
        };
        console.log("constructor finished building new sprite :",this.src );
    }

    setTileSheet(pSizeX,pSizeY) {
        this.tileSheet = true;
        this.tileSize.x = pSizeX;
        this.tileSize.y = pSizeY;
    }
    /* add to the class a function that can be call to draw the new sprite */
    draw(pCtx) {
        if (!this.tileSheet) {
        /* use the draw with his context(pCtx) and draw the image object from the this.img = new Image(); */
        pCtx.drawImage(this.img,this.x,this.y); // use constructor attribute for the drawn new sprite
        }
        else {
            let nbCol = this.img.width / this.tileSize.x;
            let c = 0;
            let l = 0;
            l = Math.floor(this.currentFrame / nbCol);
            c = this.currentFrame - (l * nbCol);

            let x = c * this.tileSize.x;
            let y = l* this.tileSize.y;

            pCtx.drawImage(this.img,x,y,this.tileSize.x,this.tileSize.y,this.x,this.y,this.tileSize.x,this.tileSize.y);
        }
        
    }
}
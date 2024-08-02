class ScrollingBackground {
    constructor(pImg,pY) {
        this.speed = 0;
        this.x = 0;
        this.y = pY;
        this.image = pImg
        this.distance = pImg.width;
    }
    // update scrolling background
    update(dt){
        this.x -= this.speed;
        this.distance += this.speed;
        if (this.x <= 0 - this.image.width){
            this.x = 0;
        }
        

    }

    // draw scrolling background
    draw(pCtx){
        pCtx.drawImage(this.image,this.x,this.y);
        pCtx.drawImage(this.image, this.x + this.image.width, this.y);
    }
}
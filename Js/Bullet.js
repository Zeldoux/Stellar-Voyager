class Bullets extends Sprite { // extends Sprite class for bullets to give bullets Sprite class 
    constructor(pX,pY,pvX,pvY,pType){
        let img;
        // switch case to create differents bullets with the pType (player or enemy or boss)
        switch (pType) {
            case "PLAYER":
                img = imgLoader.getImg("Img/Player/playercanonshootsprtsheet.png")
                super(img, pX,pY); // super call constructor of the extends here Sprite (extends Sprite)
                this.setTileSheet(50,50);
                this.addAnim("idle", [0,1,2,3,4,5],1,false);
                this.startAnim("idle");
                this.friendly = true;
                break; // in case value is

            case "ENEMY":
                img = imgLoader.getImg("Img/Enemy/ShotBasic.png");
                super(img,pX,pY);
                this.setTileSheet(9, 8);
                this.addAnim("idle", [0,1, 2,3], .1, true);
                this.startAnim("idle");
                this.friendly = false;
                break;
            case "BOSS":
                this.friendly = false;


            break;

            default:
                console.error("Bullet Constructor => Error there is no bullet type ");
                break;
        }
        this.type = pType;
        this.vx = pvX;
        this.vy = pvY;
        this.timer = 0; // timer for end of anim supression of bullet
    }
    bulletTimerStart(dt){
        this.timer += dt * 0.8;
    }
    isOffScreen(pWidth,pHeight) {
        if (this.x + this.tileSize.x < 0 || this.y + this.tileSize.y < 0 || this.x > pWidth || this.y > pHeight){
            return true;
        } else {return false;}
    }
    update(dt) {
        super.update(dt);
        this.x += this.vx;
        this.y += this.vy;
    }

}
class BulletsManager {
    constructor() {
        this.lstBullets = [];

    }
    // method to clear the bullet list
    clear() {
        this.lstBullets = [];
    }
    // method to shoot a bullet 
    shoot(pX,pY,pAngle,pSpeed,pType){
        console.log ("angle : ", pAngle);
        let vx , vy;
        vx = pSpeed * Math.cos(pAngle);
        vy = pSpeed * Math.sin(pAngle);
        let bullet = new Bullets(pX,pY,vx,vy,pType);
        this.lstBullets.push(bullet);
    }
    // method to update all bullet of lstbullet
    update(dt){
        for (let index = this.lstBullets.length - 1; index >= 0; index-- ){
            let bullet = this.lstBullets[index];
            bullet.update(dt);
            if (bullet.isOffScreen(canvas.width,canvas.height)) {
                this.lstBullets.splice(index,1);
                console.log("removed out of bound bullet ")
            }

            // remove bullet if animation end 
            if (bullet.currentFrame == 5 ){
                console.log("bullet current frame : ", bullet.currentFrame);
                bullet.bulletTimerStart(dt); // use a timer to delete bullet after animation
                if (bullet.timer >= 1 ){
                    this.lstBullets.splice(index,1);
                    console.log("removed bullet after end of anim ");
                    bullet.timer = 0;
                }
            }
        }
    }
    // method to draw all bullet from bullet list
    draw(pCtx){
        this.lstBullets.forEach(bullet => {
            bullet.draw(pCtx);
        });
    }
}
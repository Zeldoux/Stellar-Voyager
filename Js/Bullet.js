class Bullets extends Sprite { // extends Sprite class for bullets to give bullets Sprite class 
    constructor(pX,pY,pvX,pvY,pType){
        let img;
        // switch case to create differents bullets with the pType (player or enemy or boss)
        switch (pType) {
            case "PLAYER":
                img = imgLoader.getImg("Img/Player/playercanonshootsprtsheet.png")
                super(img, pX,pY); // super call constructor of the extends here Sprite (extends Sprite)
                this.setTileSheet(50,50);
                this.addAnim("idle", [0,1,2,3,4,5],1,true);
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
    }
    update(dt) {
        super.update(dt);
        this.x += this.vx;
        this.y += this.vy;
    }
}
class Player {
    constructor(pX,pY) {
        // set player Ship sprite and animation 
        let imgShip = imgLoader.getImg("Img/Player/playerspaceshipR.png");
        this.sprShip = new Sprite(imgShip,pX,pY);
        this.sprShip.setTileSheet(250,250);
        this.sprShip.addAnim("MOVERIGHT",[0,1],0.5,true);
        this.sprShip.startAnim("MOVERIGHT");
        // set player position same as the ship sprite
        this.x = this.sprShip.x;
        this.y = this.sprShip.y;
        // set Canon sprite and Animation
        let imgCanon = imgLoader.getImg("Img/Player/playercanonsprtsheet.png");
        this.sprCanon = new Sprite(imgCanon,pX,pY);

        // player life and max life
        this.life = 100;
        this.maxlife = 100;
        this.lx;
        this.ly;

        // set Life bar sprite and animation 
        let imgLife = imgLoader.getImg("Img/Player/lifeBarSP.png");
        this.lifeSprite = new Sprite(imgLife,1140,10);
        this.lifeSprite.setTileSheet(100,25);
        this.lifeSprite.addAnim("50%",[1],1,false);
        this.lifeSprite.addAnim("100%",[0],1,false);
        this.lifeSprite.addAnim("0%",[2],1,false);

        this.sprCanon.setTileSheet(100,100);
        this.sprCanon.addAnim("idle",[0,1,2,3,4],1,true);
        this.sprCanon.startAnim("idle");
        this.displayCanon = false;



        // player shooting projectile list 
        this.projectiles = [];

    }
    getShootPos(pBulletHeight){
        let position = { x:0 , y:0 };
        let midShip = this.y + (this.sprShip.tileSize.y / 2 );
        //return position of middle ship - bullet middle position
        position.x = this.x + (this.sprShip.tileSize.x)
        position.y = midShip - (pBulletHeight / 2)  ;
        return position

    }

    update(dt) {
    this.sprShip.update(dt);
    this.sprCanon.update(dt);
    // update sprite of ship with player pos 
    this.sprShip.x = this.x;
    this.sprShip.y = this.y;
    let position = this.getShootPos(100);
    this.sprCanon.x = position.x - 80;
    this.sprCanon.y = position.y;
    this.lifeSprite.update(dt);
    this.lifeDisplay();
    //    this.sprCanon.x = this.sprShip.x + this.sprShip
    // update projectile 
    this.projectiles.forEach((proj, index) => {
        proj.update(dt);
        if (proj.isOffScreen()) {
            this.projectiles.splice(index, 1);
        }
    });
    }

    // method to display life
    lifeDisplay() {
        let lifepercent = (this.life / this.maxlife) * 100;
        ctx.fillStyle = "White";
        ctx.font = "normal 16pt arial";
    
        ctx.fillText(Math.floor(lifepercent),1170,30)
        ctx.fillText("%",1210,30)
        ctx.fillText;


    }
    // draw method for the player (lifebar projectile , canon , ship ect... )
    draw(pCtx){
        if (this.displayCanon){
            this.sprCanon.draw(pCtx);
        }
        this.sprShip.draw(pCtx);
        if (this.projectiles){

            this.projectiles.forEach((proj, index) => {
                proj.draw(pCtx)
            });
        }
        this.lifeSprite.draw(pCtx);
        this.lifeDisplay();
    }

}
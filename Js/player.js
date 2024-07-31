class Player {
    constructor(pX,pY) {
        let imgShip = imgLoader.getImg("Img/Player/playerspaceshipR.png");
        this.sprShip = new Sprite(imgShip,pX,pY);
        this.sprShip.setTileSheet(250,250);
        this.sprShip.addAnim("MOVERIGHT",[0,1],0.5,true);
        this.sprShip.startAnim("MOVERIGHT");
        this.x = this.sprShip.x;
        this.y = this.sprShip.y;
        let imgCanon = imgLoader.getImg("Img/Player/playercanonsprtsheet.png");
        this.sprCanon = new Sprite(imgCanon,pX,pY);

        this.sprCanon.setTileSheet(100,100)
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

    // shoot method
    shoot(e){
        if (e.keyCode === 32 ) { // spacebar (32)
            let projectileImg = imgLoader.getImg("Img/Player/projectile.png");
            let projectile = new Projectile(projectileImg,this.x + 75 , this.y + (250 / 2) ,1);
            this.projectiles.push(projectile);

        }
    }
    update(dt) {
    /* make player movement */
    this.sprShip.update(dt);
    this.sprCanon.update(dt);
    this.sprShip.x = this.x;
    this.sprShip.y = this.y;
    let position = this.getShootPos(100);
    this.sprCanon.x = position.x - 80;
    this.sprCanon.y = position.y;
    //    this.sprCanon.x = this.sprShip.x + this.sprShip
    // update projectile 
    this.projectiles.forEach((proj, index) => {
        proj.update(dt);
        if (proj.isOffScreen()) {
            this.projectiles.splice(index, 1);
        }
    });
    }
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
    }

}
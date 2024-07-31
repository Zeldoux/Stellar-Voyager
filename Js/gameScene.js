class GameScene {
    constructor() {
        this.keyboard = null;
        this.imageLoader = null;
        this.imgBackground = null;
        this.waveManager = new WaveManager();
        this.lstBullet = [];
        this.shotSpeed = 0.2;
        this.shotTimer = 0;
        
    }
    /* method to load the scene */
    load(pImageLoader){
        // when imgloader has loaded all img we add it to the scene 
        this.imageLoader = pImageLoader;
        // we take the background img loaded in imgloader and set it in the variable 
        this.imgBackground = this.imageLoader.getImg("Img/stars/background.png");
        this.background = new ScrollingBackground(this.imgBackground); // we then create a new scrollingbackground class with this loaded img from imgloader
        this.background.speed = 0.5; // set the background speed 
        this.player = new Player(25,40); // create a new player class with pos x , y

        /* create enemy sprite and animation for the waveManager */
        let imgEnemyBall = this.imageLoader.getImg("Img/Enemy/enemyball.png");
        let spriteEnemyBall = new Sprite(imgEnemyBall)
        spriteEnemyBall.setTileSheet(17,14)
        spriteEnemyBall.addAnim("IDLE", [0,1,2,3,4,5,6,7,8,9,10],0.1,true);
        spriteEnemyBall.startAnim("IDLE");

        /* create wave with this new enemysprite and add it to the waveManager */
        this.waveManager.addWave(new EnemyWave(spriteEnemyBall,5,0.5,1280,1280,50));
        this.waveManager.addWave(new EnemyWave(spriteEnemyBall,5,0.5,780,780,10));
        this.partcleEmitter = new ParticleEmitter(200 , 100);
        for (let n = 0; n < 50 ; n++) {
            this.partcleEmitter.add();
        }
        

        }
    /* method to update the scene */
    update(dt){
        this.background.update(dt);
        this.waveManager.update(dt,this.background.distance);
        this.partcleEmitter.update(dt);
        this.lstBullet.forEach(bullet => {
            bullet.update(dt);
        })
        if ((this.keyboard["KeyW"] || this.keyboard["ArrowUp"]) && this.player.y >= 0 ) {
            this.player.y -= 1;
        }
        if ((this.keyboard["KeyS"] || this.keyboard["ArrowDown"]) && this.player.y <= CanvasHeight - 250) {
            this.player.y += 1;
        }

        if ((this.keyboard["KeyD"] || this.keyboard["ArrowRight"]) && this.player.x <= CanvasWidth -250){
            this.player.x += 1;
        }
        if (this.player.y >= CanvasWidth){
            console.log(CanvasWidth)
            console.log(this.player.x);
            console.log("player pos Y superior than canvas height")
        }
        if ((this.keyboard["KeyA"] || this.keyboard["ArrowLeft"]) && this.player.x >= 0){
            this.player.x -=1;
        }
        if (this.keyboard["Space"] ) {
            this.player.displayCanon = true;
            if (this.shotTimer <= 0) {
                this.shoot()
                this.shotTimer = this.shotSpeed;
            }
        } else {
            this.player.displayCanon = false;
        }
        if (this.shotTimer > 0 ){
            this.shotTimer -= dt;
        }
        
        this.player.update(dt)
    }
    /* method to draw the scene */
    draw(pCtx){
        pCtx.save(); // save actual pCtx (context)

        pCtx.scale(4,4); // add a scale factor to make the scene biger (4x4)
        // draw the background scoll 
        this.background.draw(pCtx);
        pCtx.restore();  // restore the previous pCtx(context) state from the save
        this.waveManager.draw(pCtx);
        this.player.draw(pCtx);
        this.lstBullet.forEach(bullet => {
            bullet.draw(pCtx);
        }) 
        this.partcleEmitter.draw(pCtx);
        
         // restore the previous pCtx(context) state from the save
        
    }
    getDistance() {
        return this.background.distance;
    }
    shoot(){
        let position = this.player.getShootPos(22);
        let bullet = new Bullets(position.x,position.y,2,0,"PLAYER");
        this.lstBullet.push(bullet);
    }
    keypressed(pKey){
        console.log("toutch press : " , pKey);
        if (pKey == "Space") {
        }

        
    }
}
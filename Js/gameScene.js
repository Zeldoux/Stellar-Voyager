// gameplayservice class meant to contain usefull data to be used by other class
class GameplayService {
    constructor(){
        this.canvas = null; // set  canvas
        this.bulletsManager = null; // set  bulletsmanager content
        this.waveManager = null; // set  wavemanager content
        this.player = null; // set player content
        this.ScrollingBackground = null;
        this.isDialog = false; // boolean value for future dialog 
    }
    // method to retrieve canvas used by gamescene (width,height ect...)
    setCanvas(pCanvas){
        this.canvas = pCanvas;

    }
    // method to retrieve bulletsmanager used by gamescene
    setBulletManager(pBulletManager) {
        this.bulletsManager = pBulletManager
    }
    // method to retrieve wavemanager used by gamescene
    setWaveManager(pWaveManager){
        this.WaveManager = pWaveManager;

    }
    // method to retrieve player used by gamescene
    setPlayer(pPlayer){
        this.player = pPlayer;

    }
    // method to retrieve the scrollingbackground used by gamescene
    setScrollingBackground(pScrollingBackground){
        this.scrollingBackground = pScrollingBackground;
    }
    setParticleEmitterManager(pParticleEmitterManager){
        this.ParticleEmitterManager = pParticleEmitterManager;
    }

}

// gameScene class to handle most of the game logic (player,enemyect...)
class GameScene {
    constructor() {
        this.imageLoader = null; // set imgloader 
        this.imgBackground = []; // set imgbackground 
        this.background = [];
        this.gameplayService = new GameplayService(); // add a new gameplayservice class
        this.bulletsManager = new BulletsManager() // add a new bulletsmanager class
        this.waveManager = new WaveManager(this.gameplayService); // add a new wavemanager class with gameplayservice as injected parameter 
        this.particleEmitterManager = new ParticleEmitterManager();
        this.lootManager = new LootManager();
        this.GameReady = false;

        // set gameplayservice content 
        this.gameplayService.setCanvas(canvas) // get canvas 
        this.gameplayService.setWaveManager(this.waveManager); // get wavemanager
        this.gameplayService.setBulletManager(this.bulletsManager); // get bulletmanager
        this.gameplayService.setParticleEmitterManager(this.particleEmitterManager);

        // set up shotspeed and shot timer for proper effect of shoot() function (one bullets after the other with a time between them of 0.2)
        this.shotSpeed = 0.2;
        this.shotTimer = 0;
        
    }
    /* method to load the scene */
    load(pImageLoader){
        // set sound variable
        this.sndExplosion = new sound("Sounds/explosion.wav");
        this.sndShoot = new sound("Sounds/laserShoot.wav");
        this.sndmusic = new sound("Sounds/RaphMusic.mp3");
        this.sndmusic.sound.volume = 0.5;
        this.sndmusic.sound.loop = true;
        this.sndmusic.play();
        
        
        // when imgloader has loaded all img we add it to the scene 
        this.imageLoader = pImageLoader;


        // we take the background img loaded in imgloader and set it in the variable 

        //  layer of the background
        this.imgBackground[0] = this.imageLoader.getImg("Img/tilemap/parralax.png");
        this.imgBackground[1] = this.imageLoader.getImg("Img/tilemap/parralax1.png");
        this.imgBackground[2] = this.imageLoader.getImg("Img/tilemap/parralax2.png");
        this.imgBackground[3] = this.imageLoader.getImg("Img/tilemap/parralax3.png");
        this.background[0] = new ScrollingBackground(this.imgBackground[0],0); // we then create a new scrollingbackground class with this loaded img from imgloader
        this.background[0].speed = 3; // set the background speed 
        this.background[1] = new ScrollingBackground(this.imgBackground[0],0 - 12)
        this.background[1].speed = 2.3;
        this.background[2] = new ScrollingBackground(this.imgBackground[1],0 - 12); // we then create a new scrollingbackground class with this loaded img from imgloader
        this.background[2].speed = 1.7; // set the background speed 
        this.background[3] = new ScrollingBackground(this.imgBackground[1],0 - 20)
        this.background[3].speed = 1.2;
        this.background[4] = new ScrollingBackground(this.imgBackground[2],0 - 19); // we then create a new scrollingbackground class with this loaded img from imgloader
        this.background[4].speed = 0.8; // set the background speed 
        this.background[5] = new ScrollingBackground(this.imgBackground[2],0 - 23)
        this.background[5].speed = 0.5;
        this.background[6] = new ScrollingBackground(this.imgBackground[3],0 - 23)
        this.background[6].speed = 0.1;
        
        


        this.player = new Player(25,40); // create a new player class with pos x , y


        /* create enemy sprite and animation for the waveManager */
        let imgEnemyBall = this.imageLoader.getImg("Img/Enemy/enemyball.png");
        let spriteEnemyBall = new Sprite(imgEnemyBall)
        spriteEnemyBall.setTileSheet(17,14)
        spriteEnemyBall.addAnim("IDLE", [0,1,2,3,4,5,6,7,8,9,10],0.1,true);
        spriteEnemyBall.startAnim("IDLE");

        /* create wave with this new enemysprite and add it to the waveManager */
        this.waveManager.addWave(new EnemyWave(spriteEnemyBall,5,0.5,1,1480,500,"Normal"));
        this.waveManager.addWave(new EnemyWave(spriteEnemyBall,15,0.5,2560,1280,250,"Normal"));
         // Add multiple particle emitters to the manager
        for (let i = 0; i < 5; i++) {
            let particleEmitter = new ParticleEmitter (200 , 100 );
            for (let n = 0; n < 50; n++) {
                particleEmitter.add("DEFAULT");
            }
            this.particleEmitterManager.addEmitter(particleEmitter);
        }
        

        }
    /* method to update the scene */
    update(dt){
        this.background.forEach(background => {
            background.update(dt)
        });
        // old v when only one layer for background : this.background.update(dt); // update background 
        this.waveManager.update(dt,this.background[0].distance); // update waveManager with background distance
        this.bulletsManager.update(dt); // update bulletsManager 
        this.handleCollision(dt);

    
        // handle key bind and event 
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
        // handle space binding for shooting 
        if (this.keyboard["Space"] ) {
            this.player.displayCanon = true; // display canon who will shoot (for a further logic it will be a animated canon that get display and after it loaded (last animation) you would be able to shoot untill it reload)
            if (this.shotTimer <= 0) {// check if the shot timer is at 0 to start a new shoot() 
                let position = this.player.getShootPos(22); // get the shooting position from the player position with getShootPos()
                this.bulletsManager.shoot(position.x,position.y,0,2,"PLAYER") // start shoot() function from bulletsManager
                this.shotTimer = this.shotSpeed; // reset shottimer with shotspeed 
                this.sndShoot.stop();
                this.sndShoot.play();
            }
        } else {
            // otherwise hide the canon 
            this.player.displayCanon = false;
        }
        // if the timer is above 0 get him decrease with - dt (delta time)
        if (this.shotTimer > 0 ){
            this.shotTimer -= dt;
        }
        this.lootManager.update(dt);
        // update player 
        this.player.update(dt);
        this.particleEmitterManager.update(dt); // update particle emitter
    }
    /* method to draw the scene */
    draw(pCtx){
        pCtx.save(); // save actual pCtx (context)

         // add a scale factor to make the scene biger (4x4)
        // draw the background scoll 
        
        
        pCtx.scale(4, 4); // Scaling the context
        this.background.forEach(bg => bg.draw(pCtx));

        pCtx.restore();
        
          // restore the previous pCtx(context) state from the save
        
        this.waveManager.draw(pCtx);
        this.bulletsManager.draw(pCtx)
        this.lootManager.draw(pCtx);
        this.player.draw(pCtx);
        this.particleEmitterManager.draw(pCtx);
        
        
         // restore the previous pCtx(context) state from the save
        
    }
    // get the distance of the actual background 
    getDistance() {
        return this.background.distance;
    }
    // function to handle key pressed 
    keypressed(pKey){
        console.log("toutch press : " , pKey);
    }
    // method to hadle collision in the scene 
    handleCollision(dt){
        // handle bullet collision 
        for (let index = this.bulletsManager.lstBullets.length - 1; index >= 0; index-- ){
            const bullet = this.bulletsManager.lstBullets[index];
            if (bullet.type == "PLAYER") { // check if the bullet type is player 
            
                this.waveManager.waveList.forEach(wave => {
                    for (let indexEnemy = wave.enemyList.length - 1 ; indexEnemy >= 0; indexEnemy-- ){// iterate trough all enemy from enemylist in reverse way from last to first
                        const e = wave.enemyList[indexEnemy].sprite; // set each enemy index in a variable here e 
                        
                        // handle player bullet collision with ENEMY
                        if (bullet.collideWith(e)) {
                             // use the collideWith function between the bullet and e(Enemy.sprite)
                            console.log("collision between player bullet and enemy");
                            // Remove the bullet
                            this.bulletsManager.lstBullets.splice(index, 1);
                             let enemypos = {x:0,y:0}; // get enemy pos x , y
                             enemypos.x = e.x;
                             enemypos.y = e.y;
                            // Remove the enemy
                            wave.enemyList.splice(indexEnemy, 1);
                            if (e.category == "Normal") { // get enemy category 
                                this.lootManager.lootDrop(1,enemypos.x,enemypos.y) // spawn loot 
                            }
                            
                            // particle effect 
                            let newExplosion = new ParticleEmitter(e.x,e.y);
                            for(let n=0; n < 20 ; n++) {
                                newExplosion.add("DEFAULT");
    
                            } 
                            this.particleEmitterManager.addEmitter(newExplosion);
                            // sound effect
                            
                            this.sndExplosion.stop();
                            this.sndExplosion.play();
                        }
                    }
                });
               
            }
            // handle collision of enemy bullet with PLAYER
            if (bullet.type == "ENEMY"){
                if (bullet.collideWith(this.player.sprShip)){
                    this.player.life -= 10;
                    this.bulletsManager.lstBullets.splice(index,1);

                }

            }
        }
        // handle loot collision with player and bonus 
        for (let indexLoot = this.lootManager.lootList.length - 1 ; indexLoot >= 0; indexLoot --){
            const loot = this.lootManager.lootList[indexLoot];
            if (loot.type == "HEAL") {
                this.lootManager.lootList.forEach(loot => {
                    if (loot.collideWith(this.player.sprShip)){
                        this.player.life += 20;
                        this.lootManager.lootList.splice(indexLoot,1);
                    }
                });
            }
            if (loot.type == "SHIELD"){
                this.lootManager.lootList.forEach(loot => {
                    if (loot.collideWith(this.player.sprShip)){
                        this.player.life += 100;
                        this.lootManager.lootList.splice(indexLoot,1);
                    }
                });

            }


        }
    }
}
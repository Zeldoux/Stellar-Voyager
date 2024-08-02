let imgLoader = new imageLoader(); // create a new img loader
// old var /*let lstSprites = []; // sprite list*/
let currentScene = "CHOICE";
let sceneMenu = new MenuScene();
let gameScene = new GameScene(); // create a new game scene


let keyboard = [];
    /* method to handle when a key is pressed (true) */
function keyPush(t) {
        /*prevent default behavior of pressing a key */
        t.preventDefault();
        if (keyboard[t.code] == false || keyboard[t.code] == null ){
            gameScene.keypressed(t.code);
            sceneMenu.keypressed(t.code);
        }
        keyboard[t.code] = true ;
    }
/* method to handle when key is relief (false) */
function keyRelief(t) {
        /* prevent default behavior of relief pressed key */
        t.preventDefault();
        keyboard[t.code] = false;
    }

/* function that start the game after the img loader has finish loading all img */
function startGame() {
    console.log("game start !");
    gameScene.load(imgLoader); // load img loaded from the imgLoader() into the gamescene class 
    gameScene.GameReady = true;
    sceneMenu.MenuReady = false;
}
function startMenu(){
    sceneMenu.load(imgLoader);
    sceneMenu.MenuReady = true;

}

/* load function set to be loaded one time at the begining of the init() function */
function load() {
    // Bind key event handlers
    document.addEventListener("keydown", (t) => keyPush(t), false);
    document.addEventListener("keyup", (t) => keyRelief(t), false);
    
    // bind spacebar event for shoot method
    imgLoader.add("Img/Player/lifeBarSP.png");
    imgLoader.add("Img/Booster/booster.png");
    imgLoader.add("Img/Booster/booster1.png");
    imgLoader.add("Img/Booster/booster2.png");
    imgLoader.add("Img/tilemap/parralax.png");
    imgLoader.add("Img/tilemap/parralax1.png");
    imgLoader.add("Img/tilemap/parralax2.png");
    imgLoader.add("Img/tilemap/parralax3.png");
    imgLoader.add("Img/tilemap/backgroundlayer1.png");
    imgLoader.add("Img/tilemap/backgroundlayer2.png")
    imgLoader.add("Img/Player/playercanonshootsprtsheet.png");
    imgLoader.add("Img/Enemy/ShotBig4.png");
    imgLoader.add("Img/Player/playercanonsprtsheet.png");
    imgLoader.add("Img/Player/playerspaceshipR.png");
    imgLoader.add("Img/Enemy/ShotTiny.png");
    imgLoader.add("Img/Enemy/ShotBasic.png");
    imgLoader.add("Img/Enemy/enemyball.png");
    imgLoader.add("Img/Player/projectile.png");
    imgLoader.add("Img/Spritesheet/grid1.png");
    imgLoader.add("Img/stars/background.png");
    imgLoader.add("Img/Spritesheet/Spaceship12.png");
    imgLoader.add("Img/Player/playerspaceship.png");
    imgLoader.add("Img/Player/background.png");
    imgLoader.add("Img/Player/grid1.png");
    imgLoader.add("Img/Player/Player.png");
    imgLoader.add("Img/Player/playerAsteroid.png");
    imgLoader.add("Img/Player/playerAsteroid1.png");
    imgLoader.add("Img/Player/playerAsteroid11.png");
    imgLoader.add("Img/Stars/Bstar1.png");
    imgLoader.add("Img/Stars/Bstar11.png");
    imgLoader.add("Img/Stars/Bstar12.png");
    imgLoader.add("Img/Stars/Bstar13.png");
    /* when all img are loaded in the loader execute callback of fucntion startGame */
    imgLoader.start(startMenu);
}
/* update function set to be used 60 time per seconde in the run() function */
function update(dt) {
    if (sceneMenu.MenuReady) {
        sceneMenu.keyboard = keyboard;
        sceneMenu.update(dt);
        
    } else if (gameScene.GameReady) {
        gameScene.keyboard = keyboard;
        gameScene.update(dt);
    }
    
}
/* draw function set to be used 60 time per seconde in the run() function */
function draw(pCtx) {
    if (!sceneMenu.MenuReady) {
        // Handle loading screen or initialization
        let ratio = imgLoader.getLoadedRatio();
        pCtx.fillStyle = "rgb(255,255,255)";
        pCtx.fillRect(1, 1, 600, 100);
        pCtx.fillStyle = "rgb(0,255,0)";
        pCtx.fillRect(1, 1, 600 * ratio, 100);
    } else if (sceneMenu.MenuReady) {
        sceneMenu.draw(pCtx);
    }

    if (gameScene.GameReady) {
        gameScene.draw(pCtx);
    }
    
}

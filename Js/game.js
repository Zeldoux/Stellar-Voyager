let imgLoader = new imageLoader(); // Create a new image loader
let soundManager = new SoundManager();

inputManager = new InputManager(); // Initialize InputManager
let sceneManager = new SceneManager(); // Create a new scene manager
let menuScene = new MenuScene(); // Create menu scene
let gameScene = new GameScene(); // Create a new game scene
let choicesScene = new ChoiceScene(); // Create choice scene


sceneManager.addScene("MENU",menuScene);
sceneManager.addScene("CHOICE",choicesScene);

let imgloaded = false;

/* load function set to be loaded one time at the begining of the init() function */
function load() {
    // load all music
    soundManager.addSound("Sounds/explosion.wav");
    soundManager.addSound("Sounds/laserShoot.wav");
    soundManager.addSound("Sounds/inspiring-cinematic-ambient-116199.mp3");
    soundManager.addSound("Sounds/blipSelect.wav");
    soundManager.addSound("Sounds/RaphMusic.mp3");
    
    // Add images to the loader
    imgLoader.add("Img/Player/playerShipV2.png");
    imgLoader.add("Img/Player/playerShipV3.png");
    imgLoader.add("Img/Player/playerspaceshipD.png");
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
    // Start loading images and sounds
    imgLoader.start(() => {
        soundManager.start(() => {
            sceneManager.switchToScene("MENU", imgLoader);
        });
    });

}
// update function set to be used 60 time per seconde in the run() function */
function update(dt) {
    if (!sceneManager.currentScene) {
        return;
    } else {
        sceneManager.update(dt);
    }
    
}
// draw function set to be used 60 time per seconde in the run() function */
function draw(pCtx) {
    if (!sceneManager.currentScene) {
        // Handle loading screen or initialization
        let ratio = imgLoader.getLoadedRatio();
        pCtx.fillStyle = "rgb(255,255,255)";
        pCtx.fillRect(1, 1, 600, 100);
        pCtx.fillStyle = "rgb(0,255,0)";
        pCtx.fillRect(1, 1, 600 * ratio, 100);
    } else {
    sceneManager.draw(pCtx);
    }
}

function startGame() {
    let newGameScene = new GameScene(); // Create a new game scene instance
    sceneManager.addScene("GAME", newGameScene); // Add it to the scene manager
    sceneManager.switchToScene("GAME", imgLoader); // Switch to the new game scene
}


function selectShipScene() {
    sceneManager.switchToScene("CHOICE", imgLoader);
}

function loadSaveGame(){
    console.log("open save window ");
}
function optionWindow(){
    console.log("option menu opened");
}
function ExitGame(){
    console.log("exit the game")
}
function backMenu(){
    sceneManager.switchToScene("MENU",imgLoader);
}


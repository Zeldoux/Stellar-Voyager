class Scene {
    constructor(){
        this.keyboard = {};
        this.ready = false;
        this.sounds ={};
    
    }
    load(imgLoader){}
    update(dt){}
    draw(pCtx){}
    keypressed(t){}
}
class SceneManager{
    constructor(){
        this.scenes = {};
        this.currentScene = null;
        this.paused = false; // Add pause state
        this.inputManager = new InputManager();// Instantiate InputManager

    }
    addScene(name,scene){
        this.scenes[name] = scene;
    }

    switchToScene(name,imgLoader){
        if (this.scenes[name]){
            if (this.currentScene) {
                this.currentScene.ready = false;
            }
            this.currentScene = this.scenes[name];
            this.currentScene.load(imgLoader);
            this.currentScene.ready = true;
        }
    }

    update(dt){
        if (this.currentScene && this.currentScene.ready){
            let keyboardState = this.inputManager.getKeyboardState()
            this.currentScene.keyboard = keyboardState;
            this.currentScene.update(dt);
        }
    }
    draw(pCtx){
        if (this.currentScene && this.currentScene.ready){
            this.currentScene.draw(pCtx);
        }
    }
    
    handleKeyPress(keyCode) {
        if (this.currentScene && this.currentScene.ready) {
            this.currentScene.keypressed(keyCode); // Pass key code and state (pressed/released)
        }
    }
}
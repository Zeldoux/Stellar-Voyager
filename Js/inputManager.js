class InputManager {
    constructor() {
        this.keyboard = {};
        // event listener on key press or release
        document.addEventListener("keydown", (t) => this.keyPush(t), false);
        document.addEventListener("keyup", (t) => this.keyRelief(t), false);
    }

    keyPush(e) {
        if (!this.keyboard[e.code]) {
            console.log("key press : ",e.code)
            // Notify SceneManager about the key press
            sceneManager.handleKeyPress(e.code); // Pass key code and state (pressed)
        }
        this.keyboard[e.code] = true;
    }

    keyRelief(e) {
        if (this.keyboard[e.code]) {
            // Notify SceneManager about the key release
            sceneManager.handleKeyPress(e.code); // Pass key code and state (released)
        }
        this.keyboard[e.code] = false;
    }

    getKeyboardState() {
        return this.keyboard;
    }
}

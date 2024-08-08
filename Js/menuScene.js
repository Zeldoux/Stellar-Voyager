"use strict";

class MenuScene extends Scene {
    constructor(){
        super(); // call the base class constructor (Scene)
        this.imgloader = null;

        this.particleEmitterManager = new ParticleEmitterManager();
        this.gameplayService = new GameplayService();
        this.MenuReady = false;
        this.ready = false;
        this.keyboard = null;
        // Define the buttons
        this.buttons = [
            { label: 'Start Game', x: 535, y: 200, width: 200, height: 50, action: selectShipScene },
            { label: 'Load Game', x: 535, y: 260, width: 200, height: 50, action: loadSaveGame  },
            { label: 'Options', x: 535, y: 320, width: 200, height: 50, action: optionWindow },
            { label: 'Exit', x: 535, y: 380, width: 200, height: 50, action: ExitGame }
        ];
        this.selectedButtonIndex = 0;
    }
    load (pImageLoader) {
        this.imgloader = pImageLoader;
        soundManager.playSound("Sounds/inspiring-cinematic-ambient-116199.mp3");
    }
    update(dt){
        for (let i = 0; i < 10; i++) {
            let x = Math.random() * canvas.width;
            let y = -Math.random() * canvas.height ;
            let particleEmitter = new ParticleEmitter (x, y );
            particleEmitter.infinitParticl = true;
            particleEmitter.add("STARS");
            this.particleEmitterManager.addEmitter(particleEmitter);
        }
        this.particleEmitterManager.update(dt);
        if (this.keyboard["Enter"]) {
            soundManager.playSound("Sounds/blipSelect.wav");
            this.buttons[this.selectedButtonIndex].action();
            this.keyboard["Enter"] = false;
            
            
            
        }
        if (this.keyboard["ArrowUp"]){
            this.selectedButtonIndex = (this.selectedButtonIndex > 0) ? this.selectedButtonIndex - 1 : this.buttons.length - 1 ;
            soundManager.playSound("Sounds/blipSelect.wav");
            this.keyboard["ArrowUp"] = false;
        }
        if (this.keyboard["ArrowDown"]){
            soundManager.playSound("Sounds/blipSelect.wav");
            this.selectedButtonIndex = (this.selectedButtonIndex < this.buttons.length - 1) ? this.selectedButtonIndex + 1 : 0;

            this.keyboard["ArrowDown"] = false;
        }
    }
    draw(pCtx){

        this.particleEmitterManager.draw(pCtx);
        // Draw the title
        pCtx.font = "30px 'Press Start 2P'"; // Set font size and style for the title
        pCtx.fillStyle = "white";
        pCtx.textAlign = "center";
        pCtx.fillText("Stellar Voyager", CanvasWidth / 2, 100);
        
        // Draw the buttons
        this.buttons.forEach((button, index) => {
            pCtx.fillStyle = index === this.selectedButtonIndex ? 'darkblue' : 'grey';
            pCtx.fillRect(button.x, button.y, button.width, button.height);
            
            pCtx.fillStyle = "white";
            pCtx.font = "20px 'Press Start 2P'"; // Set font size and style for the buttons
            pCtx.textAlign = "center";
            pCtx.textBaseline = "middle";
            pCtx.fillText(button.label, button.x + button.width / 2, button.y + button.height / 2);
        });
    }
    keypressed(pKey){
        if (this.keyboard[pKey]) { // Check if the key is already pressed
            this.keyboard[pKey] = true;
        }
        console.log(pKey);
    }
    
}


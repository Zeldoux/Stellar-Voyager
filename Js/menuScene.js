"use strict";

class MenuScene {
    constructor(){
        this.imgloader = null;
        this.particleEmitterManager = new ParticleEmitterManager();
        this.gameplayService = new GameplayService();
        this.MenuReady = false;
        this.keyboard = null;
        this.sndmusic = new sound("Sounds/inspiring-cinematic-ambient-116199.mp3");
        this.sndmusic.sound.volume = 0.5;
        this.sndmusic.sound.loop = true;
        // Define the buttons
        this.buttons = [
            { label: 'Start Game', x: 300, y: 200, width: 200, height: 50, action: startGame },
            { label: 'Load Game', x: 300, y: 260, width: 200, height: 50, action: startGame  },
            { label: 'Options', x: 300, y: 320, width: 200, height: 50, action: startGame },
            { label: 'Exit', x: 300, y: 380, width: 200, height: 50, action: startGame }
        ];
        this.selectedButtonIndex = 0;
    }
    load (pImageLoader) {
        this.imgloader = pImageLoader; 
        this.sndmusic.play();

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
            this.buttons[this.selectedButtonIndex].action();
            
        }
        if (this.keyboard["ArrowUp"]){
            this.selectedButtonIndex = (this.selectedButtonIndex > 0) ? this.selectedButtonIndex - 1 : this.buttons.length - 1 ;
        }
        if (this.keyboard["ArrowDown"]){
            this.selectedButtonIndex = (this.selectedButtonIndex < this.buttons.length - 1) ? this.selectedButtonIndex + 1 : 0;
        }
        if (!this.MenuReady){
            this.sndmusic.stop()
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
            pCtx.fillStyle = index === this.selectedButtonIndex ? 'black' : 'grey';
            pCtx.fillRect(button.x, button.y, button.width, button.height);
            
            pCtx.fillStyle = "white";
            pCtx.font = "20px 'Press Start 2P'"; // Set font size and style for the buttons
            pCtx.textAlign = "center";
            pCtx.textBaseline = "middle";
            pCtx.fillText(button.label, button.x + button.width / 2, button.y + button.height / 2);
        });
    }
    keypressed(pKey){
        console.log(pKey);
    }
    
}


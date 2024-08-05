class ChoiceScene extends Scene{
    constructor(){
        super()  // Call the base class constructor
        this.imgloader = null;
        this.particleEmitterManager = new ParticleEmitterManager();
        this.choiceReady = false;
        this.keyboard = null;
        
        this.selectedButtonIndex = 0;   
        
    }

    load(pImageLoader){
        this.imgloader = pImageLoader;
        this.ShipSprite1 = imgLoader.getImg("Img/Player/playerspaceshipD.png");
        this.ShipSprite2 = imgLoader.getImg("Img/Player/playerShipV2.png");
        this.ShipSprite3 = imgLoader.getImg("Img/Player/playerShipV3.png");
        
        this.buttons = [
            { image: this.ShipSprite1, x: 300, y: 200, width: 200, height: 200, action: startGame },
            { image: this.ShipSprite2, x: 550, y: 200, width: 200, height: 200, action: startGame },
            { image: this.ShipSprite3, x: 800, y: 200, width: 200, height: 200, action: startGame }
        ];
        this.ready = true;
        

    }
    update(dt){

        if (this.keyboard["Enter"]) {
            this.buttons[this.selectedButtonIndex].action();
            this.keyboard["Enter"] = false;
            
        }
        if (this.keyboard["ArrowLeft"]){
            this.selectedButtonIndex = (this.selectedButtonIndex > 0) ? this.selectedButtonIndex - 1 : this.buttons.length - 1 ;

            this.keyboard["ArrowLeft"] = false;
        }
        if (this.keyboard["ArrowRight"]){

            this.selectedButtonIndex = (this.selectedButtonIndex < this.buttons.length - 1) ? this.selectedButtonIndex + 1 : 0;

            this.keyboard["ArrowRight"] = false;
        }

    }
    
    draw(pCtx){
        pCtx.font = "30px 'Press Start 2P'"; // Set font size and style for the title
        pCtx.fillStyle = "white";
        pCtx.textAlign = "center";
        pCtx.fillText("Select Your SpaceShip !", CanvasWidth / 2, 100);


        this.buttons.forEach((button, index) => {
            pCtx.fillStyle = index === this.selectedButtonIndex ? 'darkblue' : 'grey';
            pCtx.fillRect(button.x, button.y, button.width, button.height);
            
            pCtx.fillStyle = "white";
            pCtx.font = "20px 'Press Start 2P'"; // Set font size and style for the buttons
            pCtx.textAlign = "center";
            pCtx.textBaseline = "middle";
            pCtx.drawImage(button.image,button.x,button.y,button.width,button.height)
        });




    }
    keypressed(pKey){
        if (this.keyboard[pKey]) { // Check if the key is already pressed
            this.keyboard[pKey] = true;
        }

    }
    

}
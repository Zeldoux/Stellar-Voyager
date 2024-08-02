class UImanager{
    constructor(){
        this.player;
        this.displayLife;
        


    }
    GetPlayerUI(pPlayer){
        this.player = pPlayer
        this.displayLife = pPlayer.life;
        this.playerSpeed = pPlayer.speed;
    }
    
    update(dt){
        this.displayLife;

    }

    draw(pCtx){
        this.displayLife.draw();
    }
}
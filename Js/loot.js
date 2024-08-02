// loot class wich is a sprite with loot attribute 
class Loot extends Sprite {
    constructor(pX, pY,pvX,pvY, pType){
        let img;
        switch (pType){
            case "HEAL": // type of loot 
                img = imgLoader.getImg("Img/Booster/booster.png");
                super(img,pX,pY)
                this.setTileSheet(25,25);

            break;

            case "SHIELD":
                img = imgLoader.getImg("Img/Booster/booster1.png");
                super(img,pX,pY);
                this.setTileSheet(25,25);

            break;

            default:
                console.error("Loot constructor => Error there is no Loot Type")
        }
        this.vx = pvX;
        this.vy = pvY;
        this.type = pType; // e.g., 'health', 'ammo'
        this.width = 25; // Adjust size as needed
        this.height = 25; // Adjust size as needed
        this.isActive = true; // Whether the loot is currently active

    }
    // delete if offscreen
    isOffScreen(pWidth,pHeight){
        if (this.x + this.tileSize.x < 0 || this.y + this.tileSize.y < 0 || this.x > pWidth || this.y > pHeight){
            return true;
        } else {
            return false;
        }
    }
    update(dt){
        super.update(dt);
        this.x += this.vx;
        this.y += this.vy;
        if (this.isOffScreen(window.innerWidth, window.innerHeight)) {
            this.isActive = false;
        }
    }
        
}
// loot manager class made to handle all loot 
class LootManager {
    constructor(){
        this.lootList = [];
    }
    addLoot(loot){
        this.lootList.push(loot);
    }

     // Method to handle loot drops
     lootDrop(pDroprate, enemyX, enemyY) {
        let randomChance = Math.random();
        if (randomChance < pDroprate) {
            let lootType = randomChance < pDroprate / 2 ? 'HEAL' : 'SHIELD'; // Example loot types
            let loot = new Loot(enemyX, enemyY, 0, 1, lootType);
            this.addLoot(loot);
            console.log(`Loot dropped at (${enemyX}, ${enemyY})`);
        }
    }

    update(dt){
        this.lootList.forEach(loot => loot.update(dt));
        
        this.lootList = this.lootList.filter(loot => loot.isActive);
    }
    draw(pCtx){
        this.lootList.forEach(loot => loot.draw(pCtx));
    }
}
class Enemy{
    constructor(pSprite,pCategory,pGameplayService){
        this.sprite = pSprite
        this.timer = 0;
        this.pendingDelay = 0;
        this.started = false;
        this.speed = 1;
        this.gameplayService = pGameplayService;
        this.fireTimer = rnd(3,8)
        this.sprite.category = pCategory

    }
    fire() {
        if (this.fireTimer <= 0) {
            this.gameplayService.bulletsManager.shoot(this.sprite.x, this.sprite.y , Math.random() * (2 * Math.PI ), 1,"ENEMY")
            this.fireTimer = rnd(3,5)
        }
    }
    update(dt){
        this.sprite.update(dt);
        this.fireTimer -= dt;
        
    }
    draw(pCtx){
        this.sprite.draw(pCtx);
    }
}

class EnemyWave{
    constructor(pSprite,pNumber,pPendingDelay,pStartDistance,pX,pY,pCategory){
        this.enemyList =[];
        console.log("EnemyWave construction...")
        this.startDistance = pStartDistance;
        this.started = false;
        this.sprite = pSprite;
        this.number = pNumber;
        this.pendingDelay = pPendingDelay;
        this.x = pX;
        this.y = pY;
        this.category = pCategory
        
    }
    addEnemy(pEnemy){
        this.enemyList.push(pEnemy);
    }
    update(dt){
        for (let i = this.enemyList.length - 1 ; i >= 0 ; i-- ) { // iterate trough all enemy of the wave
            let enemy = this.enemyList[i];
            if (enemy.started == false) {
                enemy.timer += dt;
                
                if (enemy.timer >= enemy.pendingDelay){
                    console.log("enemy start at : ",enemy.timer)
                    enemy.started = true;
                }

            }
            if (enemy.started){
                enemy.update(dt);
                enemy.fire();
                enemy.sprite.x -= enemy.speed;
                if (enemy.sprite.x < 0 - enemy.sprite.tileSize.x) {
                    console.log("enemy out of bound supression...");
                    this.enemyList.splice(i, 1);
                }
            }
        }
        
    }
    draw(pCtx){
        this.enemyList.forEach(enemy => {
            enemy.draw(pCtx);
        });
    }
}
class WaveManager{
    constructor(pGameplayService){
        console.log("construction of the WaveManager....")
        this.waveList = [];
        this.gameplayService = pGameplayService;
         
    }
    addWave(pWave){
        console.log("wave added to the list : ",pWave)
        this.waveList.push(pWave);
    }
    stopWave(pWave){
        console.log("older wave stoped ");
        let index = this.waveList.indexOf(pWave); // check if index exist if not it return -1 
        if (index != -1 ){
            this.waveList.splice(index, 1); // if index is not -1 delete the index (pWave)
        }
    }
    startWave(pWave){
        console.log("wave started at ", pWave.startDistance);
        pWave.started = true;
        if (this.currentWave != null) {
        
        }
        

        for (let i = 0; i < pWave.number; i++){
            console.log("create enemy : " , i);
            let mySprite = new Sprite(pWave.sprite.img);
            console.log("enemy sprite : ", mySprite);
            Object.assign(mySprite, pWave.sprite);
            console.log("enemy updated sprite content : ", mySprite);

            let enemy = new Enemy(mySprite,pWave.category,this.gameplayService);
            console.log(enemy);
            enemy.sprite.x = pWave.x;
            enemy.sprite.y = pWave.y;
            enemy.pendingDelay = i * pWave.pendingDelay;
            pWave.addEnemy(enemy);

        }

        
    }
    update(dt, pDistance) {
        this.waveList.forEach(wave => {
            if (pDistance >= wave.startDistance && !wave.started ){
                this.startWave(wave);

            }
            if (wave.started) {
                wave.update(dt);
            }
        });
    }
    draw(pCtx){
        this.waveList.forEach(wave => {
            wave.draw(pCtx);
        });
    }
}


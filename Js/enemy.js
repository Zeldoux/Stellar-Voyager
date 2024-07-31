class Enemy{
    constructor(pSprite){
        this.sprite = pSprite
        this.timer = 0;
        this.pendingDelay = 0;
        this.started = false;
        this.speed = 1;
        console.log(this.sprite.imgPath);

    }
    update(dt){
        this.sprite.update(dt);
    }
    draw(pCtx){
        this.sprite.draw(pCtx);
    }
}

class EnemyWave{
    constructor(pSprite,pNumber,pPendingDelay,pStartDistance,pX,pY){
        this.enemyList =[];
        console.log("EnemyWave construction...")
        this.startDistance = pStartDistance;
        this.started = false;
        this.enemyList =[];
        this.sprite = pSprite;
        this.number = pNumber;
        this.pendingDelay = pPendingDelay;
        this.x = pX;
        this.y = pY;
        
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
    constructor(){
        console.log("construction of the WaveManager....")
        this.waveList = [];
        this.currentWave = null;
         
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
            this.stopWave(pWave);
        }
        this.currentWave = pWave;

        for (let i = 0; i < pWave.number; i++){
            console.log("create enemy : " , i);
            let mySprite = new Sprite(pWave.sprite.img);
            console.log("enemy sprite : ", mySprite);
            Object.assign(mySprite, pWave.sprite);
            console.log("enemy updated sprite content : ", mySprite);

            let enemy = new Enemy(mySprite);
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
        });
        if (this.currentWave != null) {
            this.currentWave.update(dt);
        }
    }
    draw(pCtx){
        if (this.currentWave != null) {
            this.currentWave.draw(pCtx);
        }
    }
}


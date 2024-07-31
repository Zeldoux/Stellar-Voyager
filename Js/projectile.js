class Projectile {
    constructor(pImg, x, y, speed) {
        this.sprite = new Sprite(pImg, x, y);
        this.speed = speed;
        this.x = x;
        this.y = y;
    }

    update(dt) {
        // Move the projectile upwards
        this.x += this.speed;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.update(dt);
    }

    draw(pCtx) {
        this.sprite.draw(pCtx);
    }

    isOffScreen() {
        return this.y < 0;
    }

    // Add collision detection methods if needed
}

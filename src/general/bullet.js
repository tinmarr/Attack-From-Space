class Bullet {
    constructor(x,y,animation,damage,speedx,speedy){
        // Create Sprite
        this.sprite = scene.physics.add.sprite(x,y,animation);
        // Configure Sprite
        this.sprite.setVelocity(speedx, speedy);
        this.sprite.body.width -= 5;
        this.sprite.body.height -= 5;
        this.sprite.body.offset.x += 2.5;
        this.sprite.body.offset.y += 2.5;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.onWorldBounds = true;
        this.sprite.body.allowDrag = true;
        this.sprite.name = 'bullet';
        if (speedy < 0){
            this.sprite.setAngle(180);
        }
        // Set Damage
        this.damage = damage;
    }
    hitWorldBounds(){
        this.sprite.destroy();
    }
}

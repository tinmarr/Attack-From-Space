class Entity {
    constructor(scene, x, y, animation, health, gunType){
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, animation);
        this.health = health;
        this.sprite.body.immovable = true;
        this.scene.physics.add.collider(this.sprite, playerBullets.sprites, this.hit);
        this.initial = {x:x,y:y};
        this.sprite.name = 'entity';
        this.sprite.setAngle(180);
        this.weapon = new (stringToWeapon(gunType))(enemyBullets, -1, this);
    }
    hit(entitySprite, bulletSprite){
        if (bulletSprite.name == 'bullet'){
            entities.getClass(entitySprite).health -= allBullets.getClass(bulletSprite).damage;
            bulletSprite.destroy();
        } else if (bulletSprite.name == 'entity'){
            entities.getClass(entitySprite).health -= entities.getClass(bulletSprite).weapon.damage;
            entities.getClass(bulletSprite).health = 0;
        }
    }
    move(){}
    update(){
        if (this.health <= 0){
            try {
                this.healthBar.destroy();
            } catch(err){};
            this.sprite.destroy();
            entities.removeElement(this);
        } else {
            this.move();
            this.weapon.waitTime--;
        }
    }
}
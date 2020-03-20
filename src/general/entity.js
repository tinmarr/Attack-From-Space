class Entity {
    constructor(x, y, animation, health, gunType){
        this.sprite = scene.physics.add.sprite(x, y, animation);
        this.health = health;
        this.sprite.body.immovable = true;
        scene.physics.add.collider(this.sprite, world.playerBullets.sprites, this.hit);
        this.sprite.body.width -= 5;
        this.sprite.body.height -= 5;
        this.sprite.body.offset.x += 2.5;
        this.sprite.body.offset.y += 2.5;
        this.initial = {x:x,y:y,health:health};
        this.weapon = new (stringToWeapon(gunType))(world.enemyBullets, -1, this);
        this.healthBar = scene.add.rectangle(this.sprite.x, this.sprite.y-20, Math.sign(this.health) === -1 ? 0 : (this.health/1000) * 100, 10, 0xff0000);
        this.healthBarOut = scene.add.rectangle(this.sprite.x, this.sprite.y-20, Math.sign(this.health) === -1 ? 0 : (this.health/1000) * 100, 10, 0xff0000);
    }
    hit(entitySprite, bulletSprite){
        if (bulletSprite.name == 'bullet'){
            world.entities.getClass(entitySprite).health -= world.allBullets.getClass(bulletSprite).damage;
            bulletSprite.destroy();
        } else {
            world.entities.getClass(entitySprite).health -= world.entities.getClass(bulletSprite).weapon.damage;
            world.entities.getClass(bulletSprite).health = 0;
            if (entitySprite.name === 'player'){
                world.updateScore('player');
            }
        }
    }
    move(){}
    update(){
        if (this.health <= 0){
            try {
                this.healthBar.destroy();
                this.healthBarOut.destroy();
            } catch(err){};
            world.updateScore(this.sprite.name);
            if (this.sprite.name === 'player'){
                world.dead = true;
            }
            this.sprite.destroy();
            world.entities.removeElement(this);
        } else {
            this.healthBar.destroy();
            this.healthBarOut.destroy();
            if (this.health < this.initial.health && this.sprite.name !== 'player'){
                this.healthBarOut = scene.add.rectangle(this.sprite.x, this.sprite.y-20, Math.sign(this.health) === -1 ? 0 : 40, 5, 0xffff00);
                this.healthBar = scene.add.rectangle(this.sprite.x, this.sprite.y-20, Math.sign(this.health) === -1 ? 0 : (this.health/this.initial.health) * 40, 5, 0x00ff00);                
            }
            this.move();
            this.weapon.waitTime--;
            try{
                this.weapon1.waitTime--;
                this.weapon2.waitTime--;
            } catch(err){};
        }
    }
}
class Entity {
    constructor(scene, x, y, animation, health, gunType){
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, animation);
        this.health = health;
        this.sprite.body.immovable = true;
        this.scene.physics.add.collider(this.sprite, playerBullets.sprites, this.hit);
        this.sprite.body.width -= 5;
        this.sprite.body.height -= 5;
        this.sprite.body.offset.x += 2.5;
        this.sprite.body.offset.y += 2.5;
        this.initial = {x:x,y:y,health:health};
        this.weapon = new (stringToWeapon(gunType))(enemyBullets, -1, this);
        this.healthBar = this.scene.add.rectangle(this.sprite.x, this.sprite.y-20, Math.sign(this.health) === -1 ? 0 : (this.health/1000) * 100, 10, 0xff0000);
        this.healthBarOut = this.scene.add.rectangle(this.sprite.x, this.sprite.y-20, Math.sign(this.health) === -1 ? 0 : (this.health/1000) * 100, 10, 0xff0000);
    }
    hit(entitySprite, bulletSprite){
        if (bulletSprite.name == 'bullet'){
            entities.getClass(entitySprite).health -= allBullets.getClass(bulletSprite).damage;
            bulletSprite.destroy();
        } else {
            entities.getClass(entitySprite).health -= entities.getClass(bulletSprite).weapon.damage;
            entities.getClass(bulletSprite).health = 0;
            if (entitySprite.name === 'player'){
                updateScore('player');
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
            updateScore(this.sprite.name);
            this.sprite.destroy();
            entities.removeElement(this);
        } else {
            this.healthBar.destroy();
            this.healthBarOut.destroy();
            if (this.health < this.initial.health && this.sprite.name !== 'player'){
                this.healthBarOut = this.scene.add.rectangle(this.sprite.x, this.sprite.y-20, Math.sign(this.health) === -1 ? 0 : 40, 5, 0xffff00);
                this.healthBar = this.scene.add.rectangle(this.sprite.x, this.sprite.y-20, Math.sign(this.health) === -1 ? 0 : (this.health/this.initial.health) * 40, 5, 0x00ff00);                
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
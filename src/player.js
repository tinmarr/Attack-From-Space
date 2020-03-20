class Player extends Entity {
    constructor(x = width/2, y = height-50, animation = 'player', health = 100, gunType='player') {
        super(x, y, animation, health, gunType);
        scene.physics.add.collider(this.sprite, world.enemyBullets.sprites, this.hit);
        scene.physics.add.collider(this.sprite, world.entities.sprites, this.hit);
        this.sprite.body.collideWorldBounds = true;
        this.currentGunType = gunType;
        this.changeGunType = gunType;
        this.weapon = new (stringToWeapon(gunType))(world.playerBullets, 1, this);
        this.sprite.name = 'player';
    }
    move() {
        if (this.currentGunType !== this.changeGunType){
            this.weapon = new (stringToWeapon(this.changeGunType))(world.playerBullets, 1, this);
            this.currentGunType = this.changeGunType;
        }
        if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
            if(this.sprite.body.velocity.x > 0){
                this.sprite.setAccelerationX(0);
                this.sprite.setVelocityX(0);
            } else {
                this.sprite.setAccelerationX(-500);
            }
        } else if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
            if(this.sprite.body.velocity.x < 0){
                this.sprite.setAccelerationX(0);
                this.sprite.setVelocityX(0);
            } else {
                this.sprite.setAccelerationX(500);
            }
        } else {
            if (Math.abs(this.sprite.body.velocity.x) <= 10){
                this.sprite.setAccelerationX(0);
                this.sprite.setVelocityX(0);
            } else {
                this.sprite.setAccelerationX(-1*Math.sign(this.sprite.body.velocity.x)*500);
            }
        }
        if (!world.win){
            if (scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.SPACE].isDown) {
                this.weapon.shoot();
            }
        }
    }
    winMove(){
        if (this.sprite.y < -50) {
            this.sprite.destroy();
            world.entities.removeElement(this);
            world.playerHealthBar.destroy();
            world.playerReloadBar.destroy();
            world.scoreText.destroy();
        } else {
            if (Math.abs(this.sprite.x-(width/2))>10){
                this.sprite.setVelocityX(Math.sign((width/2)-this.sprite.x)*100);
            } else {
                this.sprite.setVelocityX(0);
                this.sprite.setAccelerationY(-1000);
            }
        }
    }
}
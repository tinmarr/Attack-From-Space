class Player extends Entity {
    constructor(scene, x = 250, y = 550, animation = 'player', health = 100, gunType='starting') {
        super(scene, x, y, animation, health, gunType);
        this.scene.physics.add.collider(this.sprite, enemyBullets.sprites, this.hit);
        this.scene.physics.add.collider(this.sprite, entities.sprites, this.hit);
        this.sprite.body.collideWorldBounds = true;
        this.currentGunType = gunType;
        this.changeGunType = gunType;
        this.weapon = new (stringToWeapon(gunType))(playerBullets, 1, this);
        this.sprite.name = 'player';
    }
    move() {
        if (this.currentGunType !== this.changeGunType){
            this.weapon = new (stringToWeapon(this.changeGunType))(playerBullets, 1, this);
            this.currentGunType = this.changeGunType;
        }
        if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
            if(this.sprite.body.velocity.x > 0){
                this.sprite.setAccelerationX(0);
                this.sprite.setVelocityX(0);
            } else {
                this.sprite.setAccelerationX(-500);
            }
        } else if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
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
        if (!win){
            if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.SPACE].isDown) {
                this.weapon.shoot();
            }
        }
    }
    winMove(){
        if (this.sprite.y < -50) {
            this.sprite.destroy();
            entities.removeElement(this);
            playerHealthBar.destroy();
            playerReloadBar.destroy();
            scoreText.destroy();
        } else {
            if (Math.abs(this.sprite.x-250)>10){
                this.sprite.setVelocityX(Math.sign(250-this.sprite.x)*100);
            } else {
                this.sprite.setVelocityX(0);
                this.sprite.setAccelerationY(-1000);
            }
        }
    }
}
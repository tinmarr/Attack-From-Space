class Player extends Entity {
  constructor({ scene, x = 250, y = 550, animation = '', health = 100, damage = 50, fireRate = 1 }) {
    super({ scene: scene, x: x, y: y, animation: animation, health: health, damage: damage, fireRate: fireRate });
    this.scene.physics.add.collider(this.sprite, enemyBullets.sprites, this.hit);
    this.sprite.body.collideWorldBounds = true;
  }
  shoot() {
    if (this.waitTime <= 0) {
      var bullet = new Bullet(this.sprite.x, this.sprite.y-32, '',this.damage,0,-1000,this.scene);
      playerBullets.add(bullet);
      allBullets.add(bullet);
      this.waitTime = this.fireRate;
    } else {
      this.waitTime--;
    }
  }
  move() {
    if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown) {
      this.sprite.setAccelerationX(-500);
    } else if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown) {
      this.sprite.setAccelerationX(500);
    } else {
      if (Math.abs(this.sprite.body.velocity.x) <= 10){
        this.sprite.setAccelerationX(0);
        this.sprite.setVelocityX(0);
      } else {
        this.sprite.setAccelerationX(-1*Math.sign(this.sprite.body.velocity.x)*500)
      }
    }
    if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.SPACE].isDown) {
      this.shoot();
    } else if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.SPACE].isUp) {
      this.waitTime--;
    }
  }
}
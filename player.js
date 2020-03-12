class Player extends Entity {
  constructor({ scene, x = 250, y = 550, animation = '', health = 100, gunType='starting'}) {
    super({ scene: scene, x: x, y: y, animation: animation, health: health, gunType: gunType});
    this.scene.physics.add.collider(this.sprite, enemyBullets.sprites, this.hit);
    this.scene.physics.add.collider(this.sprite, entities.sprites, this.hit);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.setAngle();
    this.currentGunType = gunType;
    this.changeGunType = gunType;
    this.weapon = new (stringToWeapon(gunType))(playerBullets, 1, this);
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
    if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.SPACE].isDown) {
      this.weapon.shoot();
    } else if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.SPACE].isUp) {
      this.waitTime--;
    }
  }
}
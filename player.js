class Player extends Entity {
  constructor({scene, x=250, y=550, animation='', health=100, damage=50, fireRate=15}){
    super({scene:scene, x:x, y:y, animation:animation, health:health, damage:damage, fireRate:fireRate});
  }
  shoot(){
    if (this.waitTime <= 0){
        bullets.add(new Bullet(this.sprite.x, this.sprite.y-32, '',this.damage,Phaser.Math.DegToRad(-90),100,this.scene));
        this.waitTime = this.fireRate;
      } else {
        this.waitTime--;
      }
  }
  move(){
    if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.A].isDown){
      this.sprite.setVelocityX(-50);
    } else if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.D].isDown){
      this.sprite.setVelocityX(50);
    } else {
      this.sprite.setVelocityX(0);
    }
    if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.SPACE].isDown){
      this.shoot();
    } else if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.SPACE].isUp){
      this.waitTime--;
    }
  }
}
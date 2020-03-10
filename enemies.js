class BasicEnemy extends Entity {
  shoot() {
    if (this.waitTime <= 0) {
      var bullet = new Bullet(this.sprite.x, this.sprite.y + 32, '', this.damage, 0, 100, this.scene);
      enemyBullets.add(bullet);
      allBullets.add(bullet);
      this.waitTime = this.fireRate;
    } else {
      this.waitTime--;
    }
  }
  move() {
    if (Math.abs(player.sprite.x - this.sprite.x) <= 10){
    	this.sprite.setVelocityY(100);
    } else if (this.sprite.y > 620) {
    	this.sprite.y = -20;
    } else if (Math.abs(this.sprite.y - this.initial.y) <= 5){
    	this.sprite.y = this.initial.y;
    	this.sprite.setVelocityY(0);
    }
    if (this.initial.x <= 250) {
    	if ((this.sprite.x - this.initial.x) < -20){
    		this.sprite.setVelocityX(10);
    	} else if (this.sprite.x >= this.initial.x){
    		this.sprite.setVelocityX(-10);
    	}
    } else {
    	if ((this.initial.x - this.sprite.x) < -20){
    		this.sprite.setVelocityX(-10);
    	} else if (this.sprite.x <= this.initial.x){
    		this.sprite.setVelocityX(10);
    	}
    }
    if (this.sprite.y == this.initial.y && Math.random() < 0.3){
    	this.shoot();
    }
  }
}
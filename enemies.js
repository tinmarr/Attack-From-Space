// To add a new enemy
// - Create an enemy class that extends the entity class
// - If you want different weapon/health specifications, do that here
// - Add a move function
class BasicEnemy extends Entity {
  move() {
    if (Math.abs(player.sprite.x - this.sprite.x) <= 10){
    	this.sprite.setVelocityY(200);
    } else if (this.sprite.y > 620) {
    	this.sprite.y = -20;
    } else if (Math.abs(this.sprite.y - this.initial.y) <= 5){
    	this.sprite.setVelocityY(0);
    	this.sprite.y = this.initial.y;
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
    if (Math.abs(this.sprite.y - this.initial.y) < 10 && Math.random() < 0.1){
    	this.weapon.shoot();
    }
  }
}
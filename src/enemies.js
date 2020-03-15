// To add a new enemy
// - Create an enemy class that extends the entity class
// - If you want different weapon/health specifications, do that here
// - Add a move function
class BasicEnemy extends Entity {
  constructor(scene, x, y, animation='easy', health=25, gunType='basic'){
        super(scene, x, y, animation, health, gunType);
        this.sprite.name = 'easy';
  }
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
    if (Math.abs(this.sprite.y - this.initial.y) < 10 && Math.random()<0.2){
    	this.weapon.shoot();
    } else if (this.weapon.waitTime <= 0) {
    	this.weapon.waitTime = this.weapon.fireRate;
    }
  }
}

class MediumEnemy extends BasicEnemy {
	constructor(scene, x, y, animation='medium', health=50, gunType='medium')	{
        super(scene, x, y, animation, health, gunType);
        this.sprite.name = 'medium';
	}
}

class HardEnemy extends BasicEnemy {
	constructor(scene, x, y, animation='hard', health=75, gunType='hard')	{
        super(scene, x, y, animation, health, gunType);
        this.sprite.name = 'hard';
	}
}

class SniperEnemy extends Entity {
	constructor(scene, x, y, animation='sniper', health=50, gunType='sniper'){
		super(scene, x, y, animation, health, gunType);
        this.nextPos = Math.random() * 500;
        this.sprite.name = 'sniper';
	}
	move(){
		if (this.weapon.waitTime > 100 && Math.abs(this.sprite.x - this.nextPos) > 10){
			this.sprite.setVelocityX(Math.sign(this.nextPos - this.sprite.x) * 100);
		} else {
			this.sprite.setVelocityX(0);
			if (this.weapon.waitTime <= 0){
				this.weapon.shoot();
				this.nextPos = Math.random() *500;
			}
		}
	}
}

class BomberEnemy extends Entity {
	constructor(scene, x, y, animation='bomber', health=50, gunType='bomb')	{
        super(scene, x, y, animation, health, gunType);
        this.sprite.name = 'bomber';
		if (this.sprite.x <= 250){
			this.sprite.setVelocityX(-25);
		} else {
			this.sprite.setVelocityX(25);
		}
	}
	move(){
		this.weapon.shoot();
		if (this.sprite.x < 0) {
			this.sprite.setVelocityX(25);
		} else if (this.sprite.x > 500) {
			this.sprite.setVelocityX(-25);
		}
	}
}
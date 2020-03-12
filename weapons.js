// To add a new type of gun:
// - Create the gun class that extends the weapon class
// - Specify the gun stats
// - Add a string code to the "stringToWeapon" function

class Weapon {
	constructor(damage, firerate, bulletSpeed, animation, holderBulletGroup, position, holderClass){
		this.damage = damage;
		this.fireRate = firerate;
		this.animation = animation;
		this.holderBulletGroup = holderBulletGroup;
		this.position = position;
		this.waitTime = 0;
		this.holderClass = holderClass;
		this.bulletSpeed = bulletSpeed;
	}
	shoot(){
		if (this.waitTime <= 0) {
      var bullet = new Bullet(this.holderClass.sprite.x, this.holderClass.sprite.y-(this.position*32), this.animation,this.damage,0, -1*this.position*this.bulletSpeed,this.holderClass.scene);
      this.holderBulletGroup.add(bullet);
      allBullets.add(bullet);
      this.waitTime = this.fireRate;
    } else {
      this.waitTime--;
    }
	}
}

class BasicGun extends Weapon {
	constructor(holderBulletGroup, position, holderClass){
		super(10, 100, 50, 'bullet', holderBulletGroup, position, holderClass);
	}
}

class StartingPlayerGun extends Weapon {
	constructor(holderBulletGroup, position, holderClass){
		super(25, 50, 75, 'bullet', holderBulletGroup, position, holderClass);
	}
}

class OpGun extends Weapon {
	constructor(holderBulletGroup, position, holderClass){
		super(25, 0, 1000, 'bullet', holderBulletGroup, position, holderClass);
	}
}

function stringToWeapon(stringType){
	if (stringType == 'basic'){
		return BasicGun;
	} else if (stringType == 'starting'){
		return StartingPlayerGun;
	} else if (stringType == 'op'){
		return OpGun;
	}
}
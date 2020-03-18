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
		this.waitTime = firerate;
		this.holderClass = holderClass;
		this.bulletSpeed = bulletSpeed;
	}
	shoot(){
		if (this.waitTime <= 0) {
            var bullet = new Bullet(this.holderClass.sprite.x, this.holderClass.sprite.y-(this.position*50), this.animation,this.damage,0, -1*this.position*this.bulletSpeed);
            this.holderBulletGroup.add(bullet);
            world.allBullets.add(bullet);
            this.waitTime = this.fireRate;
    }
	}
}

class EasyGun extends Weapon {
	constructor(holderBulletGroup, position, holderClass){
		super(10, 150, 75, 'green', holderBulletGroup, position, holderClass);
	}
}

class PlayerGun extends Weapon {
	constructor(holderBulletGroup, position, holderClass){
		super(25, 50, 400, 'white', holderBulletGroup, position, holderClass);
	}
}

class OpGun extends Weapon {
	constructor(holderBulletGroup, position, holderClass){
		super(100, 1, 1000, 'white', holderBulletGroup, position, holderClass);
	}
}

class SniperGun extends Weapon{
	constructor(holderBulletGroup, position, holderClass){
		super(50, 200, 1000, 'green', holderBulletGroup, position, holderClass);
	}
}

class MediumGun extends Weapon {
	constructor(holderBulletGroup, position, holderClass){
		super(20, 100, 100, 'green', holderBulletGroup, position, holderClass);
	}
}

class HardGun extends Weapon {
	constructor(holderBulletGroup, position, holderClass){
		super(30, 50, 150, 'green', holderBulletGroup, position, holderClass);
	}
}

class Bomb extends Weapon {
	constructor(holderBulletGroup, position, holderClass){
		super(150, 400, 50, 'red', holderBulletGroup, position, holderClass);
	}
}

function stringToWeapon(stringType){
	if (stringType == 'easy'){
		return EasyGun;
	} else if (stringType == 'player'){
		return PlayerGun;
	} else if (stringType == 'op'){
		return OpGun;
	} else if (stringType == 'sniper'){
		return SniperGun;
	} else if (stringType == 'medium'){
		return MediumGun;
	} else if (stringType == 'hard'){
		return HardGun;
	} else if (stringType == 'bomb'){
		return Bomb;
	}
}
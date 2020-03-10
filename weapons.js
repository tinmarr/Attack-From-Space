class Weapon {
	constructor(damage, firerate, animation, holderBulletGroup, position, holderClass){
		this.damage = damage;
		this.firerate = firerate;
		this.animation = animation;
		this.holderBulletGroup = holderBulletGroup;
		this.position = position;
		this.waitTime = 0;
		this.holderClass = holderClass;
	}
	shoot(){
		if (this.waitTime <= 0) {
      var bullet = new Bullet(this.sprite.x, this.sprite.y-32, '',this.damage,0,-1000,this.scene);
      playerBullets.add(bullet);
      allBullets.add(bullet);
      this.waitTime = this.fireRate;
    } else {
      this.waitTime--;
    }
	}
}
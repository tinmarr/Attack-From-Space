class Entity {
  constructor({scene, x=-40, y=20, animation='', health=25, gunType='basic'}){
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, animation);
    this.health = health;
    this.sprite.body.immovable = true;
    this.scene.physics.add.collider(this.sprite, playerBullets.sprites, this.hit);
    this.initial = {x:x,y:y};
    this.sprite.name = 'entity';
    this.sprite.setAngle(180);
    this.weapon = new (stringToWeapon(gunType))(enemyBullets, -1, this);
  }
  hit(entitySprite, bulletSprite){
  	if (bulletSprite.name == 'bullet'){
  		entities.getClass(entitySprite).health -= allBullets.getClass(bulletSprite).damage;
	    bulletSprite.destroy();
  	} else if (bulletSprite.name == 'entity'){
  		entities.getClass(entitySprite).health -= entities.getClass(bulletSprite).weapon.damage;
  		entities.getClass(bulletSprite).health = 0;
  	}
  }
  move(){}
  update(){
    if (this.health <= 0){
      this.sprite.destroy();
      entities.removeElement(this);
    } else {
      this.move();
    }
  }
}
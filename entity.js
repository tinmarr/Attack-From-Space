class Entity {
  constructor({scene, x=-40, y=20, animation='', health=50, damage=10, fireRate=100}){
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, animation);
    this.health = health;
    this.damage = damage;
    this.fireRate = fireRate;
    this.sprite.body.immovable = true;
    this.waitTime = 0;
    this.scene.physics.add.collider(this.sprite, playerBullets.sprites, this.hit);
  }
  hit(entitySprite, bulletSprite){
    entities.getClass(entitySprite).health -= allBullets.getClass(bulletSprite).damage;
    bulletSprite.destroy();
  }
  shoot(){}
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
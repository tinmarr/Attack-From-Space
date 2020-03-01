class Entity {
  constructor({scene, x=20, y=20, animation='', health=50, damage=10, fireRate=15}){
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, animation);
    this.health = health;
    this.damage = damage;
    this.fireRate = fireRate;
    this.sprite.body.immovable = true;
    this.waitTime = 0; 
  }
  hit(entitySprite, bulletSprite){
    entities.getClass(entitySprite).health -= bullets.getClass(bulletSprite).damage;
    bulletSprite.destroy();
  }
  shoot(){}
  move(){}
  update(){
    if (this.health <= 0){
      this.sprite.destroy();
    } else {
      this.move();
      this.scene.physics.add.collider(this.sprite, bullets.sprites, this.hit);
    }
  }
}
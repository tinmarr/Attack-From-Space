class Bullet {
  constructor(x,y,animation,damage,direction,speed,scene){
    this.scene = scene;
    this.sprite = this.scene.physics.add.sprite(x,y,animation);
    this.sprite.setRotation(direction);
    this.sprite.setVelocity(speed * Math.cos(direction), speed * Math.sin(direction));
    this.damage = damage;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.onWorldBounds = true;
    this.sprite.addListener('worldbounds', hitBounds)
  }
  hitWorldBounds(){
    bullets.removeElement(this);
    this.sprite.destroy();
  }
}

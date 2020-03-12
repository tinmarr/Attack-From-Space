class Bullet {
  constructor(x,y,animation,damage,speedx,speedy,scene){
    this.scene = scene;
    this.sprite = this.scene.physics.add.sprite(x,y,animation);
    this.sprite.setScale(2);
    this.sprite.setVelocity(speedx, speedy);
    this.damage = damage;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.onWorldBounds = true;
    this.sprite.body.allowDrag = true;
    this.sprite.name = 'bullet';
    if (speedy < 0){
    	this.sprite.setAngle(180);
    }
  }
  hitWorldBounds(){
    this.sprite.destroy();
  }
}

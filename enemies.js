class BasicEnemy extends Entity {
  shoot() {
    if (this.waitTime <= 0) {
      var bullet = new Bullet(this.sprite.x, this.sprite.y + 32, '', this.damage, 0, 100, this.scene)
      enemyBullets.add(bullet);
      allBullets.add(bullet);
      this.waitTime = this.fireRate;
    } else {
      this.waitTime--;
    }
  }
  move() {
    this.shoot();
    
  }
}
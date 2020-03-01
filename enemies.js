class BasicEnemy extends Entity {
  shoot(){
    if (this.waitTime <= 0){
        bullets.add(new Bullet(this.sprite.x, this.sprite.y+32, '',this.damage,Phaser.Math.DegToRad(90),100,this.scene));
        this.waitTime = this.fireRate;
      } else {
        this.waitTime--;
      }
  }
  move(){
    
  }
}
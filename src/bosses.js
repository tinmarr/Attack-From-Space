class Boss1 extends Entity {
    constructor(scene, x, y){
        super(scene, x, y, 'basicEnemy', 1000, 'sniper');
        this.weapon1 = new (stringToWeapon('bomb'))(enemyBullets, -1, this);
        this.weapon2 = new (stringToWeapon('op'))(enemyBullets, -1, this);
        this.healthBar = this.scene.add.rectangle(250, 590, 500, 20, 0xff0000);
        this.stage=0;
        this.sprite.setVelocityX(-50);
    }
    move(){
        console.log('hello')
        this.healthBar.destroy();
        this.healthBar = this.scene.add.rectangle(this.sprite.x, this.sprite.y-20, Math.sign(this.health) === -1 ? 0 : (this.health/1000) * 100, 10, 0xff0000);
        this.stage = this.health>=750 ? 0 : (this.health >= 500 ? 1 : (this.health>=250 ? 2 : (this.health >= 0 ? 3 : {})));
        console.log(this.stage);
        if (this.stage === 0){
            this.weapon1.shoot();
            if (this.sprite.x <= 0){
                this.sprite.setVelocityX(50);
            } else if (this.sprite.x >=500){
                this.sprite.setVelocityX(-50);
            }
        }
    }
}
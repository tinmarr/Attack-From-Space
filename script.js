var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload (){

}

function create (){
  this.input.keyboard.addKeys('A,D,SPACE');

  coins = this.physics.add.group();

  playerBullets = new Group(this);
  enemyBullets = new Group(this);
  allBullets = new Group(this);
  entities = new Group(this);

  player = new Player({scene:this});
  entities.add(player);

  for (var i=0;i<8;i++){
    entities.add(new BasicEnemy({scene:this,x:32+32*2*i,y:32}));
  }

  this.physics.world.addListener('worldbounds', hitBounds)

  playerHealthBar = this.add.rectangle(250, 595, 500, 10, 0xff0000);
}

function update (){
  entities.update();
  playerHealthBar.destroy();
  playerHealthBar = this.add.rectangle(250, 595, player.health * 5, 10, 0xff0000)
}

function hitBounds(hit){
  var spriteClass = allBullets.getClass(hit.gameObject);
  spriteClass.hitWorldBounds();
}
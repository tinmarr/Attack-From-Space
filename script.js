var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
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

  bullets = new Group(this);
  entities = new Group(this);

  entities.add(new Player({scene:this}));

  entities.add(new BasicEnemy({scene:this,x:64}));
}

function update (){
  entities.update();
}

function hitBounds(sprite){
  console.log(sprite);
  var classboi = bullets.getClass(sprite);
  console.log(classboi);
  classboi.hitWorldBounds();
}
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
	this.load.image('bullet','imgs/bullet.png');
	this.load.image('player','imgs/blueBasic.png');
	this.load.image('basicEnemy','imgs/redBasic.png');
	this.load.image('background','imgs/background.png');
}

function create (){
	// Background Specs
	backgroundSpeed = 5;
	background = this.add.tileSprite(250, 300, 500, 600, 'background');
	
	// Setup Inputs
  this.input.keyboard.addKeys('A,D,SPACE');
	
	// Groups
  playerBullets = new Group(this);
  enemyBullets = new Group(this);
  allBullets = new Group(this);
  entities = new Group(this);
	
	// Player Setup
  player = new Player({scene:this, animation: 'player'});
  entities.add(player);
	
	// Test Enemy Setup
  for (var i=0;i<12;i++){
  	if (i!==6){
  		entities.add(new BasicEnemy({scene:this,x:35+35*i,y:18, animation:'basicEnemy'}));
  		entities.add(new BasicEnemy({scene:this,x:35+35*i,y:35+18, animation:'basicEnemy'}));
  		entities.add(new BasicEnemy({scene:this,x:35+35*i,y:(35*2)+18, animation:'basicEnemy'}));
  	}
  }
  
  // Bullet World Bounds Event
  this.physics.world.addListener('worldbounds', hitBounds);

	// Health Bar
  playerHealthBar = this.add.rectangle(250, 590, 500, 20, 0xff0000);
  
  // Score Variables and Text
  scoreVars = [entities.sprites.length-1, player.health];
  scoreText = this.add.text(250,580,'Score: 0');
  scoreText.depth = 1;
  scoreText.x = 250 - (scoreText.width/2);
}

function update (){
	// Move BG
	background.tilePositionY -= backgroundSpeed;
	
	// Update Players and Enemies
  entities.update();
  
  // Update Health Bar
  playerHealthBar.destroy();
  playerHealthBar = this.add.rectangle(250, 590, (player.health/100) * 500, 20, 0xff0000);
  
  // Update Score
  scoreText.text = 'Score: '+(100*(scoreVars[0] - (entities.sprites.length-1)) - 10*(scoreVars[1]-player.health));
}

function hitBounds(hit){
  var spriteClass = allBullets.getClass(hit.gameObject);
  spriteClass.hitWorldBounds();
}
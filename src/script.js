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
	this.load.image('bullet','img/bullet.png');
	this.load.image('player','img/blueBasic.png');
	this.load.image('basicEnemy','img/redBasic.png');
	this.load.image('background','img/background.png');
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
  player = new Player(this);
  entities.add(player);
  
  // Testing Enemies
  entities.add(new BasicEnemy(this,50,50));
  entities.add(new MediumEnemy(this,100,100));
  entities.add(new HardEnemy(this,150,150));
  entities.add(new SniperEnemy(this,200,200));
  entities.add(new BomberEnemy(this,250,250));
  
  // Bullet World Bounds Event
  this.physics.world.addListener('worldbounds', hitBounds);

	// Health Bar
  playerHealthBar = this.add.rectangle(250, 590, 500, 20, 0xff0000);
  
  // Reload Bar
  playerReloadBar = this.add.rectangle(250, 577, 500, 6, 0x00ff00);
  
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
  playerHealthBar = this.add.rectangle(250, 590, Math.sign(player.health) === -1 ? 0 : (player.health/100) * 500, 20, 0xff0000);
  
  // Update Reload Bar
  playerReloadBar.destroy();
  playerReloadBar = this.add.rectangle(250, 577, Math.sign((player.weapon.waitTime/player.weapon.fireRate)*500) === -1 ? 0 : (player.weapon.waitTime/player.weapon.fireRate)*500, 6, 0x00ff00);
  
  // Update Score
  scoreText.text = 'Score: '+(100*(scoreVars[0] - (entities.sprites.length-1)) - 10*(scoreVars[1]-player.health));
}

function hitBounds(hit){
  var spriteClass = allBullets.getClass(hit.gameObject);
  spriteClass.hitWorldBounds();
}
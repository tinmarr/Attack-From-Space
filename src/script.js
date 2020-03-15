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

var game = new Phaser.Game(config),
    numOfLevels = 5;

function preload (){
    this.load.image('background','img/background.png');

    this.load.image('player','img/players/player.png');
    this.load.image('easy','img/players/easy.png');
    this.load.image('medium','img/players/medium.png');
    this.load.image('hard','img/players/hard.png');
    this.load.image('sniper','img/players/sniper.png');
    this.load.image('bomber','img/players/bomber.png');

    this.load.image('blue','img/bullets/blueBullet.png');
    this.load.image('red','img/bullets/redBullet.png');
    this.load.image('green','img/bullets/greenBullet.png');
    this.load.image('white','img/bullets/whiteBullet.png');
    
    for (var i=0;i<numOfLevels;i++){
        this.load.text((i+1).toString(), 'levels/'+(i+1).toString()+'.txt');
    }
}

function create (){
    scene = this;
    // Background Specs
    backgroundSpeed = 5;
    background = this.add.tileSprite(250, 300, 500, 600, 'background');

    // Setup Inputs
    this.input.keyboard.addKeys('A,D,SPACE');

    // Groups
    playerBullets = new Group();
    enemyBullets = new Group();
    allBullets = new Group();
    entities = new Group();

    // Bullet World Bounds Event
    this.physics.world.addListener('worldbounds', hitBounds);

    // Start Game
    gameStart();
}

function update (){
    // Update Score
    try{
        scoreText.text = 'Score: '+score;
    } catch(err){}

    if (!win) {
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

        // Next Level
        if (entities.sprites.length <= 1 && player.health > 0){
            backgroundSpeed = 20;
            if (levels.length === 1){
                winText.visible = true;
                win = true;
                player.sprite.body.collideWorldBounds = false;
            } else {
                btwLevelTime--;
            }
            if (btwLevelTime<=0){
                backgroundSpeed = 5;
                levels.splice(0,1);
                levels[0].generateLevel();
                btwLevelTime = 100;
            }
        }
    } else {
        player.winMove();
    }
}

function hitBounds(hit){
    var spriteClass = allBullets.getClass(hit.gameObject);
    spriteClass.hitWorldBounds();
}

function gameStart(){
    // Game Vars
    win = false;
    score = 0;
    backgroundSpeed = 5

    // Player Setup
    player = new Player(scene);
    entities.add(player);

    // Levels
    levels = [];
    for (var i=0;i<numOfLevels;i++){
        levels.push(new Level(scene, (i+1).toString()));
    }
    levels[0].generateLevel();
    btwLevelTime = 100;

     // Health Bar
    playerHealthBar = scene.add.rectangle(250, 590, 500, 20, 0xff0000);

    // Reload Bar
    playerReloadBar = scene.add.rectangle(250, 577, 500, 6, 0x00ff00);

    // Score Variables and Text
    scoreVars = [entities.sprites.length-1, player.health];
    scoreText = scene.add.text(250,580,'Score: ' + score);
    scoreText.depth = 1;
    scoreText.x = 250 - (scoreText.width/2);

    // Win Text
    winText = scene.add.text(250,250, "You Win!");
    winText.depth = 1;
    winText.x = 250 - (scoreText.width/2);
    winText.visible = false;
}

function togglePause(){
    if (scene.sys.isPaused()){
        scene.sys.resume();
    } else {
        scene.sys.pause();
    }
}

function updateScore(spriteName){
    if (spriteName === 'easy'){
        score += 10;
    } else if (spriteName === 'medium'){
        score += 20;
    } else if (spriteName === 'hard'){
        score += 40;
    } else if (spriteName === 'bomber'){
        score += 80;
    } else if (spriteName === 'sniper'){
        score += 160;
    } else if (spriteName === 'player'){
        score -= 100;
    }
}
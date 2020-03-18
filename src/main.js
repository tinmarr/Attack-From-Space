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

    world = new World();
    world.createPlayer();

    // Bullet World Bounds Event
    this.physics.world.addListener('worldbounds', hitBounds);
}

function update (){
    // Move BG
    background.tilePositionY -= backgroundSpeed;
    world.update();
}

function hitBounds(hit){
    var spriteClass = world.allBullets.getClass(hit.gameObject);
    spriteClass.hitWorldBounds();
}

function togglePause(){
    if (scene.sys.isPaused()){
        scene.sys.resume();
    } else {
        scene.sys.pause();
    }
}
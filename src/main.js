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
    },
};

var game = new Phaser.Game(config),
    numOfLevels = 5,
    world, menu;

function preload (){
    var progressBar = this.add.graphics(),
        progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRoundedRect(100, 275, 300, 50, 5);

    this.load.on('progress', function (value) {
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRoundedRect(110, 285, 280 * value, 30, 5);
    });

    this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
    });

    this.load.image('background','img/background.png');
    this.load.image('coin','img/coin.png');

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

    this.load.scripts('general',[
        makeURL('general','bullet'),    
        makeURL('general','entity'),
        makeURL('general','group'),
        makeURL('general','levels'),
    ]);
    this.load.scripts('menus',[
        makeURL('menus','menu'),
        makeURL('menus','credit'),
        makeURL('menus','mainMenu'),
        makeURL('menus','tutorial'),
    ]);
    this.load.scripts('other',[
        makeURL('','bosses'),
        makeURL('','enemies'),
        makeURL('','player'),
        makeURL('','weapons'),
        makeURL('','world'),
    ]);
}

function create (){
    scene = this;
    money = 0;
    // Background Specs
    backgroundSpeed = 5;
    background = this.add.tileSprite(250, 300, 500, 600, 'background');

    // Setup Inputs
    this.input.keyboard.addKeys('A,D,SPACE');

    menu = new MainMenu();

    // Bullet World Bounds Event
    this.physics.world.addListener('worldbounds', hitBounds);

    // The Mouse
    mouse = scene.input.activePointer;
}

function update (){
    // Move BG
    background.tilePositionY -= backgroundSpeed;
    try {
        menu.update();
    } catch(err){}
    try {
        world.update();
    } catch(err){}
}

function hitBounds(hit){
    var spriteClass = world.allBullets.getClass(hit.gameObject);
    spriteClass.hitWorldBounds();
}

function togglePause(e){
    if (e.key === 'p'){
        if (scene.sys.isPaused()){
            scene.sys.resume();
        } else {
            scene.sys.pause();
        }
    }
}

function makeURL(folder,file){
    if (folder === ''){
        name = file;
    } else {
        name = folder+'/'+file;
    }
    return './src/'+name+'.js';
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
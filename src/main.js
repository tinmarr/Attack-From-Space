var config = {
    type: Phaser.AUTO,
    width: window.innerHeight,
    height: window.innerHeight,
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
    world, menu, width, height, pause;

function preload (){
    width = this.game.canvas.width;
    height = this.game.canvas.height;
    var progressBar = this.add.graphics(),
        progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRoundedRect((width/2)-150, (height/2)-25, 300, 50, 5);

    this.load.on('progress', function (value) {
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRoundedRect((width/2)-140, (height/2)-15, 280 * value, 30, 5);
    });

    this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
    });

    this.load.image('background','img/background.png');
    this.load.image('coin','img/coin.png');
    this.load.image('logo','img/Logo.png');
    this.load.image('pause','img/pause.png');

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

    this.load.scripts('all',[
        makeURL('general','entity'),
        makeURL('general','bullet'),    
        makeURL('general','group'),
        makeURL('general','levels'),
        makeURL('menus','menu'),
        makeURL('menus','credit'),
        makeURL('menus','mainMenu'),
        makeURL('menus','tutorial'),
        makeURL('menus','shop'),
        makeURL('menus','end'),
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
    background = this.add.tileSprite(width/2, height/2, width, height, 'background');

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
            pause.destroy();
        } else {
            scene.sys.pause();
            pause = scene.add.sprite(width/2, height/2, 'pause');
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
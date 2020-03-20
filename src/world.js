class World{
    constructor(){
        // Groups
        this.playerBullets = new Group();
        this.enemyBullets = new Group();
        this.allBullets = new Group();
        this.entities = new Group();

        // Game Vars
        this.win = false;
        this.dead = false;
        this.score = 0;
        backgroundSpeed = 5

        // Levels
        this.levels = [];
        for (var i=0;i<numOfLevels;i++){
            this.levels.push(new Level((i+1).toString()));
        }
        this.btwLevelTime = 100;

        // Health Bar
        this.playerHealthBar = scene.add.rectangle(0, 0, 0, 0, 0xff0000);

        // Reload Bar
        this.playerReloadBar = scene.add.rectangle(0, 0, 0, 0, 0x00ff00);

        // Score Text
        this.scoreText = scene.add.text((width/2),height-20,'Score: ' + this.score);
        this.scoreText.depth = 1;
        this.scoreText.x = (width/2) - (this.scoreText.width/2);

        // Win Text
        this.winText = scene.add.text((width/2),(width/2), "You Win!");
        this.winText.depth = 1;
        this.winText.x = (width/2) - (this.scoreText.width/2);
        this.winText.visible = false;
    }
    createPlayer(){
        // Player Setup
        this.player = new Player();
        this.entities.add(this.player);
        // Create First Level
        this.levels[0].generateLevel();
        // Stuff That Needs World
        this.scoreVars = [this.entities.sprites.length-1, this.player.health];
    }
    update(){
        // Update Score
        try{
            this.score = this.score < 0 ? 0 : this.score;
            this.scoreText.text = 'Score: '+this.score;
        } catch(err){}

        if (this.dead){
            menu = new EndMenu(this.score);
            this.destroy();
        } else if (!this.win) {
            // Update Players and Enemies
            this.entities.update();

            // Update Health Bar
            this.playerHealthBar.destroy();
            this.playerHealthBar = scene.add.rectangle(width/2, height-10, Math.sign(this.player.health) === -1 ? 0 : (this.player.health/this.player.initial.health) * width, 20, 0xff0000);

            // Update Reload Bar
            this.playerReloadBar.destroy();
            this.playerReloadBar = scene.add.rectangle(width/2, height-23, Math.sign((this.player.weapon.waitTime/this.player.weapon.fireRate)*width) === -1 ? 0 : (this.player.weapon.waitTime/this.player.weapon.fireRate)*width, 6, 0x00ff00);

            // Next Level
            if (this.entities.sprites.length <= 1 && this.player.health > 0){
                backgroundSpeed = 20;
                if (this.levels.length === 1){
                    this.winText.visible = true;
                    this.win = true;
                    this.player.sprite.body.collideWorldBounds = false;
                } else {
                    this.btwLevelTime--;
                }
                if (this.btwLevelTime<=0){
                    backgroundSpeed = 5;
                    this.levels.splice(0,1);
                    this.levels[0].generateLevel();
                    this.btwLevelTime = 100;
                }
            }
        } else {
            this.player.winMove();
        }
    }
    updateScore(spriteName){
        if (spriteName === 'easy'){
            this.score += 10;
        } else if (spriteName === 'medium'){
            this.score += 20;
        } else if (spriteName === 'hard'){
            this.score += 40;
        } else if (spriteName === 'bomber'){
            this.score += 80;
        } else if (spriteName === 'sniper'){
            this.score += 160;
        } else if (spriteName === 'player'){
            this.score -= 100;
        }
    }
    destroy(){
        this.allBullets.destroy();
        this.enemyBullets.destroy();
        this.playerBullets.destroy();
        this.entities.destroy();
        this.update = ()=>{};
        this.playerHealthBar.destroy();
        this.playerReloadBar.destroy();
        this.scoreText.destroy();
    }
}
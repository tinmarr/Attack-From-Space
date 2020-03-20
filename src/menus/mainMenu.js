class MainMenu extends Menu {
    constructor(){
        super();

        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(0xff0000, 1);
        this.graphics.fillRoundedRect(175, 250, 150, 75, 10); // Play Button
        this.graphics.fillRoundedRect(175, 350, 150, 75, 10); // Shop Button
        this.graphics.fillRoundedRect(75, 450, 150, 75, 10); // Tutorial Button
        this.graphics.fillRoundedRect(275, 450, 150, 75, 10); // Credits Button
        this.gameObjects.push(this.graphics);
        
        this.playText = scene.add.text(252,287.5, 'Play',{fontFamily: '"Press Start 2P"', fontSize: '24px', align:'center'});
        this.playText.x -= this.playText.width/2;
        this.playText.y -= this.playText.height/2;
        this.gameObjects.push(this.playText);

        this.shopText = scene.add.text(252,387.5, 'Shop',{fontFamily: '"Press Start 2P"', fontSize: '24px', align:'center'});
        this.shopText.x -= this.shopText.width/2;
        this.shopText.y -= this.shopText.height/2;
        this.gameObjects.push(this.shopText);

        this.tutorialText = scene.add.text(150,487.5, 'Tutorial',{fontFamily: '"Press Start 2P"', fontSize: '16px', align:'center'});
        this.tutorialText.x -= this.tutorialText.width/2;
        this.tutorialText.y -= this.tutorialText.height/2;
        this.gameObjects.push(this.tutorialText);

        this.credText = scene.add.text(350,487.5, 'Credits',{fontFamily: '"Press Start 2P"', fontSize: '16px', align:'center'});
        this.credText.x -= this.credText.width/2;
        this.credText.y -= this.credText.height/2;
        this.gameObjects.push(this.credText);

        this.moneyText = scene.add.text(252,230, numberWithCommas(money),{fontFamily: '"Press Start 2P"', fontSize: '16px', align:'center'});
        this.moneyText.x -= this.moneyText.width/2;
        this.moneyText.y -= this.moneyText.height/2;
        this.gameObjects.push(this.moneyText);

        this.coinImage1 = scene.add.sprite(190, 230, 'coin');
        this.gameObjects.push(this.coinImage1);

        this.coinImage2 = scene.add.sprite(310, 230, 'coin');
        this.gameObjects.push(this.coinImage2);
    }
    update(){
        this.moneyText.setText(numberWithCommas(money));
        this.moneyText.x = 252 - this.moneyText.width/2;
        this.moneyText.y = 230 - this.moneyText.height/2;
        if (mouse.isDown && !this.clicked){
            if (450 < mouse.worldY && mouse.worldY < 525){
                if (75 < mouse.worldX && mouse.worldX < 225){
                    menu = new TutorialMenu();
                    this.destroy();
                    this.clicked = true;
                } else if (275 < mouse.worldX && mouse.worldX < 425){
                    menu = new CreditMenu();
                    this.destroy();
                    this.clicked = true;
                }
            } else if (175 < mouse.worldX && mouse.worldX < 325){
                if (250 < mouse.worldY && mouse.worldY < 325){
                    this.destroy();
                    world = new World();
                    world.createPlayer();
                    this.clicked = true;
                } else if (350 < mouse.worldY && mouse.worldY < 425){
                    menu = new ShopMenu();
                    this.destroy();
                    this.clicked = true;
                }
            } 
        }
    }
}
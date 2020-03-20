class MainMenu extends Menu {
    constructor(){
        super();

        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(0xff0000, 1);
        this.graphics.fillRoundedRect((width/2)-75, height/2, 150, 75, 10); // Play Button
        this.graphics.fillRoundedRect((width/2)-75, (height/2) + 100, 150, 75, 10); // Shop Button
        this.graphics.fillRoundedRect((width/2)-175, (height/2) + 200, 150, 75, 10); // Tutorial Button
        this.graphics.fillRoundedRect((width/2)+25, (height/2) + 200, 150, 75, 10); // Credits Button
        this.gameObjects.push(this.graphics);
        
        this.playText = scene.add.text((width/2) + 2,(height/2)+37.5, 'Play',{fontFamily: '"Press Start 2P"', fontSize: '24px', align:'center'});
        this.playText.x -= this.playText.width/2;
        this.playText.y -= this.playText.height/2;
        this.gameObjects.push(this.playText);

        this.shopText = scene.add.text((width/2) + 2,(height/2)+137.5, 'Shop',{fontFamily: '"Press Start 2P"', fontSize: '24px', align:'center'});
        this.shopText.x -= this.shopText.width/2;
        this.shopText.y -= this.shopText.height/2;
        this.gameObjects.push(this.shopText);

        this.tutorialText = scene.add.text((width/2)-100,(height/2)+237.5, 'Tutorial',{fontFamily: '"Press Start 2P"', fontSize: '16px', align:'center'});
        this.tutorialText.x -= this.tutorialText.width/2;
        this.tutorialText.y -= this.tutorialText.height/2;
        this.gameObjects.push(this.tutorialText);

        this.credText = scene.add.text((width/2)+100,(height/2)+237.5, 'Credits',{fontFamily: '"Press Start 2P"', fontSize: '16px', align:'center'});
        this.credText.x -= this.credText.width/2;
        this.credText.y -= this.credText.height/2;
        this.gameObjects.push(this.credText);

        this.moneyText = scene.add.text((width/2) + 2,(height/2)-20, numberWithCommas(money),{fontFamily: '"Press Start 2P"', fontSize: '16px', align:'center'});
        this.moneyText.x -= this.moneyText.width/2;
        this.moneyText.y -= this.moneyText.height/2;
        this.gameObjects.push(this.moneyText);

        this.coinImage1 = scene.add.sprite((width/2) - 60, (height/2)-20, 'coin');
        this.gameObjects.push(this.coinImage1);

        this.coinImage2 = scene.add.sprite((width/2) + 60, (height/2)-20, 'coin');
        this.gameObjects.push(this.coinImage2);

        this.logo = scene.add.sprite((width/2) + 2, (height/2)-150, 'logo');
        this.logo.setScale(2)
        this.gameObjects.push(this.logo);
    }
    update(){
        this.moneyText.setText(numberWithCommas(money));
        this.moneyText.x = (width/2) + 2 - this.moneyText.width/2;
        this.moneyText.y = (height/2)-20 - this.moneyText.height/2;
        if (mouse.isDown && !this.clicked){
            if ((height/2) + 200 < mouse.worldY && mouse.worldY < (height/2) + 275){
                if ((width/2)-175 < mouse.worldX && mouse.worldX < (width/2)-25){
                    menu = new TutorialMenu();
                    this.destroy();
                    this.clicked = true;
                } else if ((width/2)+25 < mouse.worldX && mouse.worldX < (width/2)+175){
                    menu = new CreditMenu();
                    this.destroy();
                    this.clicked = true;
                }
            } else if ((width/2)-75 < mouse.worldX && mouse.worldX < (width/2)+75){
                if (height/2 < mouse.worldY && mouse.worldY < (height/2) + 75){
                    this.destroy();
                    world = new World();
                    world.createPlayer();
                    this.clicked = true;
                } else if ((height/2) + 100 < mouse.worldY && mouse.worldY < (height/2) + 175){
                    menu = new ShopMenu();
                    this.destroy();
                    this.clicked = true;
                }
            } 
        }
    }
}
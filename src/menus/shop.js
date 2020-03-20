class ShopMenu extends Menu {
    constructor(){
        super();

        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(0xff0000, 1);
        this.graphics.fillRoundedRect(50, 50, 150, 75, 10);
        this.gameObjects.push(this.graphics);

        this.backText = scene.add.text(127,87.5, 'Back',{fontFamily: '"Press Start 2P"', fontSize: '24px', align:'center'});
        this.backText.x -= this.backText.width/2;
        this.backText.y -= this.backText.height/2;
        this.gameObjects.push(this.backText);
    }
    update(){
        if (mouse.isDown && !this.clicked){
            if (50 < mouse.worldX && mouse.worldX < 200 && 50 < mouse.worldY && mouse.worldY < 125){
                this.destroy();
                menu = new MainMenu();
                this.clicked = true;
            }
        }
    }
}
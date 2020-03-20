class Menu {
    constructor(){
        this.gameObjects = [];
        this.clicked = false;
        backgroundSpeed = 0;
    }
    update(){}
    destroy(){
        for (var i of this.gameObjects){
            i.destroy();
        }
    }
}
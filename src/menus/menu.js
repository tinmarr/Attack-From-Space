class Menu {
    constructor(){
        this.gameObjects = [];
        this.clicked = false;
    }
    update(){}
    destroy(){
        for (var i of this.gameObjects){
            i.destroy();
        }
    }
}
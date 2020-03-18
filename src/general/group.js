class Group {
    constructor(){
        this.sprites = [];
        this.classes = [];
    }
    add(entity){
        this.sprites.push(entity.sprite);
        this.classes.push(entity);
    }
    getClass(entitySprite){
        return this.classes[this.sprites.indexOf(entitySprite)];
    }
    removeElement(entityClass){
        this.sprites.splice(this.classes.indexOf(entityClass),1);
        this.classes.splice(this.classes.indexOf(entityClass),1);
    }
    update(){
        for (var i=0;i<this.sprites.length;i++){
            if (this.sprites[i].active){
                this.classes[i].update();
            }
        }
    }
    destroy(){
        for (var i=0;i<this.sprites.length;i++){
            this.sprites[i].destroy();
        }
        this.classes.splice(0,this.classes.length);
        this.sprites.splice(0,this.sprites.length);
    }
}
// 10 x 8 array max

class Level {
	constructor(enemyArray){
        this.boxSize = width/10;
        this.array = scene.cache.text.get(enemyArray).split('').filter((e,i,l)=>{return e !== '\n'}).map(Number);
		this.conversions = [null, EasyEnemy, MediumEnemy, HardEnemy, SniperEnemy, BomberEnemy, Boss1];
    }
    generateLevel(){
        for (var i=0;i<this.array.length;i++){
            if (this.conversions[this.array[i]] !== null){
                world.entities.add(new (this.conversions[this.array[i]])((this.boxSize/2) + (i%10 * this.boxSize), (this.boxSize/2) + parseInt((i/10).toString())*this.boxSize));
            }
        }
    }
}
// 10 x 8 array max

class Level {
	constructor(enemyArray){
        this.boxSize = 50;
        this.array = scene.cache.text.get(enemyArray).split('').filter((e,i,l)=>{return e !== '\n'}).map(Number);
		this.conversions = [null, EasyEnemy, MediumEnemy, HardEnemy, SniperEnemy, BomberEnemy, Boss1];
    }
    generateLevel(){
        for (var i=0;i<this.array.length;i++){
            if (this.conversions[this.array[i]] !== null){
                world.entities.add(new (this.conversions[this.array[i]])(25 + (i%10 * 50), 25 + parseInt((i/10).toString())*50));
            }
        }
    }
}
// 10 x 12 array
// 0: Empty
// 1: Basic
// 2: Medium
// 3: Hard
// 4: Sniper
// 5: Bomber

class Level {
	constructor(scene, enemyArray){
        this.scene = scene;
		this.boxSize = 50;
		this.array = enemyArray;
		this.conversions = [null, BasicEnemy, MediumEnemy, HardEnemy, SniperEnemy, BomberEnemy];
    }
    generateLevel(){
        for (var i=0;i<this.array.length;i++){
            if (this.conversions[this.array[i]] !== null){
                entities.add(new (this.conversions[this.array[i]])(this.scene, 25 + (i%10 * 50), 25 + parseInt((i/10).toString())*50));
            }
        }
    }
}
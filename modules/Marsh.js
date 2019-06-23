var Base = require("./Base");
var random = require("./random.js");



module.exports = class Marsh extends Base{
    constructor(x, y) {
        super(x, y);
        this.index = 4;
        this.energy = 3;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    
    move() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            this.y = newY;
            this.x = newX;
            this.energy--;
        }
    }

    mul() {
        this.energy += 2;
        
        var newCell0 = this.chooseCell(0);
        var newCell1 = this.chooseCell(1);
        var newCell2 = this.chooseCell(2);
        var newCell3 = this.chooseCell(3);
        var newCell5 = this.chooseCell(5);
        var newCell6 = this.chooseCell(6);

        var newCell = random(newCell0.concat(newCell1).concat(newCell2).concat(newCell3).concat(newCell5).concat(newCell6));
        
        if (this.energy >= 40 && newCell) {
            MarshHashiv++;
            var newMarsh = new Marsh(newCell[0], newCell[1], this.index);
            MarshArr.push(newMarsh);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 0;
        }
    }
}